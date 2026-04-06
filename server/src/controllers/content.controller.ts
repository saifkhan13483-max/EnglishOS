import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'
import { processReview } from '../services/srEngine'

// GET /api/v1/content/module/:level/:module
export async function getModule(req: AuthRequest, res: Response): Promise<void> {
  const level = parseInt(req.params.level, 10)
  const module = parseInt(req.params.module, 10)

  if (isNaN(level) || isNaN(module) || level < 1 || module < 1) {
    res.status(400).json({ success: false, error: 'Invalid level or module' })
    return
  }

  const items = await prisma.contentItem.findMany({
    where: { level, module },
    orderBy: [
      { isPowerPack: 'desc' },
      { sortOrder: 'asc' },
    ],
  })

  res.json({ success: true, data: items })
}

// GET /api/v1/content/item/:id
export async function getItem(req: AuthRequest, res: Response): Promise<void> {
  const item = await prisma.contentItem.findUnique({
    where: { id: req.params.id },
  })

  if (!item) {
    res.status(404).json({ success: false, error: 'Content item not found' })
    return
  }

  res.json({ success: true, data: item })
}

// GET /api/v1/content/levels
export async function getLevels(req: AuthRequest, res: Response): Promise<void> {
  const rows = await prisma.contentItem.groupBy({
    by: ['level', 'module'],
    _count: { id: true },
    orderBy: [{ level: 'asc' }, { module: 'asc' }],
  })

  const levelMap = new Map<number, { module: number; itemCount: number }[]>()

  for (const row of rows) {
    if (!levelMap.has(row.level)) levelMap.set(row.level, [])
    levelMap.get(row.level)!.push({ module: row.module, itemCount: row._count.id })
  }

  const data = Array.from(levelMap.entries()).map(([level, modules]) => ({
    level,
    totalItems: modules.reduce((sum, m) => sum + m.itemCount, 0),
    modules,
  }))

  res.json({ success: true, data })
}

// GET /api/v1/content/sr-queue/today
export async function getTodayQueue(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const now = new Date()

  const queueItems = await prisma.sRQueueItem.findMany({
    where: {
      learnerId,
      nextReviewDate: { lte: now },
    },
    include: { item: true },
    take: 20,
    orderBy: [
      { isKnowledgeGap: 'desc' },
      { nextReviewDate: 'asc' },
    ],
  })

  const sorted = queueItems.sort((a, b) => {
    if (a.isKnowledgeGap !== b.isKnowledgeGap) return a.isKnowledgeGap ? -1 : 1
    if (a.item.isPowerPack !== b.item.isPowerPack) return a.item.isPowerPack ? -1 : 1
    return a.nextReviewDate.getTime() - b.nextReviewDate.getTime()
  })

  res.json({ success: true, data: sorted })
}

// GET /api/v1/content/sr-queue/tomorrow — items due for review tomorrow
export async function getTomorrowQueue(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string

  const startOfTomorrow = new Date()
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)
  startOfTomorrow.setHours(0, 0, 0, 0)

  const endOfTomorrow = new Date(startOfTomorrow)
  endOfTomorrow.setHours(23, 59, 59, 999)

  const items = await prisma.sRQueueItem.findMany({
    where: {
      learnerId,
      nextReviewDate: { gte: startOfTomorrow, lte: endOfTomorrow },
    },
    include: { item: { select: { english: true, isPowerPack: true } } },
    orderBy: [{ isKnowledgeGap: 'desc' }, { nextReviewDate: 'asc' }],
  })

  res.json({
    success: true,
    data: {
      count: items.length,
      words: items.slice(0, 5).map((i) => i.item.english),
    },
  })
}

