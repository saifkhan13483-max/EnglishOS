import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { api } from '@/services/api'
import SEO from '@/components/layout/SEO'

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */

interface LeaderEntry {
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

interface ApiEntry {
  id: string
  week: string
  module: number
  prompt: string
  responseText: string
  clarityScore: number
  upvoteCount: number
  submittedAt: string
  learnerName: string
}

/* ─────────────────────────────────────────
   Rank config
───────────────────────────────────────── */

const RANK_CONFIG = [
  { emoji: '🥇', label: '1st', color: '#F5B014', bg: 'bg-brand-gold/10', border: 'border-brand-gold/40' },
  { emoji: '🥈', label: '2nd', color: '#C8C8E0', bg: 'bg-bg-tertiary',   border: 'border-border-subtle'  },
  { emoji: '🥉', label: '3rd', color: '#F97316', bg: 'bg-orange-500/10', border: 'border-orange-500/30'  },
]

/* ─────────────────────────────────────────
   Podium card
───────────────────────────────────────── */
function PodiumCard({ entry, config, delay, onUpvote, upvoting }: {
  entry: LeaderEntry
  config: typeof RANK_CONFIG[number]
  delay: number
  onUpvote: (id: string) => void
  upvoting: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 280, damping: 22 }}
      className={`flex-1 ${config.bg} border ${config.border} rounded-2xl p-4 flex flex-col items-center gap-2 text-center`}
    >
      <span className="text-3xl">{config.emoji}</span>
      <span className="text-xs font-mono uppercase tracking-wider" style={{ color: config.color }}>
        {config.label}
      </span>
      <span className="font-display font-bold text-text-primary text-sm">{entry.name}</span>
      <span className="text-[11px] font-body text-text-muted leading-tight">Module {entry.module}</span>
      <span className="font-display font-bold text-xl mt-1" style={{ color: config.color }}>
        {Math.round(entry.score)}%
      </span>
      <button
        onClick={() => onUpvote(entry.id)}
        disabled={entry.hasUpvoted || upvoting}
        className={[
          'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono transition-all',
          entry.hasUpvoted
            ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30'
            : 'bg-bg-tertiary text-text-muted border border-border-subtle hover:border-brand-blue/30 hover:text-brand-blue',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        ].join(' ')}
      >
        👍 {entry.upvoteCount}
      </button>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   Submit modal
───────────────────────────────────────── */
function SubmitModal({ isOpen, onClose, onSubmitted }: {
  isOpen: boolean
  onClose: () => void
  onSubmitted: () => void
}) {
  const [text, setText] = useState('')
  const [moduleNum, setModuleNum] = useState('')
  const [prompt, setPrompt] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const mod = parseInt(moduleNum)
    if (!text.trim() || isNaN(mod) || mod < 1) return
    setSubmitting(true)
    setError(null)
    try {
      await api.post('/api/v1/leaderboard/feynman/submit', {
        module: mod,
        prompt: prompt.trim() || `Module ${mod} explanation`,
        responseText: text.trim(),
        clarityScore: 75,
      })
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        onSubmitted()
        setSubmitted(false)
        setText('')
        setModuleNum('')
        setPrompt('')
      }, 2000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit My Best Explanation"
      footer={
        submitted ? (
          <div className="flex items-center gap-2 text-brand-green text-sm font-body">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Submitted! Results will appear after judging.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {error && <p className="text-xs text-brand-red font-mono">{error}</p>}
            <div className="flex gap-3">
              <Button variant="secondary" size="md" className="flex-1" onClick={onClose}>Cancel</Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => void handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit →'}
              </Button>
            </div>
          </div>
        )
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
            Module Number
          </label>
          <input
            type="number"
            min="1"
            max="6"
            value={moduleNum}
            onChange={e => setModuleNum(e.target.value)}
            placeholder="e.g. 2"
            className="w-full bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
            Prompt / Concept Explained (optional)
          </label>
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="e.g. What are vowels and why are they important?"
            className="w-full bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
            Your Explanation
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={5}
            placeholder="Explain the concept as simply as possible, as if teaching a 10-year-old…"
            className="w-full bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors resize-none"
          />
          <p className="text-xs text-text-muted mt-1.5 font-body">
            Submissions are scored on clarity, vocabulary use, and accuracy.
          </p>
        </div>
      </form>
    </Modal>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function Leaderboard() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [entries, setEntries] = useState<LeaderEntry[]>([])
  const [week, setWeek] = useState('')
  const [loading, setLoading] = useState(true)
  const [upvotingId, setUpvotingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    try {
      const res = await api.get<{ success: boolean; data: ApiEntry[]; week: string }>(
        '/api/v1/leaderboard/feynman/weekly'
      )
      const mapped: LeaderEntry[] = (res.data ?? []).map((entry, i) => ({
        id: entry.id,
        rank: i + 1,
        name: entry.learnerName,
        module: entry.module,
        prompt: entry.prompt,
        responseText: entry.responseText,
        score: entry.clarityScore,
        upvoteCount: entry.upvoteCount,
        submittedAt: entry.submittedAt,
        hasUpvoted: false,
      }))
      setEntries(mapped)
      setWeek(res.week ?? '')
    } catch {
      setEntries([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleUpvote(entryId: string) {
    if (upvotingId) return
    setUpvotingId(entryId)
    try {
      const res = await api.post<{ success: boolean; data: { upvoteCount: number } }>(
        `/api/v1/leaderboard/feynman/${entryId}/upvote`
      )
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? { ...e, upvoteCount: res.data.upvoteCount, hasUpvoted: true }
            : e
        )
      )
    } catch {
      // entry may already be upvoted — mark as upvoted locally
      setEntries((prev) =>
        prev.map((e) => e.id === entryId ? { ...e, hasUpvoted: true } : e)
      )
    } finally {
      setUpvotingId(null)
    }
  }

  const top3 = entries.slice(0, 3)
  const rest = entries.slice(3)

  const weekLabel = week
    ? (() => {
        const [y, w] = week.split('-W')
        const jan1 = new Date(Date.UTC(parseInt(y), 0, 1))
        const weekStart = new Date(jan1.getTime() + (parseInt(w) - 1) * 7 * 24 * 60 * 60 * 1000)
        return weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
      })()
    : ''

  return (
    <div className="min-h-screen bg-bg-primary font-body">
      <SEO
        title="Feynman Leaderboard — EnglishOS"
        description="See the best Feynman Technique explanations from EnglishOS learners. The Feynman Leaderboard celebrates clarity, simplicity, and understanding."
        url="/leaderboard"
      />

      {/* Nav */}
      <header className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-sm border-b border-border-subtle flex items-center justify-between px-4 py-3.5">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-sm">Map</span>
        </button>
        <h1 className="font-display font-bold text-text-primary text-base leading-tight text-center">
          Feynman Leaderboard
        </h1>
        <div className="w-14" />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">

        {/* Week indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest">This Week</p>
            {weekLabel && <p className="text-sm font-body text-text-secondary mt-0.5">Week of {weekLabel}</p>}
          </div>
          <Badge variant="gold" size="sm">🏆 {entries.length} learner{entries.length !== 1 ? 's' : ''}</Badge>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-16 text-text-muted">
            <div className="w-8 h-8 rounded-full border-2 border-border-subtle border-t-brand-blue animate-spin" />
            <p className="text-xs font-mono">Loading leaderboard…</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center py-16 flex flex-col items-center gap-3"
          >
            <span className="text-5xl">🏆</span>
            <div>
              <p className="text-text-secondary font-body text-sm font-medium">No submissions this week yet.</p>
              <p className="text-text-muted font-mono text-xs mt-1.5">
                Be the first to share your explanation and claim the top spot!
              </p>
            </div>
          </motion.div>
        )}

        {/* Top 3 podium */}
        {!loading && top3.length > 0 && (
          <div className="flex gap-3">
            {top3.map((entry, i) => (
              <PodiumCard
                key={entry.id}
                entry={entry}
                config={RANK_CONFIG[i]}
                delay={i * 0.1}
                onUpvote={handleUpvote}
                upvoting={upvotingId === entry.id}
              />
            ))}
          </div>
        )}

        {/* Rest of list */}
        {!loading && rest.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border-subtle">
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider">All Entries</p>
            </div>
            <div className="divide-y divide-border-subtle">
              {rest.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38 + i * 0.05, duration: 0.28 }}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-bg-tertiary"
                >
                  <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-display font-bold bg-bg-tertiary text-text-muted">
                    {entry.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-body font-medium text-text-primary">{entry.name}</span>
                    <p className="text-xs text-text-muted truncate mt-0.5">Module {entry.module}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-display font-bold text-sm text-text-secondary">
                      {Math.round(entry.score)}%
                    </span>
                    <button
                      onClick={() => handleUpvote(entry.id)}
                      disabled={entry.hasUpvoted || upvotingId !== null}
                      className={[
                        'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono transition-all',
                        entry.hasUpvoted
                          ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30'
                          : 'bg-bg-tertiary text-text-muted border border-border-subtle hover:border-brand-blue/30 hover:text-brand-blue',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                      ].join(' ')}
                    >
                      👍 {entry.upvoteCount}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submit CTA */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 320, damping: 22 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setShowModal(true)}
            >
              Submit My Best Explanation This Week →
            </Button>
          </motion.div>
        )}

      </div>

      <AnimatePresence>
        {showModal && (
          <SubmitModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmitted={load}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
