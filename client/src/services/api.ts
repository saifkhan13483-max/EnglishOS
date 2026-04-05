import { env } from '@/config/env'

const BASE_URL = env.API_BASE_URL

// ── Token storage ──────────────────────────────────────────────────────────────
// Access token lives in memory only (module-level variable).
// Refresh token lives in localStorage so it survives page reloads.

const REFRESH_TOKEN_KEY = 'eos_refresh_token'

let _accessToken: string | null = null

export function setAccessToken(token: string | null): void {
  _accessToken = token
}

export function getAccessToken(): string | null {
  return _accessToken
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export function clearTokens(): void {
  _accessToken = null
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

// ── Helpers ────────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

function buildHeaders(token: string | null): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type') ?? ''
  const isJson = contentType.includes('application/json')
  const body = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message =
      typeof body === 'object' && body !== null && 'error' in body
        ? (body as { error: string }).error
        : typeof body === 'object' && body !== null && 'message' in body
        ? (body as { message: string }).message
        : String(body) || response.statusText
    throw new ApiError(response.status, message)
  }

  return body as T
}

// ── Token refresh (single in-flight promise) ────────────────────────────────────

let isRefreshing = false
let refreshPromise: Promise<string> | null = null

async function doRefresh(): Promise<string> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new ApiError(401, 'No refresh token available')
  }

  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  if (!response.ok) {
    throw new ApiError(response.status, 'Session expired')
  }

  const data = await response.json() as { data: { accessToken: string; refreshToken: string } }
  const { accessToken, refreshToken: newRefresh } = data.data
  setAccessToken(accessToken)
  setRefreshToken(newRefresh)
  return accessToken
}

async function getValidToken(): Promise<string> {
  if (!isRefreshing) {
    isRefreshing = true
    refreshPromise = doRefresh().finally(() => {
      isRefreshing = false
      refreshPromise = null
    })
  }
  return refreshPromise!
}

// ── Core request function ───────────────────────────────────────────────────────

interface RequestOptions {
  headers?: Record<string, string>
  signal?: AbortSignal
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
  isRetry = false
): Promise<T> {
  const token = getAccessToken()

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...buildHeaders(token),
      ...options.headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: options.signal,
  })

  if (response.status === 401 && !isRetry) {
    try {
      const newToken = await getValidToken()
      const retryResponse = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
          ...buildHeaders(newToken),
          ...options.headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: options.signal,
      })
      return parseResponse<T>(retryResponse)
    } catch {
      clearTokens()
      window.location.href = '/login'
      throw new ApiError(401, 'Session expired. Please log in again.')
    }
  }

  return parseResponse<T>(response)
}

export const api = {
  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return request<T>('GET', path, undefined, options)
  },

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>('POST', path, body, options)
  },

  put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>('PUT', path, body, options)
  },

  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>('PATCH', path, body, options)
  },

  delete<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>('DELETE', path, body, options)
  },
}
