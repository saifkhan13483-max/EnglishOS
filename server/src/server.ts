import dotenv from 'dotenv'

dotenv.config()

import { execSync } from 'child_process'
import path from 'path'
import http from 'http'
import app from './app'
import { startScheduler } from './services/schedulerService'
import { prisma } from './lib/prisma'
import { logger } from './lib/logger'

const PORT = parseInt(process.env.PORT || '5000', 10)
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

if (IS_PRODUCTION) {
  logger.info('[startup] Running prisma migrate deploy...')
  try {
    const serverRoot = path.join(__dirname, '..')
    const prismaBin = path.join(serverRoot, 'node_modules', '.bin', 'prisma')
    execSync(`${prismaBin} migrate deploy`, { stdio: 'inherit', cwd: serverRoot })
    logger.info('[startup] Migrations applied successfully.')
  } catch (err) {
    logger.error({ err }, '[startup] Migration failed')
    process.exit(1)
  }
}

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info({ port: PORT, env: process.env.NODE_ENV || 'development' }, `EnglishOS API running on port ${PORT}`)
  startScheduler()
})

function shutdown(signal: string): void {
  logger.info({ signal }, `[shutdown] Received ${signal}. Closing server gracefully...`)
  server.close(async () => {
    logger.info('[shutdown] HTTP server closed.')
    try {
      await prisma.$disconnect()
      logger.info('[shutdown] Prisma disconnected.')
    } catch (err) {
      logger.error({ err }, '[shutdown] Error disconnecting Prisma')
    }
    process.exit(0)
  })

  setTimeout(() => {
    logger.error('[shutdown] Forced exit after timeout.')
    process.exit(1)
  }, 10_000)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

process.on('unhandledRejection', (reason: unknown) => {
  logger.error({ reason }, '[process] Unhandled promise rejection — shutting down')
  server.close(() => process.exit(1))
})

process.on('uncaughtException', (err: Error) => {
  logger.error({ err, stack: err.stack }, '[process] Uncaught exception — shutting down')
  server.close(() => process.exit(1))
})
