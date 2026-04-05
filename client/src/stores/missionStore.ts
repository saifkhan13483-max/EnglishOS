import { create } from 'zustand'

export type MissionType = 'morning' | 'evening'

export type MissionPhase =
  | 'warmup-flash'
  | 'core-drop'
  | 'apply-it'
  | 'feynman-moment'
  | 'story-replay'
  | 'conversation-sim'
  | 'day-close'

export interface PhaseData {
  [key: string]: unknown
}

interface MissionStore {
  currentMission: MissionType | null
  currentPhase: MissionPhase | null
  phaseData: PhaseData
  xpEarned: number
  isComplete: boolean
}

export const useMissionStore = create<MissionStore>(() => ({
  currentMission: null,
  currentPhase: null,
  phaseData: {},
  xpEarned: 0,
  isComplete: false,
}))
