import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { logger } from '../lib/logger'

export interface AppError extends Error {
  statusCode?: number
  type?: string
  status?: number
  code?: string
}

// Prisma error codes that indicate a connection / initialization problem
const PRISMA_CONNECTION_CODES = new Set(['P1000', 'P1001', 'P1002', 'P1003', 'P1008', 'P1017'])

function isOpenAIError(err: AppError): boolean {
  if (err.constructor?.name === 'APIError') return true
  if (err.type === 'invalid_request_error' || err.type === 'api_error') return true
  if ((err as { _type?: string })._type === 'APIError') return true
  if (err.status !== undefined && err.message?.toLowerCase().includes('openai')) return true
  return false
}

function isPrismaConnectionError(err: AppError): boolean {
  if (err instanceof Prisma.PrismaClientInitializationError) return true
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    PRISMA_CONNECTION_CODES.has(err.code)
  ) {
    return true
  }
  return false
}

function isMalformedJsonError(err: AppError): boolean {
  return err.type === 'entity.parse.failed'
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const route = `${req.method} ${req.path}`

  // ── Malformed JSON ─────────────────────────────────────────────────────────
  if (isMalformedJsonError(err)) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      error: 'Invalid JSON — request body could not be parsed',
    })
    return
  }

  // ── OpenAI API failures ────────────────────────────────────────────────────
  if (isOpenAIError(err)) {
    logger.error({ err, route }, '[OpenAI Error]')
    res.status(503).json({
      success: false,
      statusCode: 503,
      error: 'AI service temporarily unavailable — please try again',
    })
    return
  }

  // ── Database connection failures ───────────────────────────────────────────
  if (isPrismaConnectionError(err)) {
    logger.error({ err, route }, '[DB Connection Error]')
    res.status(503).json({
      success: false,
      statusCode: 503,
      error: 'Service temporarily unavailable',
    })
    return
  }

  // ── JWT verification failures ──────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      statusCode: 401,
      error: 'Invalid token — please log in again',
    })
    return
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      statusCode: 401,
      error: 'Token expired — please log in again',
    })
    return
  }

  if (err.name === 'NotBeforeError') {
    res.status(401).json({
      success: false,
      statusCode: 401,
      error: 'Token not yet valid — please log in again',
    })
    return
  }

  // ── Generic / unhandled errors ─────────────────────────────────────────────
  const statusCode = err.statusCode ?? 500
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'An unexpected error occurred'
      : err.message || 'An unexpected error occurred'

  if (statusCode === 500) {
    logger.error({ err, route, stack: err.stack }, '[Error] Unhandled server error')
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    error: message,
  })
}
