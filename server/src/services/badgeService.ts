import { Badge } from '@prisma/client'
import { prisma } from '../lib/prisma'

// ── Badge metadata ─────────────────────────────────────────────────────────────

export interface BadgeDefinition {
  name: string
  description: string
  icon: string
}

export const BADGE_DEFINITIONS: Record<string, BadgeDefinition> = {
  MODULE_COMPLETE_L1_M1: {
    name: 'Alphabet Master',
    description: 'Completed Level 1 Module 1',
    icon: '🔤',
  },
  MODULE_COMPLETE_L1_M2: {
    name: 'Word Collector',
    description: 'Completed Level 1 Module 2',
    icon: '📚',
  },
  MODULE_COMPLETE_L1_M3: {
    name: 'Sentence Builder',
    description: 'Completed Level 1 Module 3',
    icon: '🔧',
  },
  MODULE_COMPLETE_L1_M4: {
    name: 'Phrase Master',
    description: 'Completed Level 1 Module 4',
    icon: '💬',
  },
  LEVEL_COMPLETE_L1: {
    name: 'Base Camp Conquered',
    description: 'Passed the Level 1 Gate',
    icon: '🏔️',
  },
  STREAK_7: {
    name: 'Week Warrior',
    description: 'Achieved a 7-day learning streak',
    icon: '🔥',
  },
  STREAK_30: {
    name: 'Month Master',
    description: 'Achieved a 30-day learning streak',
    icon: '⚡',
  },
  BATMAN_MODE: {
    name: 'Batman Mode',
    description: 'Batman Mode first activated',
    icon: '🦇',
  },
  FEYNMAN_FIRST: {
    name: 'First Explainer',
    description: 'Completed your first Feynman Moment',
    icon: '🧠',
  },
  FEYNMAN_SCORE_90: {
    name: 'Clarity Champion',
    description: 'Scored 90 or above on a Feynman evaluation',
    icon: '💡',
  },
  PERFECT_GATE: {
    name: 'First Try',
    description: 'Passed a Level Gate on the first attempt',
    icon: '✨',
  },
  LEADERBOARD_TOP3: {
    name: 'Community Voice',
    description: 'Reached the Top 3 on the leaderboard',
    icon: '🎤',
  },
}

// ── Trigger type definitions ───────────────────────────────────────────────────

export type BadgeTrigger =
  | { type: 'MISSION_COMPLETE'; streak: number; batmanMode: boolean }
  | { type: 'GATE_PASS'; level: number; isFirstAttempt: boolean }
  | { type: 'MODULE_COMPLETE'; level: number; module: number }
  | { type: 'FEYNMAN_COMPLETE'; score: number }
  | { type: 'LEADERBOARD_TOP3' }

// ── Internal: determine candidate badge types for a trigger ────────────────────

function getCandidates(trigger: BadgeTrigger): string[] {
  switch (trigger.type) {
    case 'MISSION_COMPLETE': {
      const out: string[] = []
      if (trigger.streak >= 7)  out.push('STREAK_7')
      if (trigger.streak >= 30) out.push('STREAK_30')
      if (trigger.batmanMode)   out.push('BATMAN_MODE')
      return out
    }

    case 'GATE_PASS': {
      const out: string[] = []
      if (trigger.level === 1)     out.push('LEVEL_COMPLETE_L1')
      if (trigger.isFirstAttempt)  out.push('PERFECT_GATE')
      return out
    }

    case 'MODULE_COMPLETE': {
      if (trigger.level === 1 && trigger.module >= 1 && trigger.module <= 4) {
        return [`MODULE_COMPLETE_L1_M${trigger.module}`]
      }
      return []
    }

    case 'FEYNMAN_COMPLETE': {
      const out = ['FEYNMAN_FIRST']
      if (trigger.score >= 90) out.push('FEYNMAN_SCORE_90')
      return out
    }

    case 'LEADERBOARD_TOP3':
      return ['LEADERBOARD_TOP3']

    default:
      return []
  }
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Checks whether any badge should be awarded based on the trigger event, awards
 * each one that has not yet been earned, and returns the newly-created badge records.
 * Safe to call multiple times for the same event — already-earned badges are skipped.
 */
export async function checkAndAwardBadges(
  learnerId: string,
  trigger: BadgeTrigger,
): Promise<Badge[]> {
  const candidates = getCandidates(trigger)
  if (!candidates.length) return []

  // Fetch already-earned badges for these types in one query
  const existing = await prisma.badge.findMany({
    where: { learnerId, badgeType: { in: candidates } },
    select: { badgeType: true },
  })
  const earnedSet = new Set(existing.map((b) => b.badgeType))

  const toCreate = candidates.filter((t) => !earnedSet.has(t))
  if (!toCreate.length) return []

  const now = new Date()

  // createMany with skipDuplicates as a safety net against race conditions
  await prisma.badge.createMany({
    data: toCreate.map((badgeType) => ({ learnerId, badgeType, earnedAt: now })),
    skipDuplicates: true,
  })

  // Return the freshly awarded records so callers can include them in responses
  return prisma.badge.findMany({
    where: { learnerId, badgeType: { in: toCreate } },
    orderBy: { earnedAt: 'desc' },
  })
}
