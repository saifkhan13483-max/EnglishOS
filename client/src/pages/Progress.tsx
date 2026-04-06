import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '@/components/layout/SEO'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/Badge'
import { SkeletonStatRow } from '@/components/ui/Skeleton'
import BrainCompoundMeter from '@/components/gamification/BrainCompoundMeter'
import { useShallow } from 'zustand/react/shallow'
import { useProgressStore } from '@/stores/progressStore'

/* ─────────────────────────────────────────
   Static config
───────────────────────────────────────── */

const LEVEL_DISPLAY: Record<number, { name: string; color: string; totalModules: number }> = {
  1: { name: 'Base Camp',   color: '#E94560', totalModules: 4 },
  2: { name: 'Village',     color: '#F5B014', totalModules: 5 },
  3: { name: 'Town',        color: '#4A9EFF', totalModules: 5 },
  4: { name: 'City',        color: '#2ECC71', totalModules: 6 },
  5: { name: 'Capital',     color: '#A855F7', totalModules: 6 },
  6: { name: 'World Stage', color: '#F97316', totalModules: 6 },
}

const MODULE_NAMES: Record<number, Record<number, string>> = {
  1: { 1: 'Alphabets & Sounds', 2: 'Core 100 Words', 3: 'Basic Sentences', 4: 'Speaking Practice' },
  2: { 1: 'Present Tense', 2: 'Past Tense', 3: 'Future Tense', 4: 'Daily Conversations', 5: 'Level 2 Gate' },
  3: { 1: 'All 12 Tenses', 2: '500 Core Words', 3: 'Short Stories', 4: 'Listening Practice', 5: 'Level 3 Gate' },
  4: { 1: 'Reading Skills', 2: 'Writing Skills', 3: 'Complex Sentences', 4: 'Speaking Confidence', 5: 'Idioms & Phrases', 6: 'Level 4 Gate' },
  5: { 1: 'Advanced Grammar', 2: 'Phrasal Verbs', 3: 'Fluency Drills', 4: 'Job Interview Prep', 5: 'Business English', 6: 'Level 5 Gate' },
  6: { 1: 'Professional Writing', 2: 'Public Speaking', 3: 'Advanced Vocabulary', 4: 'IELTS/Exam Prep', 5: 'Accent & Delivery', 6: 'Final Gate' },
}

const BADGE_META: Record<string, { icon: string; name: string }> = {
  MODULE_COMPLETE_L1_M1: { icon: '🔤', name: 'Alphabet Master' },
  MODULE_COMPLETE_L1_M2: { icon: '📚', name: 'Word Collector' },
  MODULE_COMPLETE_L1_M3: { icon: '🔧', name: 'Sentence Builder' },
  MODULE_COMPLETE_L1_M4: { icon: '💬', name: 'Phrase Master' },
  LEVEL_COMPLETE_L1:     { icon: '🏔️', name: 'Base Camp Conquered' },
  STREAK_7:              { icon: '🔥', name: 'Week Warrior' },
  STREAK_30:             { icon: '⚡', name: 'Month Master' },
  BATMAN_MODE:           { icon: '🦇', name: 'Batman Mode' },
  FEYNMAN_FIRST:         { icon: '🧠', name: 'First Explainer' },
  FEYNMAN_SCORE_90:      { icon: '💡', name: 'Clarity Champion' },
  PERFECT_GATE:          { icon: '✨', name: 'First Try' },
  LEADERBOARD_TOP3:      { icon: '🎤', name: 'Community Voice' },
}

const ALL_BADGE_TYPES = Object.keys(BADGE_META)

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */

function formatChartDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function FeynmanTooltip({ active, payload, label }: {
  active?: boolean; payload?: { value: number }[]; label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-bg-secondary border border-border-subtle rounded-xl px-3 py-2 shadow-lg">
      <p className="text-xs font-mono text-text-muted mb-0.5">{label}</p>
      <p className="text-sm font-display font-bold text-brand-blue">{payload[0].value}%</p>
    </div>
  )
}

