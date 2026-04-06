import { useProgressStore } from '@/stores/progressStore'
import type {
  LearnerProfile,
  LevelProgress,
  Badge,
  MapLevel,
  TodayMissions,
  FeynmanScorePoint,
  ServerBadge,
  LevelProgressRecord,
} from '@/stores/progressStore'

export function useProgress() {
  const learnerProfile = useProgressStore((s) => s.learnerProfile)
  const levelProgress = useProgressStore((s) => s.levelProgress)
  const totalXP = useProgressStore((s) => s.totalXP)
  const streak = useProgressStore((s) => s.streak)
  const brainCompoundPct = useProgressStore((s) => s.brainCompoundPct)
  const badges = useProgressStore((s) => s.badges)
  const batmanModeActive = useProgressStore((s) => s.batmanModeActive)
  const batmanSkipUsedThisWeek = useProgressStore((s) => s.batmanSkipUsedThisWeek)
  const mapLevels = useProgressStore((s) => s.mapLevels)
  const todayMissions = useProgressStore((s) => s.todayMissions)
  const myWhy = useProgressStore((s) => s.myWhy)
  const feynmanScoreTrend = useProgressStore((s) => s.feynmanScoreTrend)
  const levelProgressList = useProgressStore((s) => s.levelProgressList)
  const totalDaysActive = useProgressStore((s) => s.totalDaysActive)
  const serverBadges = useProgressStore((s) => s.serverBadges)

  const loadDashboard = useProgressStore((s) => s.loadDashboard)
  const loadMasteryMap = useProgressStore((s) => s.loadMasteryMap)
  const loadStats = useProgressStore((s) => s.loadStats)
  const setLearnerProfile = useProgressStore((s) => s.setLearnerProfile)
  const setStats = useProgressStore((s) => s.setStats)
  const setBatmanState = useProgressStore((s) => s.setBatmanState)

  return {
    learnerProfile,
    levelProgress,
    totalXP,
    streak,
    brainCompoundPct,
    badges,
    batmanModeActive,
    batmanSkipUsedThisWeek,
    mapLevels,
    todayMissions,
    myWhy,
    feynmanScoreTrend,
    levelProgressList,
    totalDaysActive,
    serverBadges,
    loadDashboard,
    loadMasteryMap,
    loadStats,
    setLearnerProfile,
    setStats,
    setBatmanState,
  }
}

export type {
  LearnerProfile,
  LevelProgress,
  Badge,
  MapLevel,
  TodayMissions,
  FeynmanScorePoint,
  ServerBadge,
  LevelProgressRecord,
}
