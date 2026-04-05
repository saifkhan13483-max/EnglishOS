import { Response } from 'express'
import { ModuleStatus, SessionType, SessionStatus } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'

// ── Course structure constants ─────────────────────────────────────────────────

const LEVEL_META = [
  { level: 1, name: 'Beginner',           totalDays: 30, moduleCount: 4 },
  { level: 2, name: 'Elementary',         totalDays: 45, moduleCount: 5 },
  { level: 3, name: 'Pre-Intermediate',   totalDays: 45, moduleCount: 5 },
  { level: 4, name: 'Intermediate',       totalDays: 60, moduleCount: 6 },
  { level: 5, name: 'Upper-Intermediate', totalDays: 60, moduleCount: 6 },
  { level: 6, name: 'Professional',       totalDays: 60, moduleCount: 6 },
]

// Gate records are stored as module = 0
const GATE_MODULE = 0

function calcRank(xp: number): string {
  if (xp >= 20_000) return 'Polymath'
  if (xp >= 12_000) return 'Professional'
  if (xp >= 6_000)  return 'Fluent'
  if (xp >= 3_000)  return 'Conversationalist'
  if (xp >= 1_500)  return 'Communicator'
  if (xp >= 500)    return 'Speaker'
  return 'Rookie'
}

function todayRange(): { gte: Date; lt: Date } {
  const now = new Date()
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
  return { gte: start, lt: end }
}

// ── GET /api/v1/progress/map ───────────────────────────────────────────────────

export async function getMasteryMap(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string

  const learner = await prisma.learner.findUnique({
    where: { id: learnerId },
    select: { levelCurrent: true },
  })

  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  const { levelCurrent } = learner

  // Fetch all LevelProgress records for this learner in one query
  const progressRecords = await prisma.levelProgress.findMany({
    where: { learnerId },
  })

  // Index by "level-module" for fast lookup
  const progressMap = new Map<string, typeof progressRecords[0]>()
  for (const rec of progressRecords) {
    progressMap.set(`${rec.level}-${rec.module}`, rec)
  }

  const levels = LEVEL_META.map((meta) => {
    // Level-level status
    let levelStatus: 'locked' | 'active' | 'complete'
    if (meta.level < levelCurrent) {
      levelStatus = 'complete'
    } else if (meta.level === levelCurrent) {
      levelStatus = 'active'
    } else {
      levelStatus = 'locked'
    }

    // Gate score from module-0 record (if ever attempted)
    const gateRecord = progressMap.get(`${meta.level}-${GATE_MODULE}`)
    const gateScore = gateRecord?.gateScore ?? null

    // Per-module status
    const modules = Array.from({ length: meta.moduleCount }, (_, i) => {
      const moduleNum = i + 1
      const rec = progressMap.get(`${meta.level}-${moduleNum}`)

      let moduleStatus: 'locked' | 'active' | 'complete'
      if (meta.level < levelCurrent) {
        moduleStatus = 'complete'
      } else if (meta.level > levelCurrent) {
        moduleStatus = 'locked'
      } else {
        // Active level — derive from LevelProgress record
        if (!rec) {
          moduleStatus = 'locked'
        } else if (rec.status === ModuleStatus.COMPLETE) {
          moduleStatus = 'complete'
        } else if (rec.status === ModuleStatus.ACTIVE) {
          moduleStatus = 'active'
        } else {
          moduleStatus = 'locked'
        }
      }

      return {
        module: moduleNum,
        status: moduleStatus,
        completedAt: rec?.completedAt ?? null,
        unlockedAt: rec?.unlockedAt ?? null,
      }
    })

    return {
      level: meta.level,
      name: meta.name,
      totalDays: meta.totalDays,
      status: levelStatus,
      gateScore,
      gateAttempts: gateRecord?.gateAttempts ?? 0,
      modules,
    }
  })

  res.json({ success: true, data: { levels } })
}

// ── GET /api/v1/progress/dashboard ────────────────────────────────────────────

