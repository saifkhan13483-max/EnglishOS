import { create } from 'zustand'
import { api } from '@/services/api'
import { useProgressStore } from './progressStore'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface SRCard {
  id: string          // SRQueueItem.id
  itemId: string      // ContentItem.id — used for bulk review calls
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

interface PendingReview {
  itemId: string
  wasCorrect: boolean
}

interface SRStore {
  dailyQueue: SRCard[]
  reviewedToday: string[]       // itemIds reviewed this session
  pendingCount: number          // items still due (total from server)
  brainCompoundPct: number      // updated after syncReviews
  _pendingReviews: PendingReview[] // internal buffer — not for external use

  // Backward-compat setter used by missionStore.loadDailyQueue
  setDailyQueue: (raw: unknown[]) => void

  // Primary actions
  loadDailyQueue: () => Promise<void>
  markReviewed: (itemId: string, wasCorrect: boolean) => void
  syncReviews: () => Promise<{ newBrainCompoundPct: number; deepMissionUnlocked: boolean } | null>
}

// ── Mapper ────────────────────────────────────────────────────────────────────

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

// ── Store ─────────────────────────────────────────────────────────────────────

export const useSRStore = create<SRStore>((set, get) => ({
  dailyQueue: [],
  reviewedToday: [],
  pendingCount: 0,
  brainCompoundPct: 0,
  _pendingReviews: [],

  // ── Backward-compat: missionStore still calls this via setDailyQueue
  setDailyQueue: (raw) => {
    const all = raw as RawQueueItem[]
    const cards = all.slice(0, 5).map(mapRawToCard)
    set({ dailyQueue: cards, pendingCount: all.length })
  },

  // ── Load today's SR queue directly from the store
  loadDailyQueue: async () => {
    try {
      const res = await api.get<{ success: boolean; data: unknown[] }>(
        '/api/v1/content/sr-queue/today'
      )
      const all = res.data as RawQueueItem[]
      const cards = all.slice(0, 20).map(mapRawToCard)
      set({ dailyQueue: cards, pendingCount: all.length })
    } catch {
      // Fail silently — queue stays empty, mission can still proceed
    }
  },

  // ── Buffer a review locally (removes card from queue immediately)
  markReviewed: (itemId, wasCorrect) => {
    set((s) => ({
      dailyQueue: s.dailyQueue.filter((c) => c.itemId !== itemId),
      reviewedToday: s.reviewedToday.includes(itemId)
        ? s.reviewedToday
        : [...s.reviewedToday, itemId],
      _pendingReviews: [...s._pendingReviews, { itemId, wasCorrect }],
    }))
  },

  // ── Flush the buffer to the server in one bulk call
  syncReviews: async () => {
    const { _pendingReviews } = get()
    if (_pendingReviews.length === 0) return null

    try {
      const res = await api.post<{
        success: boolean
        data: {
          updatedItems: unknown[]
          newBrainCompoundPct: number
          deepMissionUnlocked: boolean
        }
      }>('/api/v1/content/sr-review', { reviews: _pendingReviews })

      const { newBrainCompoundPct, deepMissionUnlocked } = res.data
      set({ brainCompoundPct: newBrainCompoundPct, _pendingReviews: [] })

      // Keep progressStore in sync so the TopBar mini meter reflects the new value
      const ps = useProgressStore.getState()
      useProgressStore.setState({
        brainCompoundPct: newBrainCompoundPct,
        totalXP: ps.totalXP,
        streak: ps.streak,
      })

      return { newBrainCompoundPct, deepMissionUnlocked }
    } catch {
      // Fail silently — reviews stay buffered, will retry on next sync
      return null
    }
  },
}))
