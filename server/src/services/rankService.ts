// ── Rank thresholds (from PRD) ────────────────────────────────────────────────

export interface RankThreshold {
  name: string
  minXp: number
}

export const RANK_THRESHOLDS: RankThreshold[] = [
  { name: 'Polymath',          minXp: 20_000 },
  { name: 'Professional',      minXp: 12_000 },
  { name: 'Fluent',            minXp:  6_000 },
  { name: 'Conversationalist', minXp:  3_000 },
  { name: 'Communicator',      minXp:  1_500 },
  { name: 'Speaker',           minXp:    500 },
  { name: 'Rookie',            minXp:      0 },
]

/**
 * Returns the rank name for the given total XP.
 * Thresholds (from PRD):
 *   Rookie: 0 XP
 *   Speaker: 500 XP
 *   Communicator: 1500 XP
 *   Conversationalist: 3000 XP
 *   Fluent: 6000 XP
 *   Professional: 12000 XP
 *   Polymath: 20000 XP
 */
export function calculateRank(totalXP: number): string {
  for (const threshold of RANK_THRESHOLDS) {
    if (totalXP >= threshold.minXp) return threshold.name
  }
  return 'Rookie'
}