export async function getDashboard(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string
  const range = todayRange()

  const [learner, todaySessions, badgeCount] = await Promise.all([
    prisma.learner.findUnique({
      where: { id: learnerId },
      select: {
        streak: true,
        batmanModeActive: true,
        brainCompoundPct: true,
        xp: true,
        rank: true,
        whyMotivation: true,
      },
    }),
    prisma.missionSession.findMany({
      where: { learnerId, sessionDate: range },
      select: { type: true, status: true },
    }),
    prisma.badge.count({ where: { learnerId } }),
  ])

  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  const morningSession = todaySessions.find((s) => s.type === SessionType.MORNING) ?? null
  const eveningSession = todaySessions.find((s) => s.type === SessionType.EVENING) ?? null

  res.json({
    success: true,
    data: {
      streak: learner.streak,
      batmanModeActive: learner.batmanModeActive,
      brainCompoundPct: learner.brainCompoundPct,
      xp: learner.xp,
      rank: learner.rank,
      myWhy: learner.whyMotivation,
      badgeCount,
      todayMissions: {
        morning: morningSession
          ? { status: morningSession.status }
          : { status: SessionStatus.NOT_STARTED },
        evening: eveningSession
          ? { status: eveningSession.status }
          : { status: SessionStatus.NOT_STARTED },
      },
    },
  })
}

// ── POST /api/v1/progress/gate/submit ─────────────────────────────────────────

export async function submitGate(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string
  const { level, answers } = req.body as {
    level: number
    answers: { itemId: string; learnerAnswer: string; isCorrect: boolean }[]
  }

  if (typeof level !== 'number' || level < 1 || level > 6) {
    res.status(400).json({ success: false, error: 'level must be between 1 and 6' })
    return
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    res.status(400).json({ success: false, error: 'answers must be a non-empty array' })
    return
  }

  const learner = await prisma.learner.findUnique({
    where: { id: learnerId },
    select: { levelCurrent: true, xp: true },
  })

  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  if (learner.levelCurrent !== level) {
    res.status(400).json({ success: false, error: 'Can only submit gate for current active level' })
    return
  }

  // Calculate score
  const correctCount = answers.filter((a) => a.isCorrect).length
  const score = (correctCount / answers.length) * 100

  // Increment gateAttempts on the gate record (module 0)
  await prisma.levelProgress.upsert({
    where: { learnerId_level_module: { learnerId, level, module: GATE_MODULE } },
    create: {
      learnerId,
      level,
      module: GATE_MODULE,
      status: ModuleStatus.ACTIVE,
      gateScore: score,
      gateAttempts: 1,
    },
    update: {
      gateAttempts: { increment: 1 },
      gateScore: score,
    },
  })

  const passed = score >= 70

  if (!passed) {
    // Build per-module breakdown of incorrect items
    const incorrectAnswers = answers.filter((a) => !a.isCorrect)
    const incorrectItemIds = incorrectAnswers.map((a) => a.itemId)

    const incorrectItems = await prisma.contentItem.findMany({
      where: { id: { in: incorrectItemIds } },
      select: { id: true, module: true, english: true, urduRoman: true },
    })

    // Group by module
    const moduleBreakdown: Record<number, typeof incorrectItems> = {}
    for (const item of incorrectItems) {
      if (!moduleBreakdown[item.module]) moduleBreakdown[item.module] = []
      moduleBreakdown[item.module].push(item)
    }

    res.json({
      success: true,
      data: {
        passed: false,
        score: Math.round(score * 100) / 100,
        moduleBreakdown,
      },
    })
    return
  }

  // Score >= 70 — level passed
  const levelMeta = LEVEL_META.find((m) => m.level === level)!
  const nextLevel = level < 6 ? level + 1 : null
  const now = new Date()

  // Mark all modules of current level as COMPLETE and finalize gate record
  const moduleUpserts = Array.from({ length: levelMeta.moduleCount }, (_, i) => {
    const moduleNum = i + 1
    return prisma.levelProgress.upsert({
      where: { learnerId_level_module: { learnerId, level, module: moduleNum } },
      create: {
        learnerId,
        level,
        module: moduleNum,
        status: ModuleStatus.COMPLETE,
        completedAt: now,
        unlockedAt: now,
      },
      update: {
        status: ModuleStatus.COMPLETE,
        completedAt: now,
      },
    })
  })

  // Finalize gate record as COMPLETE
  const gateUpdate = prisma.levelProgress.update({
    where: { learnerId_level_module: { learnerId, level, module: GATE_MODULE } },
    data: { status: ModuleStatus.COMPLETE, completedAt: now },
  })

  // Unlock all modules of next level as ACTIVE
  const nextLevelUpserts = nextLevel
    ? Array.from({ length: LEVEL_META[nextLevel - 1].moduleCount }, (_, i) => {
        const moduleNum = i + 1
        return prisma.levelProgress.upsert({
          where: { learnerId_level_module: { learnerId, level: nextLevel, module: moduleNum } },
          create: {
            learnerId,
            level: nextLevel,
            module: moduleNum,
            status: moduleNum === 1 ? ModuleStatus.ACTIVE : ModuleStatus.LOCKED,
            unlockedAt: moduleNum === 1 ? now : null,
          },
          update: {},
        })
      })
    : []

  // Award 500 XP and increment levelCurrent
  const newXp = learner.xp + 500
  const newRank = calcRank(newXp)

  const learnerUpdate = prisma.learner.update({
    where: { id: learnerId },
    data: {
      levelCurrent: nextLevel ?? level,
      xp: newXp,
      rank: newRank,
    },
  })

  await Promise.all([...moduleUpserts, gateUpdate, ...nextLevelUpserts, learnerUpdate])

  res.json({
    success: true,
    data: {
      passed: true,
      score: Math.round(score * 100) / 100,
      xpAwarded: 500,
      ...(nextLevel && { nextLevel }),
    },
  })
}

