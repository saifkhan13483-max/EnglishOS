import { useProgressStore } from '@/stores/progressStore'
import { useMissionStore } from '@/stores/missionStore'
import { useSRStore } from '@/stores/srStore'
import { useBadgeStore } from '@/stores/badgeStore'

export function useGamification() {
  const xp = useProgressStore((s) => s.totalXP)
  const streak = useProgressStore((s) => s.streak)
  const brainCompoundPct = useProgressStore((s) => s.brainCompoundPct)
  const batmanModeActive = useProgressStore((s) => s.batmanModeActive)
  const batmanSkipUsedThisWeek = useProgressStore((s) => s.batmanSkipUsedThisWeek)
  const serverBadges = useProgressStore((s) => s.serverBadges)
  const learnerProfile = useProgressStore((s) => s.learnerProfile)

  const missionXpEarned = useMissionStore((s) => s.xpEarned)
  const rankUp = useMissionStore((s) => s.rankUp)
  const newRank = useMissionStore((s) => s.newRank)
  const batmanModeActivated = useMissionStore((s) => s.batmanModeActivated)
  const batmanSkipProtected = useMissionStore((s) => s.batmanSkipProtected)
  const addXp = useMissionStore((s) => s.addXp)

  const srBrainCompoundPct = useSRStore((s) => s.brainCompoundPct)
  const pendingCount = useSRStore((s) => s.pendingCount)

  const badgeQueue = useBadgeStore((s) => s.queue)
  const shiftBadge = useBadgeStore((s) => s.shiftBadge)

  const rank = learnerProfile ? (learnerProfile as unknown as { rank?: string }).rank : undefined

  return {
    xp,
    streak,
    brainCompoundPct: Math.max(brainCompoundPct, srBrainCompoundPct),
    batmanModeActive,
    batmanSkipUsedThisWeek,
    serverBadges,
    rank,
    missionXpEarned,
    rankUp,
    newRank,
    batmanModeActivated,
    batmanSkipProtected,
    pendingSRCount: pendingCount,
    badgeQueue,
    addXp,
    shiftBadge,
  }
}
