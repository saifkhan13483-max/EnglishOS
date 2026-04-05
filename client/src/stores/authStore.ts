import { create } from 'zustand'

export interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuthStore = create<AuthStore>(() => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
}))
