import { Response } from 'express'
import bcrypt from 'bcryptjs'
import { ModuleStatus } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'

// ── Course structure (mirrored from progress controller) ───────────────────────

const LEVEL_META = [
  { level: 1, moduleCount: 4 },
  { level: 2, moduleCount: 5 },
  { level: 3, moduleCount: 5 },
  { level: 4, moduleCount: 6 },
  { level: 5, moduleCount: 6 },
  { level: 6, moduleCount: 6 },
]

// ── SafeLearner select ─────────────────────────────────────────────────────────

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

// ── GET /api/v1/learner/profile ────────────────────────────────────────────────

export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string

  const learner = await prisma.learner.findUnique({
    where: { id: learnerId },
    select: SAFE_SELECT,
  })

  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  res.json({ success: true, data: learner })
}

// ── PUT /api/v1/learner/profile ────────────────────────────────────────────────

export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string
  const { name, morningSessionTime, eveningSessionTime } = req.body as {
    name?: unknown
    morningSessionTime?: unknown
    eveningSessionTime?: unknown
  }

  const updates: Record<string, unknown> = {}

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ success: false, error: 'name must be a non-empty string' })
      return
    }
    updates.name = name.trim()
  }

  if (morningSessionTime !== undefined) {
    if (typeof morningSessionTime !== 'string') {
      res.status(400).json({ success: false, error: 'morningSessionTime must be a string' })
      return
    }
    updates.morningSessionTime = morningSessionTime || null
  }

  if (eveningSessionTime !== undefined) {
    if (typeof eveningSessionTime !== 'string') {
      res.status(400).json({ success: false, error: 'eveningSessionTime must be a string' })
      return
    }
    updates.eveningSessionTime = eveningSessionTime || null
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ success: false, error: 'No valid fields provided to update' })
    return
  }

  const learner = await prisma.learner.update({
    where: { id: learnerId },
    data: updates,
    select: SAFE_SELECT,
  })

  res.json({ success: true, data: learner })
}

// ── POST /api/v1/learner/onboarding ───────────────────────────────────────────

export async function completeOnboarding(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string
  const {
    placementLevel,
    whyMotivation,
    stakesStatement,
    accountabilityEmail,
    morningSessionTime,
    eveningSessionTime,
  } = req.body as {
    placementLevel: unknown
    whyMotivation: unknown
    stakesStatement: unknown
    accountabilityEmail?: unknown
    morningSessionTime: unknown
    eveningSessionTime: unknown
  }

  // Validate required fields
  if (
    typeof placementLevel !== 'number' ||
    !Number.isInteger(placementLevel) ||
    placementLevel < 1 ||
    placementLevel > 6
  ) {
    res.status(400).json({ success: false, error: 'placementLevel must be an integer between 1 and 6' })
    return
  }
  if (typeof whyMotivation !== 'string' || !whyMotivation.trim()) {
    res.status(400).json({ success: false, error: 'whyMotivation is required' })
    return
  }
  if (typeof stakesStatement !== 'string' || !stakesStatement.trim()) {
    res.status(400).json({ success: false, error: 'stakesStatement is required' })
    return
  }
  if (typeof morningSessionTime !== 'string' || !morningSessionTime.trim()) {
    res.status(400).json({ success: false, error: 'morningSessionTime is required' })
    return
  }
  if (typeof eveningSessionTime !== 'string' || !eveningSessionTime.trim()) {
    res.status(400).json({ success: false, error: 'eveningSessionTime is required' })
    return
  }
  if (accountabilityEmail !== undefined && accountabilityEmail !== null) {
    if (typeof accountabilityEmail !== 'string') {
      res.status(400).json({ success: false, error: 'accountabilityEmail must be a string' })
      return
    }
  }

  const now = new Date()

  // Build LevelProgress upserts for all affected levels
  const progressUpserts: ReturnType<typeof prisma.levelProgress.upsert>[] = []

  for (const meta of LEVEL_META) {
    for (let moduleNum = 1; moduleNum <= meta.moduleCount; moduleNum++) {
      let status: ModuleStatus
      let unlockedAt: Date | null = null
      let completedAt: Date | null = null

      if (meta.level < placementLevel) {
        // All prior levels are fully complete
        status = ModuleStatus.COMPLETE
        unlockedAt = now
        completedAt = now
      } else if (meta.level === placementLevel) {
        // Current level: module 1 = ACTIVE, rest = LOCKED
        if (moduleNum === 1) {
          status = ModuleStatus.ACTIVE
          unlockedAt = now
        } else {
          status = ModuleStatus.LOCKED
        }
      } else {
        // Future levels stay locked — skip creating records for them
        break
      }

      progressUpserts.push(
        prisma.levelProgress.upsert({
          where: { learnerId_level_module: { learnerId, level: meta.level, module: moduleNum } },
          create: { learnerId, level: meta.level, module: moduleNum, status, unlockedAt, completedAt },
          update: { status, unlockedAt, completedAt },
        }),
      )
    }
  }

  // Run all updates atomically
  const [learner] = await prisma.$transaction([
    prisma.learner.update({
      where: { id: learnerId },
      data: {
        levelCurrent: placementLevel,
        whyMotivation: whyMotivation.trim(),
        stakesStatement: stakesStatement.trim(),
        accountabilityEmail:
          typeof accountabilityEmail === 'string' && accountabilityEmail.trim()
            ? accountabilityEmail.trim()
            : null,
        morningSessionTime: morningSessionTime.trim(),
        eveningSessionTime: eveningSessionTime.trim(),
        onboardingComplete: true,
      },
      select: SAFE_SELECT,
    }),
    ...progressUpserts,
  ])

  res.json({ success: true, data: learner })
}

// ── PUT /api/v1/learner/stakes ─────────────────────────────────────────────────

export async function updateStakes(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string
  const { stakesStatement, accountabilityEmail } = req.body as {
    stakesStatement: unknown
    accountabilityEmail?: unknown
  }

  if (typeof stakesStatement !== 'string' || !stakesStatement.trim()) {
    res.status(400).json({ success: false, error: 'stakesStatement is required' })
    return
  }
  if (accountabilityEmail !== undefined && accountabilityEmail !== null) {
    if (typeof accountabilityEmail !== 'string') {
      res.status(400).json({ success: false, error: 'accountabilityEmail must be a string' })
      return
    }
  }

  const learner = await prisma.learner.update({
    where: { id: learnerId },
    data: {
      stakesStatement: stakesStatement.trim(),
      accountabilityEmail:
        typeof accountabilityEmail === 'string' && accountabilityEmail.trim()
          ? accountabilityEmail.trim()
          : null,
    },
    select: {
      stakesStatement: true,
      accountabilityEmail: true,
    },
  })

  res.json({ success: true, data: learner })
}

// ── DELETE /api/v1/learner/account ────────────────────────────────────────────

export async function deleteAccount(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string
  const { password } = req.body as { password: unknown }

  if (typeof password !== 'string' || !password) {
    res.status(400).json({ success: false, error: 'Password is required to confirm account deletion' })
    return
  }

  const learner = await prisma.learner.findUnique({
    where: { id: learnerId },
    select: { passwordHash: true },
  })

  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  const passwordMatches = await bcrypt.compare(password, learner.passwordHash)
  if (!passwordMatches) {
    res.status(401).json({ success: false, error: 'Incorrect password' })
    return
  }

  // Cascade deletes handle all related records (SRQueueItem, MissionSession, Badge,
  // FeynmanResponse, RefreshToken, LevelProgress, LeaderboardEntry, Upvote)
  await prisma.learner.delete({ where: { id: learnerId } })

  res.json({ success: true })
}
