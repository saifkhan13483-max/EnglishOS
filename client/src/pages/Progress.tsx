import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/Badge'
import BrainCompoundMeter from '@/components/gamification/BrainCompoundMeter'
import { useProgressStore } from '@/stores/progressStore'

const LEVELS = [
  {
    level: 1, name: 'Base Camp',   color: '#E94560', totalModules: 5, completedModules: 2,
    modules: [
      { name: 'Alphabets & Sounds', done: true  },
      { name: 'Core 100 Words',     done: true  },
      { name: 'Basic Sentences',    done: false },
      { name: 'Speaking Practice',  done: false },
      { name: 'Level 1 Gate',       done: false },
    ],
  },
  { level: 2, name: 'Village',    color: '#F5B014', totalModules: 5, completedModules: 0, modules: [] },
  { level: 3, name: 'Town',       color: '#4A9EFF', totalModules: 5, completedModules: 0, modules: [] },
  { level: 4, name: 'City',       color: '#2ECC71', totalModules: 6, completedModules: 0, modules: [] },
  { level: 5, name: 'Capital',    color: '#A855F7', totalModules: 6, completedModules: 0, modules: [] },
  { level: 6, name: 'World Stage',color: '#F97316', totalModules: 6, completedModules: 0, modules: [] },
]

// 30-day Feynman clarity score trend
const FEYNMAN_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 13}`,
  score: Math.min(100, Math.round(40 + i * 1.2 + Math.sin(i * 0.7) * 8 + (i > 20 ? i * 0.5 : 0))),
}))

const BADGES = [
  { id: 1,  icon: '🌅', name: 'First Mission',    date: 'Mar 24',  earned: true  },
  { id: 2,  icon: '🔥', name: '7-Day Streak',     date: 'Mar 31',  earned: true  },
  { id: 3,  icon: '📖', name: 'Word Wizard',      date: 'Apr 01',  earned: true  },
  { id: 4,  icon: '🧠', name: 'Feynman Initiate', date: 'Apr 02',  earned: true  },
  { id: 5,  icon: '⚡', name: 'Speed Run',        date: 'Apr 04',  earned: true  },
  { id: 6,  icon: '🏆', name: '30-Day Warrior',   date: null,      earned: false },
  { id: 7,  icon: '💬', name: 'Conversation King', date: null,     earned: false },
  { id: 8,  icon: '🎯', name: 'Level Gate Hero',  date: null,      earned: false },
  { id: 9,  icon: '🌍', name: 'World Stage',      date: null,      earned: false },
  { id: 10, icon: '🦅', name: 'Eagle Eye',        date: null,      earned: false },
  { id: 11, icon: '📚', name: 'Scholar',          date: null,      earned: false },
  { id: 12, icon: '🚀', name: 'Polymath',         date: null,      earned: false },
]

// ── Custom tooltip for recharts ───────────────────────────────────────────────
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

// ── Stat card ─────────────────────────────────────────────────────────────────
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Progress() {
  const navigate = useNavigate()
  const [expandedLevel, setExpandedLevel] = useState<number | null>(1)
  const { streak, totalXP, brainCompoundPct, learnerProfile } = useProgressStore()

  const daysActive = learnerProfile?.dayNumber ?? 0

  const STATS = [
    { icon: '📅', label: 'Days Active',    value: daysActive,                         suffix: ' days', color: '#4A9EFF' },
    { icon: '🔥', label: 'Current Streak', value: streak,                             suffix: 'd',     color: '#E94560' },
    { icon: '⭐', label: 'Total XP',       value: totalXP,                            suffix: ' XP',   color: '#F5B014' },
    { icon: '🧠', label: 'Brain Compound', value: Math.round(brainCompoundPct),       suffix: '%',     color: '#2ECC71' },
  ]

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
        <h1 className="font-display font-bold text-text-primary text-lg">Your Growth</h1>
        <div className="w-14" />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-7">

        {/* ── Stats row ── */}
        <section>
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Overview</p>
          <div className="flex gap-3">
            {STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.07} />
            ))}
          </div>
        </section>

        {/* ── Brain Compound Meter (full) ── */}
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
            <button
              onClick={() => navigate('/map')}
              className="text-xs text-brand-blue hover:underline font-body"
            >
              View Full Map →
            </button>
          </div>
          <div className="relative bg-bg-primary border border-border-subtle rounded-xl p-4 overflow-hidden">
            {/* Mini map grid */}
            <div className="grid grid-cols-3 gap-3">
              {LEVELS.map((lvl) => {
                const pct = lvl.totalModules > 0 ? Math.round((lvl.completedModules / lvl.totalModules) * 100) : 0
                const isActive = lvl.level === 1
                return (
                  <div
                    key={lvl.level}
                    className={[
                      'relative rounded-xl border p-3 flex flex-col gap-1.5 transition-colors',
                      isActive ? 'border-brand-red/50 bg-brand-red/5' : 'border-border-subtle bg-bg-tertiary',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: lvl.color }} />
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
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: lvl.color }}
                      />
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
            {LEVELS.map((lvl) => {
              const pct = lvl.totalModules > 0 ? Math.round((lvl.completedModules / lvl.totalModules) * 100) : 0
              const isExpanded = expandedLevel === lvl.level
              const isLocked = lvl.level > 1

              return (
                <div
                  key={lvl.level}
                  className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-bg-tertiary transition-colors text-left"
                    onClick={() => setExpandedLevel(isExpanded ? null : lvl.level)}
                  >
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: isLocked ? '#2A2A3E' : lvl.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-body font-medium text-text-primary">
                            Level {lvl.level} — {lvl.name}
                          </span>
                          {isLocked && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6A6A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs font-mono text-text-muted shrink-0">
                          {lvl.completedModules}/{lvl.totalModules}
                        </span>
                      </div>
                      <ProgressBar value={pct} color={isLocked ? '#2A2A3E' : lvl.color} animated={false} />
                    </div>
                    <svg
                      className={`shrink-0 transition-transform duration-200 text-text-muted ${isExpanded ? 'rotate-180' : ''}`}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isExpanded && lvl.modules.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border-subtle px-4 pb-3 pt-2 flex flex-col gap-1.5"
                    >
                      {lvl.modules.map((mod) => (
                        <div key={mod.name} className="flex items-center gap-2.5">
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

                  {isExpanded && isLocked && (
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
            <Badge variant="blue" size="sm">📈 +18 pts</Badge>
          </div>
          <div className="h-48 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={192}>
              <LineChart data={FEYNMAN_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#6A6A8A', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                  axisLine={false}
                  interval={4}
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
              {BADGES.filter(b => b.earned).length}/{BADGES.length} earned
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {BADGES.map((badge, i) => (
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
