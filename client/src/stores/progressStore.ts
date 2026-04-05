import { create } from 'zustand'

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

interface ProgressStore {
  learnerProfile: LearnerProfile | null
  levelProgress: LevelProgress[]
  totalXP: number
  streak: number
  brainCompoundPct: number
  badges: Badge[]
  setLearnerProfile: (profile: LearnerProfile) => void
  setStats: (stats: { xp: number; streak: number; brainCompoundPct: number }) => void
}

export const useProgressStore = create<ProgressStore>((set) => ({
  learnerProfile: null,
  levelProgress: [],
  totalXP: 0,
  streak: 0,
  brainCompoundPct: 0,
  badges: [],

  setLearnerProfile: (profile) => set({ learnerProfile: profile }),

  setStats: ({ xp, streak, brainCompoundPct }) =>
    set({ totalXP: xp, streak, brainCompoundPct }),
}))
