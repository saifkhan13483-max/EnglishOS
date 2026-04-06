import { useEffect } from 'react'
import { useSRStore } from '@/stores/srStore'

export function useSRQueue() {
  const {
    dailyQueue,
    reviewedToday,
    pendingCount,
    brainCompoundPct,
    loadDailyQueue,
    markReviewed,
    syncReviews,
  } = useSRStore()

  useEffect(() => {
    if (dailyQueue.length === 0 && reviewedToday.length === 0) {
      loadDailyQueue()
    }
  }, [dailyQueue.length, reviewedToday.length, loadDailyQueue])

  return {
    dailyQueue,
    reviewedToday,
    pendingCount,
    brainCompoundPct,
    loadDailyQueue,
    markReviewed,
    syncReviews,
    warmupCards: dailyQueue.slice(0, 5),
    hasCardsToday: dailyQueue.length > 0 || reviewedToday.length > 0,
  }
}
