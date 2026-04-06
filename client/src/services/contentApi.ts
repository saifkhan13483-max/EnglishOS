import { api } from '@/services/api'
import type { SRCard } from '@/stores/srStore'

interface RawQueueItem {
  id: string
  itemId: string
  intervalDays: number
  easeFactor: number
  item: {
    english: string
    urduRoman: string
    exampleSentence: string
    isPowerPack: boolean
  }
}

export interface SRReviewPayload {
  itemId: string
  wasCorrect: boolean
}

export interface BulkReviewResponse {
  updatedItems: unknown[]
  newBrainCompoundPct: number
  deepMissionUnlocked: boolean
}

export interface TodayQueueResponse {
  cards: SRCard[]
  totalDue: number
}

function mapRawToCard(raw: RawQueueItem): SRCard {
  return {
    id: raw.id,
    itemId: raw.itemId,
    english: raw.item.english,
    romanUrdu: raw.item.urduRoman,
    example: raw.item.exampleSentence,
    isPowerPack: raw.item.isPowerPack,
    intervalDays: raw.intervalDays,
    easeFactor: raw.easeFactor,
  }
}

export const contentApi = {
  async getTodayQueue(): Promise<TodayQueueResponse> {
    const res = await api.get<{ success: boolean; data: RawQueueItem[] }>(
      '/api/v1/content/sr-queue/today'
    )
    return {
      cards: res.data.map(mapRawToCard),
      totalDue: res.data.length,
    }
  },

  async getTomorrowQueue(): Promise<{ count: number; words: string[] }> {
    const res = await api.get<{ success: boolean; data: { count: number; words: string[] } }>(
      '/api/v1/content/sr-queue/tomorrow'
    )
    return res.data
  },

  async bulkReview(reviews: SRReviewPayload[]): Promise<BulkReviewResponse> {
    const res = await api.post<{ success: boolean; data: BulkReviewResponse }>(
      '/api/v1/content/sr-review',
      { reviews }
    )
    return res.data
  },
}
