import { create } from 'zustand'

export interface SRCard {
  id: string
  word: string
  translation: string
  romanUrdu: string
  example: string
  nextReviewAt: string
  interval: number
  easeFactor: number
  repetitions: number
}

interface SRStore {
  dailyQueue: SRCard[]
  reviewedToday: number
  pendingCount: number
}

export const useSRStore = create<SRStore>(() => ({
  dailyQueue: [],
  reviewedToday: 0,
  pendingCount: 0,
}))
