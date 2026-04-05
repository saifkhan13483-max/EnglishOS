import { Response } from 'express'
import { SessionType, SessionStatus } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayRange(): { gte: Date; lt: Date } {
  const now = new Date()
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
  return { gte: start, lt: end }
}

function yesterdayRange(): { gte: Date; lt: Date } {
  const today = todayRange()
  return {
    gte: new Date(today.gte.getTime() - 24 * 60 * 60 * 1000),
    lt: today.gte,
  }
}

function calcRank(xp: number): string {
  if (xp >= 20_000) return 'Polymath'
  if (xp >= 12_000) return 'Professional'
  if (xp >= 6_000)  return 'Fluent'
  if (xp >= 3_000)  return 'Conversationalist'
  if (xp >= 1_500)  return 'Communicator'
  if (xp >= 500)    return 'Speaker'
  return 'Rookie'
}

// ── POST /api/v1/mission/start ────────────────────────────────────────────────

export async function startMission(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const { type } = req.body as { type: string }

  if (type !== 'MORNING' && type !== 'EVENING') {
    res.status(400).json({ success: false, error: 'type must be MORNING or EVENING' })
    return
  }

  const sessionType = type as SessionType
  const range = todayRange()

  const existing = await prisma.missionSession.findFirst({
    where: {
      learnerId,
      type: sessionType,
      sessionDate: range,
    },
  })

  if (existing) {
    if (existing.status === SessionStatus.COMPLETE) {
      res.status(409).json({ success: false, error: 'Mission already completed today' })
      return
    }
    res.json({ success: true, data: existing })
    return
  }

  const mission = await prisma.missionSession.create({
    data: {
      learnerId,
      type: sessionType,
      sessionDate: range.gte,
      status: SessionStatus.IN_PROGRESS,
    },
  })

  res.status(201).json({ success: true, data: mission })
}

// ── PUT /api/v1/mission/:id/complete ─────────────────────────────────────────

export async function completeMission(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const { id } = req.params
  const { xpEarned, feynmanScore } = req.body as {
    xpEarned: number
    feynmanScore?: number
  }

  if (typeof xpEarned !== 'number' || xpEarned < 0) {
    res.status(400).json({ success: false, error: 'xpEarned must be a non-negative number' })
    return
  }

  const mission = await prisma.missionSession.findUnique({ where: { id } })

  if (!mission || mission.learnerId !== learnerId) {
    res.status(404).json({ success: false, error: 'Mission not found' })
    return
  }

  if (mission.status === SessionStatus.COMPLETE) {
    res.status(409).json({ success: false, error: 'Mission already completed' })
    return
  }

  const now = new Date()

  const updatedMission = await prisma.missionSession.update({
    where: { id },
    data: {
      status: SessionStatus.COMPLETE,
      completedAt: now,
      xpEarned,
      ...(feynmanScore !== undefined && { feynmanScore }),
    },
  })

  const learner = await prisma.learner.findUnique({ where: { id: learnerId } })
  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  const newXp = learner.xp + xpEarned
  const newRank = calcRank(newXp)

  const yesterdayRange_ = yesterdayRange()
  const completedYesterday = await prisma.missionSession.findFirst({
    where: {
      learnerId,
      status: SessionStatus.COMPLETE,
      sessionDate: yesterdayRange_,
    },
  })

  const newStreak = completedYesterday ? learner.streak + 1 : 1
  const newBatmanMode = newStreak >= 7

  const updatedLearner = await prisma.learner.update({
    where: { id: learnerId },
    data: {
      xp: newXp,
      rank: newRank,
      streak: newStreak,
      batmanModeActive: newBatmanMode,
      lastActiveDt: now,
    },
    select: {
      id: true,
      xp: true,
      rank: true,
      streak: true,
      batmanModeActive: true,
      lastActiveDt: true,
      brainCompoundPct: true,
    },
  })

  res.json({
    success: true,
    data: {
      mission: updatedMission,
      learner: updatedLearner,
    },
  })
}

// ── GET /api/v1/mission/today ─────────────────────────────────────────────────

export async function getTodayMissions(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const range = todayRange()

  const sessions = await prisma.missionSession.findMany({
    where: {
      learnerId,
      sessionDate: range,
    },
  })

  const morning = sessions.find((s) => s.type === SessionType.MORNING) ?? null
  const evening = sessions.find((s) => s.type === SessionType.EVENING) ?? null

  res.json({ success: true, data: { morning, evening } })
}
