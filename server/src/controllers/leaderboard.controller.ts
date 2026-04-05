import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns the ISO 8601 week string for a given date, e.g. "2026-W14".
 * ISO weeks start on Monday. Week 1 is the week containing the first Thursday.
 */
function isoWeekString(date: Date = new Date()): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  // Set to nearest Thursday: current date + 4 - current day number (Mon=1 ... Sun=7)
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`
}

/**
 * Anonymises a full name: "Ahmed Khan" → "Ahmed K."
 * Single-word names are returned as-is.
 */
function anonymiseName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return parts[0]
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}

// ── GET /api/v1/leaderboard/feynman/weekly ────────────────────────────────────

export async function getWeeklyLeaderboard(req: AuthRequest, res: Response): Promise<void> {
  const week = isoWeekString()

  const entries = await prisma.leaderboardEntry.findMany({
    where: { week },
    include: {
      learner: {
        select: { name: true },
      },
    },
    orderBy: [
      { upvoteCount: 'desc' },
      { clarityScore: 'desc' },
    ],
  })

  const data = entries.map((entry) => ({
    id: entry.id,
    week: entry.week,
    module: entry.module,
    prompt: entry.prompt,
    responseText: entry.responseText,
    clarityScore: entry.clarityScore,
    upvoteCount: entry.upvoteCount,
    submittedAt: entry.submittedAt,
    learnerName: anonymiseName(entry.learner.name),
  }))

  res.json({ success: true, data, week })
}

// ── POST /api/v1/leaderboard/feynman/submit ───────────────────────────────────

export async function submitFeynman(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string
  const { module, prompt, responseText, clarityScore } = req.body as {
    module: number
    prompt: string
    responseText: string
    clarityScore: number
  }

  if (typeof module !== 'number' || module < 1) {
    res.status(400).json({ success: false, error: 'module must be a positive number' })
    return
  }
  if (typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ success: false, error: 'prompt is required' })
    return
  }
  if (typeof responseText !== 'string' || !responseText.trim()) {
    res.status(400).json({ success: false, error: 'responseText is required' })
    return
  }
  if (typeof clarityScore !== 'number' || clarityScore < 0 || clarityScore > 100) {
    res.status(400).json({ success: false, error: 'clarityScore must be between 0 and 100' })
    return
  }

  const week = isoWeekString()

  // One submission per learner per week
  const existing = await prisma.leaderboardEntry.findFirst({
    where: { learnerId, week },
  })

  if (existing) {
    res.status(409).json({
      success: false,
      error: 'You have already submitted a Feynman entry this week',
    })
    return
  }

  const entry = await prisma.leaderboardEntry.create({
    data: {
      learnerId,
      week,
      module,
      prompt: prompt.trim(),
      responseText: responseText.trim(),
      clarityScore,
      submittedAt: new Date(),
    },
  })

  res.status(201).json({ success: true, data: entry })
}

// ── POST /api/v1/leaderboard/feynman/:entryId/upvote ─────────────────────────

export async function upvoteEntry(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId as string
  const { entryId } = req.params as { entryId: string }

  const entry = await prisma.leaderboardEntry.findUnique({
    where: { id: entryId },
    select: { id: true, learnerId: true, upvoteCount: true },
  })

  if (!entry) {
    res.status(404).json({ success: false, error: 'Leaderboard entry not found' })
    return
  }

  // Prevent self-upvoting
  if (entry.learnerId === learnerId) {
    res.status(400).json({ success: false, error: 'You cannot upvote your own entry' })
    return
  }

  // Check for duplicate upvote
  const existingUpvote = await prisma.upvote.findUnique({
    where: { learnerId_entryId: { learnerId, entryId } },
  })

  if (existingUpvote) {
    res.status(409).json({ success: false, error: 'You have already upvoted this entry' })
    return
  }

  // Create upvote record and increment counter atomically
  const [, updatedEntry] = await prisma.$transaction([
    prisma.upvote.create({
      data: { learnerId, entryId },
    }),
    prisma.leaderboardEntry.update({
      where: { id: entryId },
      data: { upvoteCount: { increment: 1 } },
      select: { upvoteCount: true },
    }),
  ])

  res.json({ success: true, data: { upvoteCount: updatedEntry.upvoteCount } })
}
