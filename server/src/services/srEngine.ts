import { ContentItem, SRQueueItem } from '@prisma/client'
import { prisma } from '../lib/prisma'

// ── Date helpers ───────────────────────────────────────────────────────────────

function startOfDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function daysFromNow(n: number): Date {
  const d = startOfDay(new Date())
  d.setUTCDate(d.getUTCDate() + n)
  return d
}

// ── initializeSRQueue ──────────────────────────────────────────────────────────
// Called when a new module is unlocked for a learner.
// Creates an SRQueueItem for every ContentItem in the module.
// Power Pack items start with a higher ease factor (2.7 vs 2.5).

export async function initializeSRQueue(
  learnerId: string,
  moduleItems: ContentItem[],
): Promise<void> {
  const tomorrow = daysFromNow(1)

  await prisma.$transaction(
    moduleItems.map((item) =>
      prisma.sRQueueItem.upsert({
        where: { learnerId_itemId: { learnerId, itemId: item.id } },
        create: {
          learnerId,
          itemId: item.id,
          intervalDays: 1,
          nextReviewDate: tomorrow,
          easeFactor: item.isPowerPack ? 2.7 : 2.5,
          isKnowledgeGap: false,
        },
        update: {},
      }),
    ),
  )
}

// ── processReview ──────────────────────────────────────────────────────────────
// Applies SM-2 to a single SRQueueItem and persists the result.
// Returns the updated item.

export async function processReview(
  learnerId: string,
  itemId: string,
  wasCorrect: boolean,
): Promise<SRQueueItem> {
  const current = await prisma.sRQueueItem.findUnique({
    where: { learnerId_itemId: { learnerId, itemId } },
  })

  if (!current) {
    throw new Error(`SR queue item not found for learner=${learnerId} item=${itemId}`)
  }

  const now = new Date()
  let newIntervalDays: number
  let newEaseFactor: number
  let newIsKnowledgeGap: boolean

  if (wasCorrect) {
    newIntervalDays = Math.min(180, Math.round(current.intervalDays * current.easeFactor))
    newEaseFactor = Math.min(3.5, current.easeFactor + 0.1)
    newIsKnowledgeGap = false
  } else {
    newIntervalDays = 1
    newEaseFactor = Math.max(1.3, current.easeFactor - 0.2)
    newIsKnowledgeGap = current.isKnowledgeGap
  }

  const nextReviewDate = daysFromNow(newIntervalDays)

  return prisma.sRQueueItem.update({
    where: { learnerId_itemId: { learnerId, itemId } },
    data: {
      intervalDays: newIntervalDays,
      easeFactor: newEaseFactor,
      nextReviewDate,
      isKnowledgeGap: newIsKnowledgeGap,
      lastReviewedAt: now,
      correctCount: wasCorrect ? { increment: 1 } : undefined,
      incorrectCount: wasCorrect ? undefined : { increment: 1 },
    },
  })
}

// ── markAsKnowledgeGap ─────────────────────────────────────────────────────────
// Flags an item as a knowledge gap and schedules it for tomorrow (highest priority).

export async function markAsKnowledgeGap(learnerId: string, itemId: string): Promise<void> {
  await prisma.sRQueueItem.update({
    where: { learnerId_itemId: { learnerId, itemId } },
    data: {
      isKnowledgeGap: true,
      nextReviewDate: daysFromNow(1),
    },
  })
}

// ── getDailyQueue ──────────────────────────────────────────────────────────────
// Returns up to `limit` items due today, sorted:
//   1. Knowledge gap items first
//   2. Power Pack items second
//   3. Everything else by nextReviewDate ascending

export async function getDailyQueue(learnerId: string, limit = 20) {
  const now = new Date()

  const items = await prisma.sRQueueItem.findMany({
    where: {
      learnerId,
      nextReviewDate: { lte: now },
    },
    include: { item: true },
    take: limit * 2,
    orderBy: [{ isKnowledgeGap: 'desc' }, { nextReviewDate: 'asc' }],
  })

  const sorted = items.sort((a, b) => {
    if (a.isKnowledgeGap !== b.isKnowledgeGap) return a.isKnowledgeGap ? -1 : 1
    if (a.item.isPowerPack !== b.item.isPowerPack) return a.item.isPowerPack ? -1 : 1
    return a.nextReviewDate.getTime() - b.nextReviewDate.getTime()
  })

  return sorted.slice(0, limit)
}

// ── calculateBrainCompoundDrain ────────────────────────────────────────────────
// If the learner has not completed any SR review for 3+ consecutive days,
// reduce brainCompoundPct by 5 per missed day (minimum 0).
// Updates the learner record and returns the new value.

export async function calculateBrainCompoundDrain(learnerId: string): Promise<number> {
  const learner = await prisma.learner.findUnique({
    where: { id: learnerId },
    select: { brainCompoundPct: true },
  })

  if (!learner) throw new Error(`Learner not found: ${learnerId}`)

  const threeDaysAgo = new Date()
  threeDaysAgo.setUTCDate(threeDaysAgo.getUTCDate() - 3)

  const recentReview = await prisma.sRQueueItem.findFirst({
    where: {
      learnerId,
      lastReviewedAt: { gte: threeDaysAgo },
    },
    select: { lastReviewedAt: true },
    orderBy: { lastReviewedAt: 'desc' },
  })

  if (recentReview) {
    return learner.brainCompoundPct
  }

  const oldestReview = await prisma.sRQueueItem.findFirst({
    where: { learnerId, lastReviewedAt: { not: null } },
    select: { lastReviewedAt: true },
    orderBy: { lastReviewedAt: 'desc' },
  })

  let missedDays = 3
  if (oldestReview?.lastReviewedAt) {
    const msSinceLastReview = Date.now() - oldestReview.lastReviewedAt.getTime()
    const daysSinceLastReview = Math.floor(msSinceLastReview / (1000 * 60 * 60 * 24))
    missedDays = Math.max(3, daysSinceLastReview)
  }

  const drain = (missedDays - 2) * 5
  const newPct = Math.max(0, learner.brainCompoundPct - drain)

  await prisma.learner.update({
    where: { id: learnerId },
    data: { brainCompoundPct: newPct },
  })

  return newPct
}
