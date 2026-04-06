import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

function buildDatasourceUrl(): string | undefined {
  const url = process.env.DATABASE_URL
  if (!url) return undefined
  if (process.env.NODE_ENV !== 'production') return url
  if (url.includes('connection_limit=')) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}connection_limit=10`
}

export const prisma: PrismaClient =
  globalThis.__prisma ??
  new PrismaClient({
    datasourceUrl: buildDatasourceUrl(),
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}