function StatCard({ icon, label, value, suffix, color, delay }: {
  icon: string; label: string; value: number; suffix: string; color: string; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 bg-bg-secondary border border-border-subtle rounded-2xl p-4 flex flex-col items-center gap-1 text-center min-w-[70px]"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-display text-xl font-bold" style={{ color }}>
        {value.toLocaleString()}{suffix}
      </span>
      <span className="text-xs font-mono text-text-muted uppercase tracking-wide leading-tight">{label}</span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function Progress() {
  const navigate = useNavigate()
  const [expandedLevel, setExpandedLevel] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState(true)

  const {
    streak, totalXP, brainCompoundPct, totalDaysActive,
    feynmanScoreTrend, serverBadges, levelProgressList,
    loadStats, mapLevels, loadMasteryMap,
  } = useProgressStore(
    useShallow((s) => ({
      streak: s.streak,
      totalXP: s.totalXP,
      brainCompoundPct: s.brainCompoundPct,
      totalDaysActive: s.totalDaysActive,
      feynmanScoreTrend: s.feynmanScoreTrend,
      serverBadges: s.serverBadges,
      levelProgressList: s.levelProgressList,
      loadStats: s.loadStats,
      mapLevels: s.mapLevels,
      loadMasteryMap: s.loadMasteryMap,
    }))
  )

  useEffect(() => {
    setIsLoading(true)
    const tasks: Promise<void>[] = [loadStats()]
    if (mapLevels.length === 0) tasks.push(loadMasteryMap())
    Promise.all(tasks).finally(() => setIsLoading(false))
  }, [loadStats, loadMasteryMap, mapLevels.length])

  const STATS = [
    { icon: '📅', label: 'Days Active',    value: totalDaysActive,              suffix: 'd',   color: '#4A9EFF' },
    { icon: '🔥', label: 'Current Streak', value: streak,                       suffix: 'd',   color: '#E94560' },
    { icon: '⭐', label: 'Total XP',       value: totalXP,                      suffix: ' XP', color: '#F5B014' },
    { icon: '🧠', label: 'Brain Compound', value: Math.round(brainCompoundPct), suffix: '%',   color: '#2ECC71' },
  ]

  // Build chart data
  const chartData = feynmanScoreTrend.map((p) => ({
    day: formatChartDate(p.date),
    score: Math.round(p.score),
  }))

  // Feynman trend badge label
  const feynmanTrendLabel = (() => {
    if (chartData.length < 2) return null
    const diff = chartData[chartData.length - 1].score - chartData[0].score
    return diff >= 0 ? `📈 +${diff} pts` : `📉 ${diff} pts`
  })()

  // Build level progress from levelProgressList
  const levelRows = Object.entries(LEVEL_DISPLAY).map(([k, cfg]) => {
    const lvl = parseInt(k)
    const records = levelProgressList.filter((r) => r.level === lvl && r.module > 0)
    const completedModules = records.filter((r) => r.status === 'COMPLETE').length
    const hasActive = records.some((r) => r.status === 'ACTIVE')

    // Determine level status from mapLevels if available, else derive
    const mapEntry = mapLevels.find((ml) => ml.level === lvl)
    const levelStatus = mapEntry?.status
      ?? (completedModules >= cfg.totalModules ? 'complete'
        : hasActive || records.length > 0 ? 'active'
        : 'locked')

    const isLocked = levelStatus === 'locked'

    const moduleItems = Array.from({ length: cfg.totalModules }, (_, i) => {
      const modNum = i + 1
      const rec = records.find((r) => r.module === modNum)
      return {
        num: modNum,
        name: MODULE_NAMES[lvl]?.[modNum] ?? `Module ${modNum}`,
        done: rec?.status === 'COMPLETE',
      }
    })

    const pct = cfg.totalModules > 0 ? Math.round((completedModules / cfg.totalModules) * 100) : 0

    return { level: lvl, name: cfg.name, color: cfg.color, totalModules: cfg.totalModules, completedModules, isLocked, pct, moduleItems }
  })

  // Badge wall — merge earned badges with all possible badge types
  const earnedSet = new Map(serverBadges.map((b) => [b.badgeType, b]))
  const badgeWall = ALL_BADGE_TYPES.map((type) => {
    const meta = BADGE_META[type]
    const earned = earnedSet.get(type)
    return {
      id: type,
      icon: meta.icon,
      name: meta.name,
      date: earned ? new Date(earned.earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null,
      earned: !!earned,
    }
  })

  return (
    <div className="min-h-screen bg-bg-primary font-body">
      <SEO
        title="Your Progress — EnglishOS"
        description="Track your English learning progress, XP, streaks, Brain Compound score, and Feynman improvement over time."
        url="/progress"
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
        <h1 className="font-display font-bold text-text-primary text-lg">Your Growth</h1>
        <div className="w-14" />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-7">

        {/* ── Stats row ── */}
        <section>
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Overview</p>
          {isLoading ? (
            <SkeletonStatRow />
          ) : (
            <div className="flex gap-3">
              {STATS.map((s, i) => (
                <StatCard key={s.label} {...s} delay={i * 0.07} />
              ))}
            </div>
          )}
        </section>

        {/* ── Brain Compound Meter ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="bg-bg-secondary border border-border-subtle rounded-2xl p-5"
        >
          <BrainCompoundMeter size="full" value={brainCompoundPct} />
        </motion.section>

        {/* ── Mastery Map thumbnail ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="bg-bg-secondary border border-border-subtle rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Mastery Map</p>
            <button onClick={() => navigate('/map')} className="text-xs text-brand-blue hover:underline font-body">
              View Full Map →
            </button>
          </div>
          <div className="relative bg-bg-primary border border-border-subtle rounded-xl p-4 overflow-hidden">
            <div className="grid grid-cols-3 gap-3">
              {levelRows.map((lvl) => {
                const isActive = !lvl.isLocked && lvl.completedModules < lvl.totalModules
                return (
                  <div
                    key={lvl.level}
                    className={[
                      'relative rounded-xl border p-3 flex flex-col gap-1.5 transition-colors',
                      isActive ? 'border-brand-red/50 bg-brand-red/5' : 'border-border-subtle bg-bg-tertiary',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: lvl.isLocked ? '#2A2A3E' : lvl.color }} />
                      <span className="text-xs font-mono text-text-muted">L{lvl.level}</span>
                      {isActive && (
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-brand-red ml-auto"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <p className="text-xs font-body font-medium text-text-secondary leading-tight">{lvl.name}</p>
                    <div className="h-1 bg-bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${lvl.pct}%`, backgroundColor: lvl.isLocked ? '#2A2A3E' : lvl.color }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* ── Level progress ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
        >
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Level Progress</p>
          <div className="flex flex-col gap-3">
            {levelRows.map((lvl) => {
              const isExpanded = expandedLevel === lvl.level
              return (
                <div key={lvl.level} className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-bg-tertiary transition-colors text-left"
                    onClick={() => setExpandedLevel(isExpanded ? null : lvl.level)}
                  >
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: lvl.isLocked ? '#2A2A3E' : lvl.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-body font-medium text-text-primary">
                            Level {lvl.level} — {lvl.name}
                          </span>
                          {lvl.isLocked && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6A6A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs font-mono text-text-muted shrink-0">
                          {lvl.completedModules}/{lvl.totalModules}
                        </span>
                      </div>
                      <ProgressBar value={lvl.pct} color={lvl.isLocked ? '#2A2A3E' : lvl.color} animated={false} />
                    </div>
                    <svg
                      className={`shrink-0 transition-transform duration-200 text-text-muted ${isExpanded ? 'rotate-180' : ''}`}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isExpanded && !lvl.isLocked && lvl.moduleItems.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border-subtle px-4 pb-3 pt-2 flex flex-col gap-1.5"
                    >
                      {lvl.moduleItems.map((mod) => (
                        <div key={mod.num} className="flex items-center gap-2.5">
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${mod.done ? 'bg-brand-green border-brand-green' : 'border-border-strong'}`}>
                            {mod.done && (
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </span>
                          <span className={`text-xs font-body ${mod.done ? 'text-brand-green line-through' : 'text-text-secondary'}`}>
                            {mod.name}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {isExpanded && lvl.isLocked && (
                    <div className="border-t border-border-subtle px-4 py-3 text-center">
                      <p className="text-xs text-text-muted font-body">Complete Level {lvl.level - 1} to unlock</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* ── Feynman Score chart ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          className="bg-bg-secondary border border-border-subtle rounded-2xl p-5"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Feynman Score</p>
              <p className="text-sm text-text-secondary font-body">Clarity score over last 30 days</p>
            </div>
            {feynmanTrendLabel && <Badge variant="blue" size="sm">{feynmanTrendLabel}</Badge>}
          </div>
          {chartData.length === 0 ? (
            <div className="h-48 flex items-center justify-center">
              <p className="text-sm text-text-muted font-body">Complete your first Feynman Moment to see your score trend.</p>
            </div>
          ) : (
            <div className="h-48 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minHeight={192}>
                <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#6A6A8A', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                    interval={Math.max(0, Math.floor(chartData.length / 6) - 1)}
                  />
                  <YAxis
                    domain={[30, 100]}
                    tick={{ fill: '#6A6A8A', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<FeynmanTooltip />} cursor={{ stroke: '#2A2A3E' }} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4A9EFF"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#4A9EFF', stroke: '#0A0A0F', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.section>

        {/* ── Badge wall ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.35 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Badge Wall</p>
            <span className="text-xs font-mono text-brand-gold">
              {badgeWall.filter(b => b.earned).length}/{badgeWall.length} earned
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {badgeWall.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.62 + i * 0.04, type: 'spring', stiffness: 360, damping: 20 }}
                title={badge.earned ? `${badge.name} — Earned ${badge.date}` : `${badge.name} — Locked`}
                className={[
                  'flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-colors cursor-default',
                  badge.earned
                    ? 'bg-bg-secondary border-border-subtle hover:border-brand-gold/40'
                    : 'bg-bg-tertiary border-border-subtle opacity-40',
                ].join(' ')}
              >
                <span className={`text-2xl ${!badge.earned ? 'grayscale' : ''}`}>
                  {badge.earned ? badge.icon : '🔒'}
                </span>
                <span className="text-[10px] font-mono text-text-muted text-center leading-tight">
                  {badge.name}
                </span>
                {badge.earned && badge.date && (
                  <span className="text-[9px] font-mono text-brand-gold">{badge.date}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  )
}
