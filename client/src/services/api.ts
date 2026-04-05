import { env } from '@/config/env'

const BASE_URL = env.API_BASE_URL

const TOKEN_KEY = 'eos_access_token'
const REFRESH_TOKEN_KEY = 'eos_refresh_token'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
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
      typeof body === 'object' && body !== null && 'message' in body
        ? (body as { message: string }).message
        : String(body) || response.statusText
    throw new ApiError(response.status, message)
  }

  return body as T
}

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
    throw new ApiError(response.status, 'Refresh failed')
  }

  const data = await response.json() as { accessToken: string; refreshToken?: string }
  const newRefreshToken = data.refreshToken ?? refreshToken
  setTokens(data.accessToken, newRefreshToken)
  return data.accessToken
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

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return request<T>('DELETE', path, undefined, options)
  },
}
