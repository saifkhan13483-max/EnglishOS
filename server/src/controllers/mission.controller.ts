import { Response } from 'express'
import { SessionType, SessionStatus } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'
import { calculateRank } from '../services/rankService'
import { checkAndAwardBadges } from '../services/badgeService'

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

function twoDaysAgoRange(): { gte: Date; lt: Date } {
  const today = todayRange()
  return {
    gte: new Date(today.gte.getTime() - 48 * 60 * 60 * 1000),
    lt: new Date(today.gte.getTime() - 24 * 60 * 60 * 1000),
  }
}

/** Returns the UTC start of the current Monday (ISO week starts Monday). */
function currentMondayStart(): Date {
  const now = new Date()
  const dayOfWeek = now.getUTCDay() // 0 = Sunday, 1 = Monday, ...
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  monday.setUTCDate(monday.getUTCDate() - daysFromMonday)
  return monday
}

/** Returns true if today is Monday (UTC). */
function isTodayMonday(): boolean {
  return new Date().getUTCDay() === 1
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

  // ── Batman skip weekly reset: if today is Monday and a new week has started
  //    since batmanModeWeekStart, reset batmanSkipUsedThisWeek.
  if (isTodayMonday()) {
    const learner = await prisma.learner.findUnique({
      where: { id: learnerId },
      select: { batmanSkipUsedThisWeek: true, batmanModeWeekStart: true, batmanModeActive: true },
    })

    if (learner?.batmanModeActive && learner.batmanSkipUsedThisWeek) {
      const monday = currentMondayStart()
      const weekStart = learner.batmanModeWeekStart

      // If weekStart is null or falls before the current Monday, it's a new cycle
      if (!weekStart || weekStart.getTime() < monday.getTime()) {
        await prisma.learner.update({
          where: { id: learnerId },
          data: {
            batmanSkipUsedThisWeek: false,
            batmanModeWeekStart: monday,
          },
        })
      }
    }
  }

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
//
// XP awards (server-authoritative):
//   Morning Mission complete : +50 XP
//   Evening Mission complete : +100 XP
//   Feynman Moment (text)    : +30 XP  (feynmanScore > 0)
//   Perfect Warm-up Flash    : +25 XP  (warmupPerfect === true)
//   SR correct reviews today : +10 XP each, capped at 10 cards (100 XP max)
//   7-day streak achieved    : +200 XP (awarded exactly when streak hits 7)

export async function completeMission(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const id = String(req.params.id)
  const {
    feynmanScore,
    warmupPerfect,
    srCorrectToday,
  } = req.body as {
    feynmanScore?: number
    warmupPerfect?: boolean
    srCorrectToday?: number
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

  // ── 1. Calculate session XP server-side ─────────────────────────────────
  let sessionXp = 0

  if (mission.type === SessionType.MORNING) {
    sessionXp += 50
  } else {
    sessionXp += 100
  }

  if (typeof feynmanScore === 'number' && feynmanScore > 0) {
    sessionXp += 30
  }

  if (warmupPerfect === true) {
    sessionXp += 25
  }

  if (typeof srCorrectToday === 'number' && srCorrectToday > 0) {
    const cappedSrCount = Math.min(srCorrectToday, 10)
    sessionXp += cappedSrCount * 10
  }

  // ── 2. Look up current learner state ────────────────────────────────────
  const learner = await prisma.learner.findUnique({
    where: { id: learnerId },
    select: {
      streak: true,
      batmanModeActive: true,
      batmanSkipUsedThisWeek: true,
      xp: true,
      rank: true,
      brainCompoundPct: true,
    },
  })
  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  // ── 3. Calculate streak (with Batman skip protection) ───────────────────
  const yesterdayRange_ = yesterdayRange()
  const completedYesterday = await prisma.missionSession.findFirst({
    where: {
      learnerId,
      status: SessionStatus.COMPLETE,
      sessionDate: yesterdayRange_,
    },
  })

  let newStreak: number
  let batmanSkipProtected = false

  if (completedYesterday) {
    newStreak = learner.streak + 1
  } else if (learner.batmanSkipUsedThisWeek) {
    // Batman skip active: check if they completed a session 2 days ago
    const twoDaysAgo_ = twoDaysAgoRange()
    const completedTwoDaysAgo = await prisma.missionSession.findFirst({
      where: {
        learnerId,
        status: SessionStatus.COMPLETE,
        sessionDate: twoDaysAgo_,
      },
    })
    if (completedTwoDaysAgo) {
      newStreak = learner.streak + 1
      batmanSkipProtected = true
    } else {
      newStreak = 1
    }
  } else {
    newStreak = 1
  }

  // 7-day streak achievement bonus (+200 XP, triggered the moment streak hits 7)
  if (newStreak === 7) {
    sessionXp += 200
  }

  // ── 4. Detect Batman Mode activation ────────────────────────────────────
  //    Activates when streak reaches 7 or any multiple of 7, AND was not
  //    already active. Once active, it stays active permanently.
  const wasBatmanActive = learner.batmanModeActive
  const batmanModeActivated =
    !wasBatmanActive && newStreak % 7 === 0 && newStreak > 0

  const newBatmanMode = wasBatmanActive || batmanModeActivated

  // ── 5. Rank calculation with rank-up detection ───────────────────────────
  const oldRank = learner.rank
  const newXp   = learner.xp + sessionXp
  const newRank = calculateRank(newXp)
  const rankUp  = newRank !== oldRank

  // ── 6. Persist ──────────────────────────────────────────────────────────
  const now = new Date()
  const newBrainPct = Math.min(100, learner.brainCompoundPct + 0.5)

  // Determine batmanModeWeekStart: set it to the current Monday when first activating
  const batmanWeekStartUpdate = batmanModeActivated
    ? { batmanModeWeekStart: currentMondayStart() }
    : {}

  const [updatedMission, updatedLearner] = await Promise.all([
    prisma.missionSession.update({
      where: { id },
      data: {
        status: SessionStatus.COMPLETE,
        completedAt: now,
        xpEarned: sessionXp,
        ...(feynmanScore !== undefined && { feynmanScore }),
      },
    }),
    prisma.learner.update({
      where: { id: learnerId },
      data: {
        xp: newXp,
        rank: newRank,
        streak: newStreak,
        batmanModeActive: newBatmanMode,
        brainCompoundPct: newBrainPct,
        lastActiveDt: now,
        ...batmanWeekStartUpdate,
      },
      select: {
        id: true,
        xp: true,
        rank: true,
        streak: true,
        batmanModeActive: true,
        batmanSkipUsedThisWeek: true,
        lastActiveDt: true,
        brainCompoundPct: true,
      },
    }),
  ])

  // ── 7. Award any badges triggered by this mission ────────────────────────
  const newBadges = await checkAndAwardBadges(learnerId, {
    type: 'MISSION_COMPLETE',
    streak: newStreak,
    batmanMode: batmanModeActivated,
  })

  res.json({
    success: true,
    data: {
      mission: updatedMission,
      learner: updatedLearner,
      sessionXp,
      ...(rankUp && { rankUp: true, newRank }),
      ...(newBadges.length && { badges: newBadges }),
      ...(batmanModeActivated && { batmanModeActivated: true }),
      ...(batmanSkipProtected && { batmanSkipProtected: true }),
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
