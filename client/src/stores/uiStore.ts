import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WhyOption =
  | 'job-interview'
  | 'career-growth'
  | 'social-confidence'
  | 'study-abroad'
  | 'family-abroad'
  | 'business'
  | 'other'

export interface OnboardingState {
  diagnosticText: string
  recommendedLevel: number
  chosenLevel: number
  why: WhyOption | null
  whyOther: string
  morningTime: string
  eveningTime: string
  partnerEmail: string
  notifyPartner: boolean
  commitmentStatement: string
}

interface UIStore {
  onboarding: OnboardingState
  setOnboarding: (patch: Partial<OnboardingState>) => void
  resetOnboarding: () => void
}

const DEFAULT_ONBOARDING: OnboardingState = {
  diagnosticText: '',
  recommendedLevel: 1,
  chosenLevel: 1,
  why: null,
  whyOther: '',
  morningTime: '08:00',
  eveningTime: '19:00',
  partnerEmail: '',
  notifyPartner: false,
  commitmentStatement: '',
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      onboarding: { ...DEFAULT_ONBOARDING },
      setOnboarding: (patch) =>
        set((s) => ({ onboarding: { ...s.onboarding, ...patch } })),
      resetOnboarding: () => set({ onboarding: { ...DEFAULT_ONBOARDING } }),
    }),
    { name: 'eos-ui' }
  )
)
