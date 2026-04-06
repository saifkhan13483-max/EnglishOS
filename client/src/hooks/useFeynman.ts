import { useMissionStore } from '@/stores/missionStore'
import type { FeynmanResult } from '@/stores/missionStore'

export function useFeynman() {
  const feynmanResult = useMissionStore((s) => s.feynmanResult)
  const isLoading = useMissionStore((s) => s.isLoading)
  const error = useMissionStore((s) => s.error)
  const submitFeynmanResponse = useMissionStore((s) => s.submitFeynmanResponse)

  const scores = feynmanResult?.scores ?? null
  const overallScore = feynmanResult?.scores?.overall ?? null
  const feedback = feynmanResult?.feedback ?? null
  const suggestion = feynmanResult?.suggestion ?? null
  const knowledgeGaps = feynmanResult?.knowledgeGaps ?? []

  return {
    feynmanResult,
    scores,
    overallScore,
    feedback,
    suggestion,
    knowledgeGaps,
    isLoading,
    error,
    submitFeynmanResponse,
  }
}

export type { FeynmanResult }
