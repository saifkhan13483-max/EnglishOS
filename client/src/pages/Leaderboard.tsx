import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

// ── Static mock data ──────────────────────────────────────────────────────────

interface LeaderEntry {
  rank: number
  name: string
  module: string
  score: number
  isMe?: boolean
}

const WEEK_OF = 'April 05, 2026'

const ENTRIES: LeaderEntry[] = [
  { rank: 1, name: 'Fatima K.',   module: 'Basic Sentences — SVO Formula',    score: 97 },
  { rank: 2, name: 'Ahmed R.',    module: 'Core 100 Words — Action Verbs',    score: 93 },
  { rank: 3, name: 'Sara M.',     module: 'Alphabets & Sounds — Vowels',      score: 91 },
  { rank: 4, name: 'Bilal A.',    module: 'Core 100 Words — Group D Nouns',   score: 84, isMe: true },
  { rank: 5, name: 'Hassan T.',   module: 'Basic Sentences — Negatives',      score: 80 },
  { rank: 6, name: 'Zara N.',     module: 'Core 100 Words — Be Verbs',        score: 76 },
  { rank: 7, name: 'Omar F.',     module: 'Core 100 Words — Connectors',      score: 74 },
  { rank: 8, name: 'Mehwish S.',  module: 'Alphabets & Sounds — Consonants',  score: 70 },
  { rank: 9, name: 'Imran B.',    module: 'Basic Sentences — Questions',      score: 68 },
  { rank: 10, name: 'Hina Q.',    module: 'Core 100 Words — Group C Verbs',   score: 65 },
]

const TOP3 = ENTRIES.slice(0, 3)
const REST  = ENTRIES.slice(3)

const RANK_CONFIG = [
  { emoji: '🥇', label: '1st', color: '#F5B014', bg: 'bg-brand-gold/10', border: 'border-brand-gold/40' },
  { emoji: '🥈', label: '2nd', color: '#C8C8E0', bg: 'bg-bg-tertiary',   border: 'border-border-subtle'  },
  { emoji: '🥉', label: '3rd', color: '#F97316', bg: 'bg-orange-500/10', border: 'border-orange-500/30'  },
]

// ── Podium card ───────────────────────────────────────────────────────────────
function PodiumCard({ entry, config, delay }: {
  entry: LeaderEntry
  config: typeof RANK_CONFIG[number]
  delay: number
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
      <span className="text-[11px] font-body text-text-muted leading-tight">{entry.module}</span>
      <span className="font-display font-bold text-xl mt-1" style={{ color: config.color }}>
        {entry.score}%
      </span>
    </motion.div>
  )
}

// ── Submission modal ──────────────────────────────────────────────────────────
function SubmitModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [text, setText] = useState('')
  const [module, setModule] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || !module.trim()) return
    setSubmitted(true)
    setTimeout(() => { onClose(); setSubmitted(false); setText(''); setModule('') }, 2000)
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
          <div className="flex gap-3">
            <Button variant="secondary" size="md" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="md" className="flex-1" onClick={handleSubmit as () => void}>
              Submit →
            </Button>
          </div>
        )
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
            Module Explained
          </label>
          <input
            value={module}
            onChange={e => setModule(e.target.value)}
            placeholder="e.g. Core 100 Words — Action Verbs"
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Leaderboard() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-bg-primary font-body">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-sm border-b border-border-subtle flex items-center justify-between px-4 py-3.5">
        <button
          onClick={() => navigate('/dashboard')}
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
            <p className="text-sm font-body text-text-secondary mt-0.5">Week of {WEEK_OF}</p>
          </div>
          <Badge variant="gold" size="sm">🏆 {ENTRIES.length} learners</Badge>
        </motion.div>

        {/* Top 3 podium */}
        <div className="flex gap-3">
          {TOP3.map((entry, i) => (
            <PodiumCard key={entry.rank} entry={entry} config={RANK_CONFIG[i]} delay={i * 0.1} />
          ))}
        </div>

        {/* Rest of list */}
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
            {REST.map((entry, i) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38 + i * 0.05, duration: 0.28 }}
                className={[
                  'flex items-center gap-3 px-4 py-3 transition-colors',
                  entry.isMe ? 'bg-brand-blue/5' : 'hover:bg-bg-tertiary',
                ].join(' ')}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-display font-bold ${entry.isMe ? 'bg-brand-blue/20 text-brand-blue' : 'bg-bg-tertiary text-text-muted'}`}>
                  {entry.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-body font-medium ${entry.isMe ? 'text-brand-blue' : 'text-text-primary'}`}>
                      {entry.name}
                    </span>
                    {entry.isMe && <Badge variant="blue" size="sm">You</Badge>}
                  </div>
                  <p className="text-xs text-text-muted truncate mt-0.5">{entry.module}</p>
                </div>
                <span className={`font-display font-bold text-sm shrink-0 ${entry.isMe ? 'text-brand-blue' : 'text-text-secondary'}`}>
                  {entry.score}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Submit CTA */}
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

      </div>

      <SubmitModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
