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

export interface OnboardingData {
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

export type ModalId =
  | 'stake-update'
  | 'level-gate'
  | 'badge-earned'
  | 'streak-broken'
  | null

interface UIStore {
  romanUrduEnabled: boolean
  sidebarOpen: boolean
  activeModal: ModalId
  onboardingData: OnboardingData
  setRomanUrduEnabled: (val: boolean) => void
  setSidebarOpen: (val: boolean) => void
  setActiveModal: (modal: ModalId) => void
  setOnboardingData: (patch: Partial<OnboardingData>) => void
  resetOnboardingData: () => void
}

const DEFAULT_ONBOARDING: OnboardingData = {
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
      romanUrduEnabled: true,
      sidebarOpen: false,
      activeModal: null,
      onboardingData: { ...DEFAULT_ONBOARDING },
      setRomanUrduEnabled: (val) => set({ romanUrduEnabled: val }),
      setSidebarOpen: (val) => set({ sidebarOpen: val }),
      setActiveModal: (modal) => set({ activeModal: modal }),
      setOnboardingData: (patch) =>
        set((s) => ({ onboardingData: { ...s.onboardingData, ...patch } })),
      resetOnboardingData: () =>
        set({ onboardingData: { ...DEFAULT_ONBOARDING } }),
    }),
    { name: 'eos-ui' }
  )
)