// PATCH /api/v1/content/sr-queue/:id — mark a queue item as reviewed
// SM-2 simplified: correct → extend interval; incorrect → reset to 1 day + flag gap
// SR XP: +10 per correct review, daily cap of 10 correct reviews (100 XP max)
export async function reviewQueueItem(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const { id } = req.params
  const { correct } = req.body as { correct: boolean }

  if (typeof correct !== 'boolean') {
    res.status(400).json({ success: false, error: 'correct must be a boolean' })
    return
  }

  const queueItem = await prisma.sRQueueItem.findUnique({ where: { id } })

  if (!queueItem || queueItem.learnerId !== learnerId) {
    res.status(404).json({ success: false, error: 'Queue item not found' })
    return
  }

  const now = new Date()

  let newIntervalDays: number
  let newEaseFactor: number
  let newIsKnowledgeGap: boolean

  if (correct) {
    newEaseFactor = Math.min(2.5, queueItem.easeFactor + 0.1)
    newIntervalDays = Math.round(queueItem.intervalDays * newEaseFactor)
    newIsKnowledgeGap = false
  } else {
    newEaseFactor = Math.max(1.3, queueItem.easeFactor - 0.2)
    newIntervalDays = 1
    newIsKnowledgeGap = true
  }

  const nextReviewDate = new Date(now.getTime() + newIntervalDays * 24 * 60 * 60 * 1000)

  const updated = await prisma.sRQueueItem.update({
    where: { id },
    data: {
      intervalDays: newIntervalDays,
      easeFactor: newEaseFactor,
      nextReviewDate,
      isKnowledgeGap: newIsKnowledgeGap,
      lastReviewedAt: now,
      correctCount: correct ? { increment: 1 } : undefined,
      incorrectCount: correct ? undefined : { increment: 1 },
    },
  })

  // ── SR XP award (+10 per correct review, capped at 10 reviews / 100 XP per day)
  let srXpAwarded = 0
  if (correct) {
    const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

    // Count correct SR reviews today (including the one we just recorded)
    const todayCorrectCount = await prisma.sRQueueItem.count({
      where: {
        learnerId,
        lastReviewedAt: { gte: todayStart },
        isKnowledgeGap: false,
      },
    })

    // Award XP if still within the daily cap (10 correct reviews max)
    if (todayCorrectCount <= 10) {
      srXpAwarded = 10
      await prisma.learner.update({
        where: { id: learnerId },
        data: { xp: { increment: srXpAwarded } },
      })
    }
  }

  res.json({ success: true, data: updated, srXpAwarded })
}

// POST /api/v1/content/sr-review — bulk batch review using the full SR engine
// Body: { reviews: { itemId: string, wasCorrect: boolean }[] }
// Brain Compound increment: (correct / total) * 3, capped at +10 per day
// If brainCompoundPct reaches 100: deepMissionUnlocked: true in response

export async function bulkReview(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string

  const { reviews } = req.body as {
    reviews: { itemId: string; wasCorrect: boolean }[]
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    res.status(400).json({ success: false, error: 'reviews must be a non-empty array' })
    return
  }

  for (const r of reviews) {
    if (typeof r.itemId !== 'string' || typeof r.wasCorrect !== 'boolean') {
      res.status(400).json({
        success: false,
        error: 'Each review must have itemId (string) and wasCorrect (boolean)',
      })
      return
    }
  }

  const updatedItems = await Promise.all(
    reviews.map((r) => processReview(learnerId, r.itemId, r.wasCorrect)),
  )

  const correctCount = reviews.filter((r) => r.wasCorrect).length
  const totalCount = reviews.length
  const rawIncrement = (correctCount / totalCount) * 3
  const increment = Math.min(10, rawIncrement)

  const learner = await prisma.learner.findUnique({
    where: { id: learnerId },
    select: { brainCompoundPct: true },
  })

  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  const newBrainCompoundPct = Math.min(100, learner.brainCompoundPct + increment)
  const deepMissionUnlocked = newBrainCompoundPct >= 100 && learner.brainCompoundPct < 100

  await prisma.learner.update({
    where: { id: learnerId },
    data: { brainCompoundPct: newBrainCompoundPct },
  })

  res.json({
    success: true,
    data: {
      updatedItems,
      newBrainCompoundPct,
      deepMissionUnlocked,
    },
  })
}