// ── GET /api/v1/progress/stats ────────────────────────────────────────────────

export async function getStats(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setUTCDate(thirtyDaysAgo.getUTCDate() - 30)

  const [learner, completedSessions, recentMissions, badges, levelProgressList] = await Promise.all([
    prisma.learner.findUnique({
      where: { id: learnerId },
      select: {
        streak: true,
        xp: true,
        brainCompoundPct: true,
      },
    }),
    // Count distinct active days (any completed mission counts)
    prisma.missionSession.findMany({
      where: { learnerId, status: SessionStatus.COMPLETE },
      select: { sessionDate: true },
    }),
    // Feynman scores for the last 30 days
    prisma.missionSession.findMany({
      where: {
        learnerId,
        status: SessionStatus.COMPLETE,
        feynmanScore: { not: null },
        sessionDate: { gte: thirtyDaysAgo },
      },
      select: { sessionDate: true, feynmanScore: true },
      orderBy: { sessionDate: 'asc' },
    }),
    prisma.badge.findMany({
      where: { learnerId },
      orderBy: { earnedAt: 'desc' },
    }),
    prisma.levelProgress.findMany({
      where: { learnerId, module: { gt: GATE_MODULE } },
      orderBy: [{ level: 'asc' }, { module: 'asc' }],
    }),
  ])

  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  // Count unique active days
  const uniqueDays = new Set(
    completedSessions.map((s) => s.sessionDate.toISOString().slice(0, 10))
  )
  const totalDaysActive = uniqueDays.size

  // Build feynman score trend array
  const feynmanScoreTrend = recentMissions.map((m) => ({
    date: m.sessionDate.toISOString().slice(0, 10),
    score: m.feynmanScore as number,
  }))

  res.json({
    success: true,
    data: {
      totalDaysActive,
      currentStreak: learner.streak,
      totalXP: learner.xp,
      brainCompoundPct: learner.brainCompoundPct,
      feynmanScoreTrend,
      badgeList: badges,
      levelProgressList,
    },
  })
}
