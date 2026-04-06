import { create } from 'zustand'

export interface BadgeRecord {
  id: string
  badgeType: string
  earnedAt: string
}

interface BadgeStore {
  queue: BadgeRecord[]
  addBadges: (badges: BadgeRecord[]) => void
  shiftBadge: () => void
}

export const useBadgeStore = create<BadgeStore>((set) => ({
  queue: [],

  addBadges: (badges) =>
    set((s) => ({ queue: [...s.queue, ...badges] })),

  shiftBadge: () =>
    set((s) => ({ queue: s.queue.slice(1) })),
}))
