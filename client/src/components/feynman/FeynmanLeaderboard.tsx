import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '@/components/ui/Badge'

export interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  module: number
  prompt: string
  responseText: string
  score: number
  upvoteCount: number
  submittedAt: string
  hasUpvoted: boolean
}

interface FeynmanLeaderboardProps {
  entries: LeaderboardEntry[]
  onUpvote?: (entryId: string) => Promise<void>
  isLoading?: boolean
}

const RANK_CONFIG: Record<number, { emoji: string; color: string; label: string }> = {
  1: { emoji: '🥇', color: '#F5B014', label: '1st Place' },
  2: { emoji: '🥈', color: '#C8C8E0', label: '2nd Place' },
  3: { emoji: '🥉', color: '#F97316', label: '3rd Place' },
}

const MODULE_NAMES: Record<number, string> = {
  1: 'Alphabets & Sounds',
  2: 'Core 100 Words',
  3: 'Basic Sentences',
  4: 'Speaking Practice',
  5: 'Present Tense',
  6: 'Past Tense',
  7: 'Future Tense',
  8: 'Daily Conversations',
}

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-brand-blue"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="text-xs font-mono text-brand-blue shrink-0">{Math.round(score)}%</span>
    </div>
  )
}

interface EntryCardProps {
  entry: LeaderboardEntry
  onUpvote?: (id: string) => Promise<void>
  expanded: boolean
  onToggle: () => void
}

function EntryCard({ entry, onUpvote, expanded, onToggle }: EntryCardProps) {
  const [upvoting, setUpvoting] = useState(false)
  const rank = RANK_CONFIG[entry.rank]

  async function handleUpvote(e: React.MouseEvent) {
    e.stopPropagation()
    if (!onUpvote || entry.hasUpvoted || upvoting) return
    setUpvoting(true)
    try {
      await onUpvote(entry.id)
    } finally {
      setUpvoting(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'border rounded-2xl overflow-hidden transition-colors duration-200 cursor-pointer',
        rank
          ? entry.rank === 1
            ? 'border-brand-gold/50 bg-brand-gold/5'
            : entry.rank === 2
            ? 'border-border-strong bg-bg-secondary'
            : 'border-orange-500/30 bg-orange-500/5'
          : 'border-border-subtle bg-bg-secondary hover:border-border-strong',
      ].join(' ')}
      onClick={onToggle}
    >
      <div className="p-4 flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xl bg-bg-tertiary border border-border-subtle">
          {rank ? rank.emoji : <span className="text-sm font-mono text-text-muted">#{entry.rank}</span>}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-display font-semibold text-text-primary text-sm truncate">
              {entry.name}
            </span>
            {rank && (
              <Badge variant="gold" size="sm">{rank.label}</Badge>
            )}
            <Badge variant="muted" size="sm">
              {MODULE_NAMES[entry.module] ?? `Module ${entry.module}`}
            </Badge>
          </div>

          <p className="text-xs text-text-muted font-mono mb-2 line-clamp-1 italic">
            "{entry.prompt}"
          </p>

          <ScoreBar score={entry.score} />
        </div>

        <div className="shrink-0 flex flex-col items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleUpvote}
            disabled={entry.hasUpvoted || !onUpvote || upvoting}
            className={[
              'flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg border transition-colors text-xs',
              entry.hasUpvoted
                ? 'border-brand-red/40 bg-brand-red/10 text-brand-red'
                : 'border-border-subtle bg-bg-tertiary text-text-muted hover:border-brand-red/40 hover:text-brand-red',
            ].join(' ')}
          >
            <span>{entry.hasUpvoted ? '❤️' : '🤍'}</span>
            <span className="font-mono">{entry.upvoteCount}</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border-subtle pt-3">
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
                Their Explanation
              </p>
              <p className="text-sm text-text-secondary font-body leading-relaxed">
                {entry.responseText}
              </p>
              <p className="text-xs text-text-muted font-mono mt-3">
                Submitted {new Date(entry.submittedAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                })}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FeynmanLeaderboard({ entries, onUpvote, isLoading }: FeynmanLeaderboardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-bg-secondary border border-border-subtle rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <span className="text-5xl">🧠</span>
        <p className="font-display font-semibold text-text-primary text-center">
          No entries yet this week
        </p>
        <p className="text-sm text-text-muted text-center max-w-xs">
          Complete a Feynman Moment to appear on the leaderboard. The best explanations get featured here.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {entries.map(entry => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onUpvote={onUpvote}
          expanded={expandedId === entry.id}
          onToggle={() => setExpandedId(prev => prev === entry.id ? null : entry.id)}
        />
      ))}
    </div>
  )
}
