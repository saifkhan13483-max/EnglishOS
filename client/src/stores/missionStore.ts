import { create } from 'zustand'
import { api } from '@/services/api'
import { useSRStore } from './srStore'
import { useProgressStore } from './progressStore'
import { getFeynmanPrompt } from '@/constants/scenarios'

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
  clarityScore: number
  vocabScore: number
  relevanceScore: number
  averageScore: number
  feedback: string
  knowledgeGapItems: string[]
  feynmanResponseId: string
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

  startMission: (type: MissionType) => Promise<void>
  loadDailyQueue: () => Promise<void>
  loadModuleContent: (level: number, module: number) => Promise<void>
  completeMission: (feynmanScore?: number) => Promise<void>
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

  completeMission: async (feynmanScore?: number) => {
    const { missionId, xpEarned } = get()
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
          }
        }
      }>(`/api/v1/mission/${missionId}/complete`, {
        xpEarned,
        ...(feynmanScore !== undefined && { feynmanScore }),
      })

      const { learner } = res.data
      const profile = useProgressStore.getState().learnerProfile
      useProgressStore.setState({
        totalXP: learner.xp,
        streak: learner.streak,
        brainCompoundPct: learner.brainCompoundPct,
        ...(profile ? { learnerProfile: { ...profile } } : {}),
      })

      set({ isComplete: true, isLoading: false })
    } catch (err: unknown) {
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

      const res = await api.post<{ success: boolean; data: FeynmanResult }>(
        '/api/v1/feynman/evaluate',
        { missionId, module, prompt, responseText: text }
      )
      set({ feynmanResult: res.data, isLoading: false })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to evaluate response'
      set({ isLoading: false, error: message })
      throw err
    }
  },
}))
