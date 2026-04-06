import { useMissionStore } from '@/stores/missionStore'
import type { MissionType, MissionPhase, ContentItem, FeynmanResult } from '@/stores/missionStore'

export function useMission() {
  const missionId = useMissionStore((s) => s.missionId)
  const currentMission = useMissionStore((s) => s.currentMission)
  const currentPhase = useMissionStore((s) => s.currentPhase)
  const moduleContent = useMissionStore((s) => s.moduleContent)
  const feynmanResult = useMissionStore((s) => s.feynmanResult)
  const xpEarned = useMissionStore((s) => s.xpEarned)
  const isComplete = useMissionStore((s) => s.isComplete)
  const isLoading = useMissionStore((s) => s.isLoading)
  const error = useMissionStore((s) => s.error)
  const rankUp = useMissionStore((s) => s.rankUp)
  const newRank = useMissionStore((s) => s.newRank)
  const batmanModeActivated = useMissionStore((s) => s.batmanModeActivated)
  const batmanSkipProtected = useMissionStore((s) => s.batmanSkipProtected)

  const startMission = useMissionStore((s) => s.startMission)
  const loadDailyQueue = useMissionStore((s) => s.loadDailyQueue)
  const loadModuleContent = useMissionStore((s) => s.loadModuleContent)
  const completeMission = useMissionStore((s) => s.completeMission)
  const submitFeynmanResponse = useMissionStore((s) => s.submitFeynmanResponse)
  const setPhase = useMissionStore((s) => s.setPhase)
  const addXp = useMissionStore((s) => s.addXp)
  const reset = useMissionStore((s) => s.reset)

  return {
    missionId,
    currentMission,
    currentPhase,
    moduleContent,
    feynmanResult,
    xpEarned,
    isComplete,
    isLoading,
    error,
    rankUp,
    newRank,
    batmanModeActivated,
    batmanSkipProtected,
    startMission,
    loadDailyQueue,
    loadModuleContent,
    completeMission,
    submitFeynmanResponse,
    setPhase,
    addXp,
    reset,
  }
}

export type { MissionType, MissionPhase, ContentItem, FeynmanResult }
