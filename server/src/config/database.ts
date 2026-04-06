import { PrismaClient } from '@prisma/client'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

function buildDatasourceUrl(): string | undefined {
  const url = process.env.DATABASE_URL
  if (!url) return undefined
  if (!IS_PRODUCTION) return url
  if (url.includes('connection_limit=')) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}connection_limit=10`
}

/**
 * Singleton PrismaClient instance shared across the application.
 *
 * Log levels:
 *   - production : error only (quiet in prod logs)
 *   - development: query + error (verbose for local debugging)
 *
 * In development, the instance is stored on `globalThis` to survive
 * hot-module reloads without leaking connections.
 */
export const prisma: PrismaClient =
  globalThis.__prisma ??
  new PrismaClient({
    datasourceUrl: buildDatasourceUrl(),
    log: IS_PRODUCTION ? ['error'] : ['query', 'error'],
  })

if (!IS_PRODUCTION) {
  globalThis.__prisma = prisma
}
