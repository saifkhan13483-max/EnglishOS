import { env } from '@/config/env'
import { ApiError, setAccessToken, setRefreshToken, getRefreshToken, clearTokens, api } from './api'

const BASE_URL = env.API_BASE_URL

export interface SafeLearner {
  id: string
  email: string
  name: string
  levelCurrent: number
  whyMotivation: string | null
  stakesStatement: string | null
  accountabilityEmail: string | null
  morningSessionTime: string | null
  eveningSessionTime: string | null
  streak: number
  batmanModeActive: boolean
  xp: number
  rank: string
  brainCompoundPct: number
  onboardingComplete: boolean
  lastActiveDt: string | null
  createdAt: string
  updatedAt: string
}

// ── Response shapes matching the server ──────────────────────────────────────

interface AuthResponse {
  success: boolean
  data: {
    learner: SafeLearner
    accessToken: string
    refreshToken: string
  }
}

interface RefreshTokenResponse {
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
  }
}

interface ProfileResponse {
  success: boolean
  data: SafeLearner
}

// ── Raw fetch (no auth header, no 401 retry) ──────────────────────────────────

async function rawPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) {
    const msg =
      typeof data === 'object' && data !== null && 'error' in data
        ? (data as { error: string }).error
        : res.statusText
    throw new ApiError(res.status, msg)
  }
  return data as T
}

// ── Auth API calls ────────────────────────────────────────────────────────────

export async function apiLogin(
  email: string,
  password: string
): Promise<{ learner: SafeLearner; accessToken: string; refreshToken: string }> {
  const data = await rawPost<AuthResponse>('/api/v1/auth/login', { email, password })
  return data.data
}

export async function apiRegister(
  email: string,
  password: string,
  name: string
): Promise<{ learner: SafeLearner; accessToken: string; refreshToken: string }> {
  const data = await rawPost<AuthResponse>('/api/v1/auth/register', { email, password, name })
  return data.data
}

/**
 * Attempt to restore a session using the stored refresh token.
 * Returns null if no token is stored or the server rejects it.
 * Also fetches the learner profile using the new access token.
 */
export async function apiRefresh(): Promise<{ learner: SafeLearner; accessToken: string; refreshToken: string } | null> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return null

  try {
    const data = await rawPost<RefreshTokenResponse>('/api/v1/auth/refresh', { refreshToken })
    const { accessToken, refreshToken: newRefresh } = data.data

    // Update the in-memory access token so the profile fetch can use it
    setAccessToken(accessToken)
    setRefreshToken(newRefresh)

    // Fetch the learner profile with the new token
    const profile = await api.get<ProfileResponse>('/api/v1/learner/profile')
    return { learner: profile.data, accessToken, refreshToken: newRefresh }
  } catch {
    clearTokens()
    return null
  }
}

export async function apiLogout(accessToken: string): Promise<void> {
  try {
    const refreshToken = getRefreshToken()
    await fetch(`${BASE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    })
  } catch {
    // best-effort
  } finally {
    clearTokens()
  }
}

export { clearTokens, setAccessToken, setRefreshToken }
