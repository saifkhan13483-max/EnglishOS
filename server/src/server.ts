import dotenv from 'dotenv'

dotenv.config()

import { execSync } from 'child_process'
import http from 'http'
import app from './app'
import { startScheduler } from './services/schedulerService'
import { prisma } from './lib/prisma'

const PORT = parseInt(process.env.PORT || '3000', 10)
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

if (IS_PRODUCTION) {
  console.log('[startup] Running prisma migrate deploy...')
  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' })
    console.log('[startup] Migrations applied successfully.')
  } catch (err) {
    console.error('[startup] Migration failed:', err)
    process.exit(1)
  }
}

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`EnglishOS API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
  startScheduler()
})

function shutdown(signal: string): void {
  console.log(`[shutdown] Received ${signal}. Closing server gracefully...`)
  server.close(async () => {
    console.log('[shutdown] HTTP server closed.')
    try {
      await prisma.$disconnect()
      console.log('[shutdown] Prisma disconnected.')
    } catch (err) {
      console.error('[shutdown] Error disconnecting Prisma:', err)
    }
    process.exit(0)
  })

  setTimeout(() => {
    console.error('[shutdown] Forced exit after timeout.')
    process.exit(1)
  }, 10_000)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
