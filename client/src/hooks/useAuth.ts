import { useAuthStore } from '@/stores/authStore'
import type { SafeLearner } from '@/stores/authStore'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)
  const login = useAuthStore((s) => s.login)
  const register = useAuthStore((s) => s.register)
  const logout = useAuthStore((s) => s.logout)
  const localLogout = useAuthStore((s) => s.localLogout)
  const setUser = useAuthStore((s) => s.setUser)

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    localLogout,
    setUser,
  }
}

export type { SafeLearner }
