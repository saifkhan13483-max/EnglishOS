import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { api } from '@/services/api'

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */

interface FeynmanEntry {
  id: string
  date: string
  module: number
  prompt: string
  response: string
  score: number
  prevScore: number | null
  gaps: string[]
}

interface ApiFeynmanResponse {
  id: string
  module: number
  prompt: string
  responseText: string | null
  overallScore: number | null
  clarityScore: number | null
  knowledgeGapItems: string[]
  createdAt: string
  mission: {
    sessionDate: string
    type: string
    status: string
  }
}

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */

function formatDate(isoStr: string): string {
  return new Date(isoStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function mapApiToEntry(raw: ApiFeynmanResponse, prevScore: number | null): FeynmanEntry {
  const score = raw.overallScore ?? raw.clarityScore ?? 0
  return {
    id: raw.id,
    date: formatDate(raw.createdAt),
    module: raw.module,
    prompt: raw.prompt,
    response: raw.responseText ?? '',
    score: Math.round(score),
    prevScore,
    gaps: raw.knowledgeGapItems ?? [],
  }
}

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

function scoreBadge(score: number) {
  if (score >= 80) return { variant: 'green' as const, label: `${score}%` }
  if (score >= 65) return { variant: 'blue'  as const, label: `${score}%` }
  return               { variant: 'red'   as const, label: `${score}%` }
}

function Trend({ score, prev }: { score: number; prev: number | null }) {
  if (prev === null) return <span className="text-xs font-mono text-text-muted">—</span>
  const diff = score - prev
  const up = diff >= 0
  return (
    <span className={`flex items-center gap-0.5 text-xs font-mono font-bold ${up ? 'text-brand-green' : 'text-brand-red'}`}>
      {up ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
      {up ? '+' : ''}{diff}
    </span>
  )
}

function EntryCard({ entry, index }: { entry: FeynmanEntry; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const TRUNCATE = 160
  const isLong = entry.response.length > TRUNCATE
  const display = expanded || !isLong ? entry.response : entry.response.slice(0, TRUNCATE) + '…'
  const sb = scoreBadge(entry.score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden"
    >
      <div className="flex items-start justify-between px-4 pt-4 pb-3 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono text-text-muted">{entry.date}</span>
            <Trend score={entry.score} prev={entry.prevScore} />
          </div>
          <p className="text-xs font-mono text-brand-blue truncate">Module {entry.module}</p>
        </div>
        <Badge variant={sb.variant} size="sm">{sb.label}</Badge>
      </div>

      <div className="mx-4 mb-3 bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5">
        <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Prompt</p>
        <p className="text-sm font-body text-text-secondary leading-relaxed">{entry.prompt}</p>
      </div>

      <div className="px-4 pb-3">
        <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1.5">Your Response</p>
        <p className="text-sm font-body text-text-primary leading-relaxed">{display}</p>
        {isLong && (
          <button
            className="mt-1.5 text-xs text-brand-blue hover:underline font-body"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less ↑' : 'Read more ↓'}
          </button>
        )}
      </div>

      {entry.gaps.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Knowledge Gaps</p>
          <div className="flex flex-wrap gap-2">
            {entry.gaps.map((gap) => (
              <span
                key={gap}
                className="px-2.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 text-xs font-mono text-brand-red"
              >
                {gap}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function FeynmanArchive() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState<FeynmanEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await api.get<{ success: boolean; data: ApiFeynmanResponse[] }>(
          '/api/v1/feynman/archive'
        )
        const raw = res.data ?? []
        // API returns newest first (orderBy createdAt desc)
        // prevScore = score of the next item in the array (i.e., the previous submission)
        const mapped: FeynmanEntry[] = raw.map((item, i) => {
          const nextItem = raw[i + 1]
          const prevScore = nextItem
            ? Math.round(nextItem.overallScore ?? nextItem.clarityScore ?? 0)
            : null
          return mapApiToEntry(item, prevScore)
        })
        setEntries(mapped)
      } catch {
        setEntries([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const avgScore = entries.length > 0
    ? Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length)
    : 0

  const latestScore = entries[0]?.score ?? 0
  const firstScore = entries[entries.length - 1]?.score ?? 0

  return (
    <div className="min-h-screen bg-bg-primary font-body">
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
        <h1 className="font-display font-bold text-text-primary text-lg">Feynman Journey</h1>
        {entries.length > 0
          ? <Badge variant="blue" size="sm">Avg {avgScore}%</Badge>
          : <div className="w-14" />
        }
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center py-2"
        >
          <p className="text-sm text-text-secondary font-body leading-relaxed">
            Watch your own understanding grow over time.
          </p>
          {!loading && (
            <p className="text-xs text-text-muted font-mono mt-1">
              {entries.length} explanation{entries.length !== 1 ? 's' : ''} submitted
              {entries.length >= 2 && latestScore > firstScore ? ' · score improving 📈' : ''}
            </p>
          )}
        </motion.div>

        {/* Score trend overview */}
        {entries.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="bg-bg-secondary border border-border-subtle rounded-2xl px-4 py-3 flex items-center gap-6"
          >
            <div className="text-center flex-1">
              <p className="font-display text-2xl font-bold text-brand-green">{latestScore}%</p>
              <p className="text-xs font-mono text-text-muted mt-0.5">Latest</p>
            </div>
            <div className="w-px h-10 bg-border-subtle" />
            <div className="text-center flex-1">
              <p className="font-display text-2xl font-bold text-brand-blue">{avgScore}%</p>
              <p className="text-xs font-mono text-text-muted mt-0.5">Average</p>
            </div>
            <div className="w-px h-10 bg-border-subtle" />
            <div className="text-center flex-1">
              <p className="font-display text-2xl font-bold text-text-primary">{firstScore}%</p>
              <p className="text-xs font-mono text-text-muted mt-0.5">First</p>
            </div>
          </motion.div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5 flex flex-col gap-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
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
            <span className="text-5xl">🧠</span>
            <div>
              <p className="text-text-secondary font-body text-sm font-medium">Your Feynman journey starts here.</p>
              <p className="text-text-muted font-mono text-xs mt-1.5 leading-relaxed">
                Complete your first morning mission to capture<br />your very first explanation.
              </p>
            </div>
          </motion.div>
        )}

        {/* Entries */}
        {!loading && entries.length > 0 && (
          <div className="flex flex-col gap-4">
            {entries.map((entry, i) => (
              <EntryCard key={entry.id} entry={entry} index={i + 0.2} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
