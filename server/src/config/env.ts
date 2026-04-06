import dotenv from 'dotenv'

dotenv.config()

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function optional(name: string, fallback = ''): string {
  return process.env[name] ?? fallback
}

export const env = {
  DATABASE_URL: requireEnv('DATABASE_URL'),
  JWT_SECRET: requireEnv('JWT_SECRET'),
  JWT_REFRESH_SECRET: requireEnv('JWT_REFRESH_SECRET'),
  OPENAI_API_KEY: optional('OPENAI_API_KEY'),
  RESEND_API_KEY: optional('RESEND_API_KEY'),
  POSTHOG_API_KEY: optional('POSTHOG_API_KEY'),
  NODE_ENV: optional('NODE_ENV', 'development') as 'development' | 'production' | 'test',
  PORT: parseInt(optional('PORT', '5000'), 10),
  CLIENT_URL: optional('CLIENT_URL', 'http://localhost:5173'),
} as const
