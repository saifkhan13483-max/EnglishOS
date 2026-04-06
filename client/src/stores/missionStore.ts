import { create } from 'zustand'
import { api, ApiError } from '@/services/api'
import { useSRStore } from './srStore'
import { useProgressStore } from './progressStore'
import { useBadgeStore } from './badgeStore'
import { getFeynmanPrompt } from '@/constants/scenarios'
import { trackEvent } from '@/utils/analytics'

export type MissionType = 'MORNING' | 'EVENING'

export type MissionPhase =
  | 'warmup-flash'
  | 'core-drop'
  | 'apply-it'
  | 'feynman-moment'
  | 'story-replay'
  | 'conversation-sim'
  | 'day-close'

export interface ContentItem {
  id: string
  level: number
  module: number
  groupName: string
  type: string
  english: string
  urduRoman: string
  audioUrl: string | null
  exampleSentence: string
  isPowerPack: boolean
  sortOrder: number
}

export interface FeynmanResult {
  scores: {
    vocabulary: number
    simplicity: number
    relevance: number
    overall: number
  }
  feedback: string
  suggestion: string
  knowledgeGaps: string[]
  feynmanResponseId: string
}

export interface CompleteMissionOpts {
  feynmanScore?: number
  warmupPerfect?: boolean
  srCorrectToday?: number
}

interface MissionStore {
  missionId: string | null
  currentMission: MissionType | null
  currentPhase: MissionPhase | null
  moduleContent: ContentItem[]
  feynmanResult: FeynmanResult | null
  xpEarned: number
  isComplete: boolean
  isLoading: boolean
  error: string | null
  rankUp: boolean
  newRank: string | null
  batmanModeActivated: boolean
  batmanSkipProtected: boolean

  startMission: (type: MissionType) => Promise<void>
  loadDailyQueue: () => Promise<void>
  loadModuleContent: (level: number, module: number) => Promise<void>
  completeMission: (opts?: CompleteMissionOpts) => Promise<void>
  submitFeynmanResponse: (text: string) => Promise<void>
  setPhase: (phase: MissionPhase) => void
  addXp: (amount: number) => void
  reset: () => void
}

export const useMissionStore = create<MissionStore>((set, get) => ({
  missionId: null,
  currentMission: null,
  currentPhase: null,
  moduleContent: [],
  feynmanResult: null,
  xpEarned: 0,
  isComplete: false,
  isLoading: false,
  error: null,
  rankUp: false,
  newRank: null,
  batmanModeActivated: false,
  batmanSkipProtected: false,

  setPhase: (phase) => set({ currentPhase: phase }),

  addXp: (amount) => set((s) => ({ xpEarned: s.xpEarned + amount })),

  reset: () =>
    set({
      missionId: null,
      currentMission: null,
      currentPhase: null,
      moduleContent: [],
      feynmanResult: null,
      xpEarned: 0,
      isComplete: false,
      isLoading: false,
      error: null,
      rankUp: false,
      newRank: null,
      batmanModeActivated: false,
      batmanSkipProtected: false,
    }),

  startMission: async (type) => {
    set({ isLoading: true, error: null })
    try {
      const res = await api.post<{ success: boolean; data: { id: string; type: string } }>(
        '/api/v1/mission/start',
        { type }
      )
      set({
        missionId: res.data.id,
        currentMission: type,
        isLoading: false,
      })
      trackEvent('mission_started', { mission_type: type })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to start mission'
      set({ isLoading: false, error: message })
      throw err
    }
  },

  loadDailyQueue: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await api.get<{ success: boolean; data: unknown[] }>(
        '/api/v1/content/sr-queue/today'
      )
      useSRStore.getState().setDailyQueue(res.data)
      set({ isLoading: false })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load daily queue'
      set({ isLoading: false, error: message })
    }
  },

  loadModuleContent: async (level, module) => {
    set({ isLoading: true, error: null })
    try {
      const res = await api.get<{ success: boolean; data: ContentItem[] }>(
        `/api/v1/content/module/${level}/${module}`
      )
      set({ moduleContent: res.data, isLoading: false })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load module content'
      set({ isLoading: false, error: message })
    }
  },

  completeMission: async (opts?: CompleteMissionOpts) => {
    const { missionId } = get()
    if (!missionId) return

    set({ isLoading: true, error: null })
    try {
      const res = await api.put<{
        success: boolean
        data: {
          learner: {
            xp: number
            rank: string
            streak: number
            brainCompoundPct: number
            batmanModeActive: boolean
            batmanSkipUsedThisWeek: boolean
          }
          sessionXp: number
          rankUp?: boolean
          newRank?: string
          badges?: Array<{ id: string; badgeType: string; earnedAt: string }>
          batmanModeActivated?: boolean
          batmanSkipProtected?: boolean
        }
      }>(`/api/v1/mission/${missionId}/complete`, {
        ...(opts?.feynmanScore !== undefined && { feynmanScore: opts.feynmanScore }),
        ...(opts?.warmupPerfect !== undefined && { warmupPerfect: opts.warmupPerfect }),
        ...(opts?.srCorrectToday !== undefined && { srCorrectToday: opts.srCorrectToday }),
      })

      const { learner, sessionXp, rankUp, newRank, badges, batmanModeActivated, batmanSkipProtected } = res.data

      if (badges?.length) {
        useBadgeStore.getState().addBadges(badges)
      }

      // Sync progress store with authoritative server values
      const profile = useProgressStore.getState().learnerProfile
      useProgressStore.setState({
        totalXP: learner.xp,
        streak: learner.streak,
        brainCompoundPct: learner.brainCompoundPct,
        batmanModeActive: learner.batmanModeActive,
        batmanSkipUsedThisWeek: learner.batmanSkipUsedThisWeek,
        ...(profile ? { learnerProfile: { ...profile } } : {}),
      })

      // Refresh dashboard state after mission completion
      useProgressStore.getState().loadDashboard()

      set({
        isComplete: true,
        isLoading: false,
        xpEarned: sessionXp,
        rankUp: rankUp ?? false,
        newRank: newRank ?? null,
        batmanModeActivated: batmanModeActivated ?? false,
        batmanSkipProtected: batmanSkipProtected ?? false,
      })
      trackEvent('mission_completed', {
        mission_type: get().currentMission,
        session_xp: sessionXp,
        rank_up: rankUp ?? false,
        feynman_score: opts?.feynmanScore,
      })
    } catch (err: unknown) {
      // 409 means the mission was already completed (double-tap / retry) — treat as success
      if (err instanceof ApiError && err.status === 409) {
        set({ isComplete: true, isLoading: false })
        return
      }
      const message = err instanceof Error ? err.message : 'Failed to complete mission'
      set({ isLoading: false, error: message })
      throw err
    }
  },

  submitFeynmanResponse: async (text: string) => {
    const { missionId } = get()
    if (!missionId) throw new Error('No active mission')

    set({ isLoading: true, error: null })
    try {
      const module = useProgressStore.getState().learnerProfile?.currentModule ?? 2
      const { prompt } = getFeynmanPrompt(module)

      const res = await api.post<{
        success: boolean
        data: FeynmanResult & { badges?: Array<{ id: string; badgeType: string; earnedAt: string }> }
      }>(
        '/api/v1/feynman/evaluate',
        { missionId, module, prompt, responseText: text }
      )

      const { badges, ...feynmanResult } = res.data
      if (badges?.length) {
        useBadgeStore.getState().addBadges(badges)
      }
      set({ feynmanResult, isLoading: false })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to evaluate response'
      set({ isLoading: false, error: message })
      throw err
    }
  },
}))
