import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'

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

  res.json({ success: true, data: updated })
}
