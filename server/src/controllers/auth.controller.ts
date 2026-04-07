import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { ModuleStatus } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { initializeSRQueue } from '../services/srEngine'

// ── Constants ─────────────────────────────────────────────────────────────────

const BCRYPT_ROUNDS = 12
const ACCESS_TOKEN_TTL = '15m'
const REFRESH_TOKEN_TTL = '30d'
const REFRESH_TOKEN_DAYS = 30

// Level 1 has 4 modules — create initial progress records on register
const LEVEL1_MODULE_COUNT = 4

// ── Helpers ───────────────────────────────────────────────────────────────────

function jwtSecret(): string {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET is not set')
  return s
}

function jwtRefreshSecret(): string {
  const s = process.env.JWT_REFRESH_SECRET
  if (!s) throw new Error('JWT_REFRESH_SECRET is not set')
  return s
}

function generateAccessToken(learnerId: string): string {
  return jwt.sign({ userId: learnerId }, jwtSecret(), { expiresIn: ACCESS_TOKEN_TTL })
}

function generateRefreshToken(learnerId: string): string {
  return jwt.sign(
    { userId: learnerId, jti: crypto.randomBytes(16).toString('hex') },
    jwtRefreshSecret(),
    { expiresIn: REFRESH_TOKEN_TTL },
  )
}

function refreshTokenExpiry(): Date {
  const d = new Date()
  d.setDate(d.getDate() + REFRESH_TOKEN_DAYS)
  return d
}

// Fields returned to the client — excludes passwordHash (refreshTokens is a relation, not included by default)
const SAFE_SELECT = {
  id: true,
  email: true,
  name: true,
  levelCurrent: true,
  whyMotivation: true,
  stakesStatement: true,
  accountabilityEmail: true,
  morningSessionTime: true,
  eveningSessionTime: true,
  streak: true,
  batmanModeActive: true,
  xp: true,
  rank: true,
  brainCompoundPct: true,
  onboardingComplete: true,
  lastActiveDt: true,
  createdAt: true,
  updatedAt: true,
} as const

// Simple email regex
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ── POST /api/v1/auth/register ────────────────────────────────────────────────

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password, name } = req.body as {
    email: unknown
    password: unknown
    name: unknown
  }

  // Validate
  if (typeof email !== 'string' || !isValidEmail(email)) {
    res.status(400).json({ success: false, error: 'A valid email address is required' })
    return
  }
  if (typeof password !== 'string' || password.length < 8) {
    res.status(400).json({ success: false, error: 'Password must be at least 8 characters' })
    return
  }
  if (typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ success: false, error: 'Name is required' })
    return
  }

  // Duplicate check
  const existing = await prisma.learner.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true },
  })
  if (existing) {
    res.status(409).json({ success: false, error: 'An account with this email already exists' })
    return
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)

  // Create learner
  const learner = await prisma.learner.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      name: name.trim(),
    },
    select: SAFE_SELECT,
  })

  // Create initial LevelProgress records for Level 1
  const now = new Date()
  await prisma.levelProgress.createMany({
    data: Array.from({ length: LEVEL1_MODULE_COUNT }, (_, i) => {
      const moduleNum = i + 1
      return {
        learnerId: learner.id,
        level: 1,
        module: moduleNum,
        status: moduleNum === 1 ? ModuleStatus.ACTIVE : ModuleStatus.LOCKED,
        unlockedAt: moduleNum === 1 ? now : null,
      }
    }),
  })

  // Seed the SR queue with all Level 1 Module 1 content items so warm-up flashcards
  // are available from Day 1
  const module1Items = await prisma.contentItem.findMany({
    where: { level: 1, module: 1 },
  })
  if (module1Items.length > 0) {
    await initializeSRQueue(learner.id, module1Items)
  }

  // Generate tokens
  const accessToken = generateAccessToken(learner.id)
  const refreshToken = generateRefreshToken(learner.id)

  await prisma.refreshToken.create({
    data: {
      learnerId: learner.id,
      token: refreshToken,
      expiresAt: refreshTokenExpiry(),
    },
  })

  res.status(201).json({ success: true, data: { learner, accessToken, refreshToken } })
}

// ── POST /api/v1/auth/login ───────────────────────────────────────────────────

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email: unknown; password: unknown }

  if (typeof email !== 'string' || !email) {
    res.status(400).json({ success: false, error: 'Email is required' })
    return
  }
  if (typeof password !== 'string' || !password) {
    res.status(400).json({ success: false, error: 'Password is required' })
    return
  }

  // Find learner — use a generic error message to avoid account enumeration
  const learner = await prisma.learner.findUnique({
    where: { email: email.toLowerCase() },
  })

  const INVALID_CREDS = { success: false, error: 'Invalid email or password' }

  if (!learner) {
    res.status(401).json(INVALID_CREDS)
    return
  }

  const passwordMatches = await bcrypt.compare(password, learner.passwordHash)
  if (!passwordMatches) {
    res.status(401).json(INVALID_CREDS)
    return
  }

  // Invalidate all existing refresh tokens for this learner
  await prisma.refreshToken.deleteMany({ where: { learnerId: learner.id } })

  // Generate new tokens
  const accessToken = generateAccessToken(learner.id)
  const refreshToken = generateRefreshToken(learner.id)

  await prisma.refreshToken.create({
    data: {
      learnerId: learner.id,
      token: refreshToken,
      expiresAt: refreshTokenExpiry(),
    },
  })

  // Return learner without passwordHash
  const { passwordHash: _omitted, ...safeLearner } = learner

  res.json({ success: true, data: { learner: safeLearner, accessToken, refreshToken } })
}

// ── POST /api/v1/auth/refresh ─────────────────────────────────────────────────

export async function refresh(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body as { refreshToken: unknown }

  if (typeof refreshToken !== 'string' || !refreshToken) {
    res.status(401).json({ success: false, error: 'Refresh token is required' })
    return
  }

  // Verify JWT signature first
  let payload: { userId: string }
  try {
    payload = jwt.verify(refreshToken, jwtRefreshSecret()) as { userId: string }
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired refresh token' })
    return
  }

  // Check it exists in the DB and is not past its expiry
  const stored = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  })

  if (!stored || stored.learnerId !== payload.userId || stored.expiresAt < new Date()) {
    res.status(401).json({ success: false, error: 'Refresh token not found or expired' })
    return
  }

  // Rotate — delete old (deleteMany is idempotent; avoids P2025 on race condition), issue new
  await prisma.refreshToken.deleteMany({ where: { id: stored.id } })

  const newAccessToken = generateAccessToken(payload.userId)
  const newRefreshToken = generateRefreshToken(payload.userId)

  await prisma.refreshToken.create({
    data: {
      learnerId: payload.userId,
      token: newRefreshToken,
      expiresAt: refreshTokenExpiry(),
    },
  })

  res.json({ success: true, data: { accessToken: newAccessToken, refreshToken: newRefreshToken } })
}

// ── POST /api/v1/auth/logout ──────────────────────────────────────────────────

export async function logout(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body as { refreshToken: unknown }

  if (typeof refreshToken !== 'string' || !refreshToken) {
    res.status(400).json({ success: false, error: 'Refresh token is required' })
    return
  }

  // Silently succeed even if token is not found (idempotent logout)
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } })

  res.json({ success: true })
}
