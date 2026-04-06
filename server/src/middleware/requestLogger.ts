import { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger'

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startAt = process.hrtime.bigint()

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startAt) / 1_000_000

    const learnerId = (req as Request & { learnerId?: string }).learnerId

    logger.info({
      type: 'request',
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: Math.round(durationMs * 100) / 100,
      ...(learnerId ? { learnerId } : {}),
    }, `${req.method} ${req.path} ${res.statusCode} ${Math.round(durationMs)}ms`)
  })

  next()
}
