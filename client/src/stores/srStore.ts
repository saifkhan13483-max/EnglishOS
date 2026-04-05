import { create } from 'zustand'
import { api } from '@/services/api'

export interface SRCard {
  id: string          // SRQueueItem.id — used for markReviewed
  itemId: string      // ContentItem.id
  english: string
  romanUrdu: string
  example: string
  isPowerPack: boolean
  intervalDays: number
  easeFactor: number
}

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

interface SRStore {
  dailyQueue: SRCard[]
  reviewedToday: number
  pendingCount: number

  setDailyQueue: (raw: unknown[]) => void
  markReviewed: (queueItemId: string, correct: boolean) => Promise<void>
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

export const useSRStore = create<SRStore>((set) => ({
  dailyQueue: [],
  reviewedToday: 0,
  pendingCount: 0,

  setDailyQueue: (raw) => {
    const cards = (raw as RawQueueItem[]).slice(0, 5).map(mapRawToCard)
    set({ dailyQueue: cards, pendingCount: raw.length })
  },

  markReviewed: async (queueItemId, correct) => {
    try {
      await api.patch(`/api/v1/content/sr-queue/${queueItemId}`, { correct })
      set((s) => ({
        reviewedToday: s.reviewedToday + 1,
        dailyQueue: s.dailyQueue.filter((c) => c.id !== queueItemId),
      }))
    } catch {
      // Fail silently — review continues even if API call fails
    }
  },
}))
