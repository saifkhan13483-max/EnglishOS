import { api } from './api'
import type { MapLevel, TodayMissions, FeynmanScorePoint, ServerBadge, LevelProgressRecord } from '@/stores/progressStore'

export interface DashboardResponse {
  streak: number
  batmanModeActive: boolean
  brainCompoundPct: number
  xp: number
  rank: string
  myWhy: string | null
  badgeCount: number
  todayMissions: TodayMissions
}

export interface StatsResponse {
  totalDaysActive: number
  currentStreak: number
  totalXP: number
  brainCompoundPct: number
  feynmanScoreTrend: FeynmanScorePoint[]
  badgeList: ServerBadge[]
  levelProgressList: LevelProgressRecord[]
}

export async function fetchDashboard(): Promise<DashboardResponse> {
  const res = await api.get<{ success: boolean; data: DashboardResponse }>('/api/v1/progress/dashboard')
  return res.data
}

export async function fetchMasteryMap(): Promise<MapLevel[]> {
  const res = await api.get<{ success: boolean; data: { levels: MapLevel[] } }>('/api/v1/progress/map')
  return res.data.levels
}

export async function fetchStats(): Promise<StatsResponse> {
  const res = await api.get<{ success: boolean; data: StatsResponse }>('/api/v1/progress/stats')
  return res.data
}
