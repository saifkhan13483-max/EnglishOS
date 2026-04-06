import { create } from 'zustand'
import {
  SafeLearner,
  apiLogin,
  apiRegister,
  apiRefresh,
  apiLogout,
  setRefreshToken,
} from '@/services/authApi'
import { setAccessToken, getAccessToken } from '@/services/api'

interface AuthStore {
  user: SafeLearner | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean

  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  localLogout: () => void
  refreshSession: () => Promise<void>
  loadFromStorage: () => Promise<void>
  setUser: (user: SafeLearner) => void
}

export type { SafeLearner }

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    const { learner, accessToken, refreshToken } = await apiLogin(email, password)
    setRefreshToken(refreshToken)
    setAccessToken(accessToken)
    set({ user: learner, accessToken, isAuthenticated: true })
  },

  register: async (email, password, name) => {
    const { learner, accessToken, refreshToken } = await apiRegister(email, password, name)
    setRefreshToken(refreshToken)
    setAccessToken(accessToken)
    set({ user: learner, accessToken, isAuthenticated: true })
  },

  logout: async () => {
    const token = getAccessToken()
    if (token) {
      await apiLogout(token)
    }
    setAccessToken(null)
    set({ user: null, accessToken: null, isAuthenticated: false })
  },

  localLogout: () => {
    setAccessToken(null)
    set({ user: null, accessToken: null, isAuthenticated: false })
  },

  refreshSession: async () => {
    const result = await apiRefresh()
    if (!result) {
      setAccessToken(null)
      set({ user: null, accessToken: null, isAuthenticated: false })
      return
    }
    const { learner, accessToken, refreshToken } = result
    setRefreshToken(refreshToken)
    setAccessToken(accessToken)
    set({ user: learner, accessToken, isAuthenticated: true })
  },

  loadFromStorage: async () => {
    set({ isLoading: true })
    try {
      await get().refreshSession()
    } finally {
      set({ isLoading: false })
    }
  },
}))
