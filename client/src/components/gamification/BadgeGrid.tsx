import { motion } from 'framer-motion'

export interface BadgeDef {
  type: string
  icon: string
  name: string
  description: string
  color: string
}

const ALL_BADGES: BadgeDef[] = [
  { type: 'MODULE_COMPLETE_L1_M1', icon: '🔤', name: 'Alphabet Master',     description: 'Completed Level 1 — Alphabets & Sounds',      color: '#4A9EFF' },
  { type: 'MODULE_COMPLETE_L1_M2', icon: '📚', name: 'Word Collector',       description: 'Completed Level 1 — Core 100 Words',           color: '#2ECC71' },
  { type: 'MODULE_COMPLETE_L1_M3', icon: '🔧', name: 'Sentence Builder',     description: 'Completed Level 1 — Basic Sentences',          color: '#F5B014' },
  { type: 'MODULE_COMPLETE_L1_M4', icon: '💬', name: 'Phrase Master',        description: 'Completed Level 1 — Speaking Practice',        color: '#E94560' },
  { type: 'LEVEL_COMPLETE_L1',     icon: '🏔️', name: 'Base Camp Conquered', description: 'Passed the Level 1 Gate — Base Camp done!',    color: '#F97316' },
  { type: 'MODULE_COMPLETE_L2_M1', icon: '⏱️', name: 'Tense Starter',       description: 'Completed Level 2 — Present Tense',            color: '#4A9EFF' },
  { type: 'MODULE_COMPLETE_L2_M2', icon: '⏮️', name: 'Past Explorer',       description: 'Completed Level 2 — Past Tense',               color: '#9B59B6' },
  { type: 'MODULE_COMPLETE_L2_M3', icon: '⏭️', name: 'Future Planner',      description: 'Completed Level 2 — Future Tense',             color: '#2ECC71' },
  { type: 'MODULE_COMPLETE_L2_M4', icon: '🗣️', name: 'Conversationalist',   description: 'Completed Level 2 — Daily Conversations',      color: '#E94560' },
  { type: 'LEVEL_COMPLETE_L2',     icon: '🏘️', name: 'Village Graduate',    description: 'Passed the Level 2 Gate — Village complete!',  color: '#F97316' },
  { type: 'STREAK_7',              icon: '🔥', name: 'Week Warrior',         description: 'Maintained a 7-day learning streak',           color: '#E94560' },
  { type: 'STREAK_30',             icon: '⚡', name: 'Month Master',         description: 'Maintained a 30-day learning streak',          color: '#F5B014' },
  { type: 'BATMAN_MODE',           icon: '🦇', name: 'Batman Mode',          description: 'Activated Batman Mode to protect a streak',    color: '#9B59B6' },
  { type: 'FEYNMAN_FIRST',         icon: '🧠', name: 'First Explainer',      description: 'Submitted your first Feynman explanation',     color: '#4A9EFF' },
  { type: 'FEYNMAN_SCORE_90',      icon: '💡', name: 'Clarity Champion',     description: 'Scored 90%+ on a Feynman evaluation',          color: '#F5B014' },
  { type: 'PERFECT_GATE',          icon: '✨', name: 'First Try',            description: 'Passed a Level Gate on the first attempt',     color: '#2ECC71' },
  { type: 'LEADERBOARD_TOP3',      icon: '🎤', name: 'Community Voice',      description: 'Ranked Top 3 on the Feynman Leaderboard',      color: '#E94560' },
]

interface BadgeGridProps {
  earnedTypes: string[]
  compact?: boolean
  showAll?: boolean
}

export default function BadgeGrid({ earnedTypes, compact = false, showAll = true }: BadgeGridProps) {
  const earnedSet = new Set(earnedTypes)
  const badges = showAll ? ALL_BADGES : ALL_BADGES.filter(b => earnedSet.has(b.type))

  if (badges.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-6">
        <span className="text-3xl">🏅</span>
        <p className="text-sm text-text-muted text-center">Complete missions to earn badges</p>
      </div>
    )
  }

  return (
    <div className={`grid ${compact ? 'grid-cols-4 gap-2' : 'grid-cols-3 sm:grid-cols-4 gap-3'}`}>
      {badges.map((badge, i) => {
        const earned = earnedSet.has(badge.type)
        return (
          <motion.div
            key={badge.type}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            title={earned ? `${badge.name} — ${badge.description}` : `${badge.name} — Locked`}
            className={[
              'flex flex-col items-center gap-1.5 rounded-xl border transition-all duration-200',
              compact ? 'p-2' : 'p-3',
              earned
                ? 'border-border-strong bg-bg-secondary cursor-default'
                : 'border-border-subtle bg-bg-primary opacity-40 cursor-default',
            ].join(' ')}
          >
            <span
              className={`${compact ? 'text-xl' : 'text-2xl'} ${!earned ? 'grayscale' : ''}`}
              style={{ filter: earned ? 'none' : 'grayscale(1)' }}
            >
              {earned ? badge.icon : '🔒'}
            </span>
            {!compact && (
              <span
                className="text-[10px] font-display font-semibold text-center leading-tight line-clamp-2"
                style={{ color: earned ? badge.color : '#6A6A8A' }}
              >
                {badge.name}
              </span>
            )}
            {!compact && earned && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.color }} />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
