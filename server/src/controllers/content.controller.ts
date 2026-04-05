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

  // Shape into level → modules hierarchy
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
  const learnerId = req.userId as string
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

  // Secondary sort: within each priority group, Power Pack items come first
  const sorted = queueItems.sort((a, b) => {
    // Primary: knowledge gap descending
    if (a.isKnowledgeGap !== b.isKnowledgeGap) return a.isKnowledgeGap ? -1 : 1
    // Secondary: power pack descending
    if (a.item.isPowerPack !== b.item.isPowerPack) return a.item.isPowerPack ? -1 : 1
    // Tertiary: earliest due first
    return a.nextReviewDate.getTime() - b.nextReviewDate.getTime()
  })

  res.json({ success: true, data: sorted })
}
