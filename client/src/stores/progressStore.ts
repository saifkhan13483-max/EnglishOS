import { create } from 'zustand'
import { api } from '@/services/api'

export interface LearnerProfile {
  id: string
  name: string
  email: string
  currentLevel: number
  currentModule: number
  dayNumber: number
  joinedAt: string
  why: string
  stake: string
}

export interface LevelProgress {
  level: number
  name: string
  color: string
  completedModules: number
  totalModules: number
}

export interface Badge {
  id: string
  name: string
  icon: string
  earnedAt: string | null
}

export interface MapModule {
  module: number
  status: 'locked' | 'active' | 'complete'
  completedAt: string | null
  unlockedAt: string | null
}

export interface MapLevel {
  level: number
  name: string
  totalDays: number
  status: 'locked' | 'active' | 'complete'
  gateScore: number | null
  gateAttempts: number
  modules: MapModule[]
}

export interface TodayMissions {
  morning: { status: string }
  evening: { status: string }
}

export interface FeynmanScorePoint {
  date: string
  score: number
}

export interface ServerBadge {
  id: string
  learnerId: string
  badgeType: string
  module: number | null
  earnedAt: string
}

export interface LevelProgressRecord {
  id: string
  learnerId: string
  level: number
  module: number
  status: string
  gateScore: number | null
  gateAttempts: number
  unlockedAt: string | null
  completedAt: string | null
}

const DASHBOARD_TTL_MS = 30_000 // 30 seconds
const PROFILE_TTL_MS = 60_000   // 60 seconds

interface ProgressStore {
  learnerProfile: LearnerProfile | null
  levelProgress: LevelProgress[]
  totalXP: number
  streak: number
  brainCompoundPct: number
  badges: Badge[]
  batmanModeActive: boolean
  batmanSkipUsedThisWeek: boolean

  mapLevels: MapLevel[]
  todayMissions: TodayMissions | null
  myWhy: string | null
  feynmanScoreTrend: FeynmanScorePoint[]
  levelProgressList: LevelProgressRecord[]
  totalDaysActive: number
  serverBadges: ServerBadge[]

  /** Timestamp (Date.now()) of the last successful loadDashboard call */
  _dashboardLastFetched: number
  /** Timestamp (Date.now()) of the last successful loadLearnerProfile call */
  _profileLastFetched: number

  setLearnerProfile: (profile: LearnerProfile) => void
  setStats: (stats: { xp: number; streak: number; brainCompoundPct: number }) => void
  setBatmanState: (state: { batmanModeActive: boolean; batmanSkipUsedThisWeek: boolean }) => void

  loadLearnerProfile: (force?: boolean) => Promise<void>
  loadDashboard: () => Promise<void>
  loadMasteryMap: () => Promise<void>
  loadStats: () => Promise<void>
}

interface RawLearnerProfile {
  id: string
  name: string
  email: string
  levelCurrent: number
  moduleCurrent: number
  dayNumber: number
  createdAt: string
  whyMotivation: string | null
  stakesStatement: string | null
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  learnerProfile: null,
  levelProgress: [],
  totalXP: 0,
  streak: 0,
  brainCompoundPct: 0,
  badges: [],
  batmanModeActive: false,
  batmanSkipUsedThisWeek: false,

  mapLevels: [],
  todayMissions: null,
  myWhy: null,
  feynmanScoreTrend: [],
  levelProgressList: [],
  totalDaysActive: 0,
  serverBadges: [],

  _dashboardLastFetched: 0,
  _profileLastFetched: 0,

  setLearnerProfile: (profile) => set({ learnerProfile: profile }),

  setStats: ({ xp, streak, brainCompoundPct }) =>
    set({ totalXP: xp, streak, brainCompoundPct }),

  setBatmanState: ({ batmanModeActive, batmanSkipUsedThisWeek }) =>
    set({ batmanModeActive, batmanSkipUsedThisWeek }),

  loadLearnerProfile: async (force = false) => {
    const { _profileLastFetched } = get()
    if (!force && Date.now() - _profileLastFetched < PROFILE_TTL_MS) return

    try {
      const res = await api.get<{ success: boolean; data: RawLearnerProfile }>(
        '/api/v1/learner/profile'
      )
      const d = res.data
      const profile: LearnerProfile = {
        id: d.id,
        name: d.name,
        email: d.email,
        currentLevel: d.levelCurrent,
        currentModule: d.moduleCurrent ?? 1,
        dayNumber: d.dayNumber ?? 1,
        joinedAt: d.createdAt,
        why: d.whyMotivation ?? '',
        stake: d.stakesStatement ?? '',
      }
      set({ learnerProfile: profile, _profileLastFetched: Date.now() })
    } catch {
      // silently fail — stale data is better than crashing
    }
  },

  loadDashboard: async () => {
    // 30-second client-side cache: skip the API call if data is still fresh
    const { _dashboardLastFetched } = get()
    if (Date.now() - _dashboardLastFetched < DASHBOARD_TTL_MS) return

    try {
      const [dashRes] = await Promise.all([
        api.get<{
          success: boolean
          data: {
            streak: number
            batmanModeActive: boolean
            brainCompoundPct: number
            xp: number
            rank: string
            myWhy: string | null
            badgeCount: number
            todayMissions: TodayMissions
          }
        }>('/api/v1/progress/dashboard'),
        get().loadLearnerProfile(),
      ])
      const d = dashRes.data
      set({
        streak: d.streak,
        batmanModeActive: d.batmanModeActive,
        brainCompoundPct: d.brainCompoundPct,
        totalXP: d.xp,
        myWhy: d.myWhy,
        todayMissions: d.todayMissions,
        _dashboardLastFetched: Date.now(),
      })
    } catch {
      // silently fail — stale data is better than crashing
    }
  },

  loadMasteryMap: async () => {
    try {
      const [mapRes] = await Promise.all([
        api.get<{
          success: boolean
          data: { levels: MapLevel[] }
        }>('/api/v1/progress/map'),
        get().loadLearnerProfile(),
      ])
      set({ mapLevels: mapRes.data.levels })
    } catch {
      // silently fail
    }
  },

  loadStats: async () => {
    try {
      const res = await api.get<{
        success: boolean
        data: {
          totalDaysActive: number
          currentStreak: number
          totalXP: number
          brainCompoundPct: number
          feynmanScoreTrend: FeynmanScorePoint[]
          badgeList: ServerBadge[]
          levelProgressList: LevelProgressRecord[]
        }
      }>('/api/v1/progress/stats')
      const d = res.data
      set({
        totalDaysActive: d.totalDaysActive,
        streak: d.currentStreak,
        totalXP: d.totalXP,
        brainCompoundPct: d.brainCompoundPct,
        feynmanScoreTrend: d.feynmanScoreTrend,
        serverBadges: d.badgeList,
        levelProgressList: d.levelProgressList,
      })
    } catch {
      // silently fail
    }
  },
}))
