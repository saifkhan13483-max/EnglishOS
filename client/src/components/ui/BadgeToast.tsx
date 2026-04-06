import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBadgeStore } from '@/stores/badgeStore'

const BADGE_META: Record<string, { name: string; icon: string }> = {
  MODULE_COMPLETE_L1_M1: { name: 'Alphabet Master',      icon: '🔤' },
  MODULE_COMPLETE_L1_M2: { name: 'Word Collector',       icon: '📚' },
  MODULE_COMPLETE_L1_M3: { name: 'Sentence Builder',     icon: '🔧' },
  MODULE_COMPLETE_L1_M4: { name: 'Phrase Master',        icon: '💬' },
  LEVEL_COMPLETE_L1:     { name: 'Base Camp Conquered',  icon: '🏔️' },
  STREAK_7:              { name: 'Week Warrior',         icon: '🔥' },
  STREAK_30:             { name: 'Month Master',         icon: '⚡' },
  BATMAN_MODE:           { name: 'Batman Mode',          icon: '🦇' },
  FEYNMAN_FIRST:         { name: 'First Explainer',      icon: '🧠' },
  FEYNMAN_SCORE_90:      { name: 'Clarity Champion',     icon: '💡' },
  PERFECT_GATE:          { name: 'First Try',            icon: '✨' },
  LEADERBOARD_TOP3:      { name: 'Community Voice',      icon: '🎤' },
}

const AUTO_DISMISS_MS = 4000

export default function BadgeToast() {
  const queue     = useBadgeStore((s) => s.queue)
  const shiftBadge = useBadgeStore((s) => s.shiftBadge)

  const current = queue[0] ?? null

  useEffect(() => {
    if (!current) return
    const timer = setTimeout(shiftBadge, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [current, shiftBadge])

  const meta = current ? (BADGE_META[current.badgeType] ?? { name: current.badgeType, icon: '🏅' }) : null

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3 pointer-events-none">
      <AnimatePresence mode="wait">
        {current && meta && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: -32, scale: 0.88 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{    opacity: 0, y: -16,  scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="pointer-events-auto"
          >
            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                border: '1.5px solid rgba(233,69,96,0.45)',
                backdropFilter: 'blur(12px)',
                minWidth: '220px',
                maxWidth: '340px',
              }}
              onClick={shiftBadge}
            >
              <span className="text-3xl leading-none select-none">{meta.icon}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E94560] leading-none mb-0.5">
                  Badge Unlocked
                </span>
                <span className="text-sm font-semibold text-white leading-snug truncate">
                  {meta.name}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
