import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LevelNode, { type NodeStatus } from '@/components/map/LevelNode'
import PathLine,  { type PathStatus }  from '@/components/map/PathLine'
import Button from '@/components/ui/Button'
import Badge  from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { useProgressStore } from '@/stores/progressStore'
import { api } from '@/services/api'

/* ─────────────────────────────────────────
   Static placeholder data
───────────────────────────────────────── */
interface Module {
  name: string
  status: 'complete' | 'active' | 'locked'
  days: string
  description: string
}

interface Level {
  level: number
  name: string
  totalDays: number
  status: NodeStatus
  currentDay: number
  color: string
  modules: Module[]
}

const LEVELS: Level[] = [
  {
    level: 1, name: 'Base Camp', totalDays: 30, status: 'active', currentDay: 7, color: '#E94560',
    modules: [
      { name: 'Alphabets & Sounds',  status: 'complete', days: 'Days 1–5',   description: '26 letters, vowels first, pronunciation guide with Roman Urdu' },
      { name: 'Core 100 Words',      status: 'active',   days: 'Days 6–12',  description: 'The 100 words powering 50% of all everyday conversations' },
      { name: 'Basic Sentences',     status: 'locked',   days: 'Days 13–20', description: 'SVO formula — one formula, every sentence in English' },
      { name: 'Speaking Practice',   status: 'locked',   days: 'Days 21–28', description: 'Daily speaking drills and pronunciation with Feynman Check' },
      { name: 'Level 1 Gate',        status: 'locked',   days: 'Days 29–30', description: 'Pass the gate test to unlock Level 2 — Village' },
    ],
  },
  { level: 2, name: 'Village',     totalDays: 45, status: 'locked', currentDay: 0, color: '#F5B014', modules: [] },
  { level: 3, name: 'Town',        totalDays: 45, status: 'locked', currentDay: 0, color: '#4A9EFF', modules: [] },
  { level: 4, name: 'City',        totalDays: 60, status: 'locked', currentDay: 0, color: '#2ECC71', modules: [] },
  { level: 5, name: 'Capital',     totalDays: 60, status: 'locked', currentDay: 0, color: '#A855F7', modules: [] },
  { level: 6, name: 'World Stage', totalDays: 60, status: 'locked', currentDay: 0, color: '#F97316', modules: [] },
]

// Path between each pair of sequential levels
type PathDef = { from: number; to: number; status: PathStatus }
const PATHS: PathDef[] = [
  { from: 1, to: 2, status: 'upcoming' },
  { from: 2, to: 3, status: 'locked' },
  { from: 3, to: 4, status: 'locked' },
  { from: 4, to: 5, status: 'locked' },
  { from: 5, to: 6, status: 'locked' },
]

// Desktop Z-pattern: node centers as percentage coords (SVG viewBox 0 0 100 100)
const DESKTOP_POS: Record<number, { x: number; y: number }> = {
  1: { x: 22, y: 18 },
  2: { x: 78, y: 18 },
  3: { x: 22, y: 50 },
  4: { x: 78, y: 50 },
  5: { x: 22, y: 82 },
  6: { x: 78, y: 82 },
}

const DASHBOARD = {
  streak: 7,
  brainCompound: 42,
  morningDone: false,
  eveningDone: false,
  why: 'Job Interview 💼',
  dayNumber: 7,
}

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function MasteryMap() {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bg-primary overflow-hidden font-body">

      {/* ── Map canvas ── */}
      <div className="flex-1 relative overflow-hidden">
        <MapBackground />

        {/* Top nav strip */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 bg-bg-primary/60 backdrop-blur-sm border-b border-border-subtle">
          <span className="font-display font-bold text-lg text-text-primary">
            English<span className="text-brand-red">OS</span>
          </span>
          <div className="flex items-center gap-3">
            <Badge variant="red" size="sm">🔥 {DASHBOARD.streak}-day streak</Badge>
            <Badge variant="muted" size="sm">Day {DASHBOARD.dayNumber}</Badge>
          </div>
        </div>

        {/* Desktop Z-pattern map — hidden on mobile */}
        <div className="hidden md:block absolute inset-0 pt-16 pb-4">
          <DesktopMap levels={LEVELS} paths={PATHS} onSelect={setSelectedLevel} />
        </div>

        {/* Mobile vertical map */}
        <div className="md:hidden absolute inset-0 pt-16 pb-[200px] overflow-y-auto">
          <MobileMap levels={LEVELS} onSelect={setSelectedLevel} />
        </div>
      </div>

      {/* ── Dashboard sidebar (desktop right / mobile bottom) ── */}
      <div className="
        md:w-72 md:border-l md:border-border-subtle md:overflow-y-auto md:shrink-0
        md:static md:h-full
        fixed bottom-0 left-0 right-0 md:relative
        z-30
      ">
        <DashboardPanel onStartMission={() => navigate('/mission')} />
      </div>

      {/* ── Level Detail Drawer ── */}
      <AnimatePresence>
        {selectedLevel && (
          <LevelDrawer
            level={selectedLevel}
            onClose={() => setSelectedLevel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────
   Map background — CSS gradients + shapes
───────────────────────────────────────── */
function MapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Deep background */}
      <div className="absolute inset-0 bg-bg-primary" />

      {/* Subtle radial glow in center */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-10 rounded-full"
        style={{ background: 'radial-gradient(ellipse, #4A9EFF 0%, transparent 65%)', filter: 'blur(80px)' }}
      />

      {/* Grid lines — simulated map grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C8C8E0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Decorative geometric shapes */}
      <div className="absolute top-[8%] left-[10%] w-48 h-32 rounded-2xl border border-border-subtle/30 opacity-20 rotate-12" />
      <div className="absolute top-[40%] right-[8%] w-32 h-20 rounded-xl border border-border-subtle/20 opacity-15 -rotate-6" />
      <div className="absolute bottom-[15%] left-[20%] w-24 h-24 rounded-full border border-border-subtle/20 opacity-20" />
      <div className="absolute top-[65%] right-[20%] w-40 h-16 rounded-xl border border-border-subtle/15 opacity-15 rotate-3" />
    </div>
  )
}

/* ─────────────────────────────────────────
   Desktop Z-pattern map
───────────────────────────────────────── */
function DesktopMap({ levels, paths, onSelect }: {
  levels: Level[]
  paths: PathDef[]
  onSelect: (l: Level) => void
}) {
  return (
    <div className="relative w-full h-full max-w-2xl mx-auto px-8">
      {/* SVG path overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {paths.map((p) => {
          const from = DESKTOP_POS[p.from]
          const to   = DESKTOP_POS[p.to]
          return (
            <PathLine
              key={`${p.from}-${p.to}`}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              status={p.status}
            />
          )
        })}
      </svg>

      {/* Nodes */}
      {levels.map((lvl) => {
        const pos = DESKTOP_POS[lvl.level]
        return (
          <motion.div
            key={lvl.level}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: lvl.level * 0.08, type: 'spring', stiffness: 360, damping: 22 }}
          >
            <LevelNode
              level={lvl.level}
              name={lvl.name}
              totalDays={lvl.totalDays}
              currentDay={lvl.currentDay}
              status={lvl.status}
              color={lvl.color}
              onClick={() => (lvl.status !== 'locked') && onSelect(lvl)}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────
   Mobile vertical map
───────────────────────────────────────── */
function MobileMap({ levels, onSelect }: { levels: Level[]; onSelect: (l: Level) => void }) {
  return (
    <div className="flex flex-col items-center gap-0 px-6 py-6">
      {levels.map((lvl, i) => (
        <div key={lvl.level} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <LevelNode
              level={lvl.level}
              name={lvl.name}
              totalDays={lvl.totalDays}
              currentDay={lvl.currentDay}
              status={lvl.status}
              color={lvl.color}
              onClick={() => (lvl.status !== 'locked') && onSelect(lvl)}
            />
          </motion.div>

          {/* Vertical connector */}
          {i < levels.length - 1 && (
            <div className="w-0.5 h-10 my-1">
              <motion.div
                className="w-full h-full rounded-full"
                animate={{ backgroundColor: lvl.status === 'complete' ? '#2ECC71' : '#2A2A3E' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   Dashboard Panel
───────────────────────────────────────── */
function DashboardPanel({ onStartMission }: { onStartMission: () => void }) {
  const { streak, brainCompound, morningDone, eveningDone, why } = DASHBOARD
  const { batmanModeActive, batmanSkipUsedThisWeek, setBatmanState } = useProgressStore()
  const [skipLoading, setSkipLoading] = useState(false)
  const [skipError, setSkipError] = useState<string | null>(null)

  async function handleBatmanSkip() {
    setSkipLoading(true)
    setSkipError(null)
    try {
      await api.post('/api/v1/learner/batman-skip')
      setBatmanState({ batmanModeActive: true, batmanSkipUsedThisWeek: true })
    } catch (err: unknown) {
      setSkipError(err instanceof Error ? err.message : 'Could not use skip')
    } finally {
      setSkipLoading(false)
    }
  }

  return (
    <div className="
      bg-bg-secondary border-t border-border-subtle
      md:border-t-0 md:border-l-0 md:h-full
      p-4 flex flex-col gap-4
    ">
      {/* Desktop header */}
      <div className="hidden md:block pt-2">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Today's Panel</p>
      </div>

      {/* Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-display font-bold text-text-primary text-lg">{streak} days</p>
            <p className="text-xs text-text-muted font-mono">streak</p>
          </div>
        </div>
        <Badge variant="red" size="sm">Active</Badge>
      </div>

      {/* Batman Mode badge + skip controls */}
      {batmanModeActive && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          {/* Badge */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border"
            style={{
              background: 'rgba(168,85,247,0.08)',
              borderColor: 'rgba(168,85,247,0.35)',
            }}
          >
            <motion.span
              className="text-base shrink-0"
              animate={{ filter: ['drop-shadow(0 0 0px #A855F7)', 'drop-shadow(0 0 8px #A855F7)', 'drop-shadow(0 0 0px #A855F7)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🦇
            </motion.span>
            {/* Shield icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ color: '#A855F7' }}>
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="currentColor" opacity="0.7" />
            </svg>
            <span className="text-xs font-mono font-semibold" style={{ color: '#A855F7' }}>
              Batman Mode Active
            </span>
          </div>

          {/* Skip day control */}
          {batmanSkipUsedThisWeek ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-subtle bg-bg-tertiary">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-text-muted">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="currentColor" />
              </svg>
              <span className="text-xs font-body text-text-muted">Skip Used This Week</span>
            </div>
          ) : (
            <button
              onClick={handleBatmanSkip}
              disabled={skipLoading}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border text-xs font-body font-medium transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-50"
              style={{
                background: 'rgba(168,85,247,0.12)',
                borderColor: 'rgba(168,85,247,0.4)',
                color: '#A855F7',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="currentColor" />
              </svg>
              {skipLoading ? 'Using...' : 'Use Your Skip Day'}
            </button>
          )}
          {skipError && (
            <p className="text-xs text-brand-red font-mono">{skipError}</p>
          )}
        </motion.div>
      )}

      {/* Brain Compound Meter */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-sm">🧠</span>
          <p className="text-xs font-body font-medium text-text-secondary">Brain Compound Meter</p>
        </div>
        <ProgressBar value={brainCompound} color="#4A9EFF" />
        <p className="text-xs text-text-muted font-mono mt-1">{brainCompound}% knowledge compounded</p>
      </div>

      {/* Today's missions */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Today's Missions</p>
        <MissionRow label="Morning Mission" done={morningDone} time="20 min" />
        <MissionRow label="Evening Mission" done={eveningDone} time="40 min" />
      </div>

      {/* My Why */}
      <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5">
        <p className="text-xs font-mono text-text-muted mb-0.5">Your Why</p>
        <p className="text-sm font-body text-text-secondary">{why}</p>
      </div>

      {/* CTA */}
      <Button variant="primary" size="md" className="w-full" onClick={onStartMission}>
        Continue Mission →
      </Button>
    </div>
  )
}

function MissionRow({ label, done, time }: { label: string; done: boolean; time: string }) {
  return (
    <div className={[
      'flex items-center justify-between px-3 py-2 rounded-xl border transition-colors',
      done ? 'border-brand-green/30 bg-brand-green/5' : 'border-border-subtle bg-bg-tertiary',
    ].join(' ')}>
      <div className="flex items-center gap-2">
        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${done ? 'bg-brand-green border-brand-green' : 'border-border-strong'}`}>
          {done && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
        <span className={`text-xs font-body ${done ? 'text-brand-green line-through' : 'text-text-secondary'}`}>
          {label}
        </span>
      </div>
      <span className="text-xs font-mono text-text-muted">{time}</span>
    </div>
  )
}

/* ─────────────────────────────────────────
   Level Detail Drawer
───────────────────────────────────────── */
function LevelDrawer({ level, onClose }: { level: Level; onClose: () => void }) {
  const isActive = level.status === 'active'
  const isComplete = level.status === 'complete'

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <motion.div
        key="drawer-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-bg-secondary border-l border-border-subtle flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border-subtle shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: level.color }}
              />
              <span className="text-xs font-mono text-text-muted">Level {level.level}</span>
            </div>
            <h2 className="font-display text-xl font-bold text-text-primary">{level.name}</h2>
            <p className="text-xs text-text-muted mt-0.5">{level.totalDays} total days</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors p-2 rounded-xl hover:bg-bg-tertiary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Progress (active level) */}
        {isActive && (
          <div className="px-5 py-4 border-b border-border-subtle shrink-0">
            <ProgressBar
              value={Math.round((level.currentDay / level.totalDays) * 100)}
              color={level.color}
              label={`Day ${level.currentDay} of ${level.totalDays}`}
            />
          </div>
        )}

        {/* Modules list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Modules</p>

          {level.modules.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-4xl mb-3 block">🔒</span>
              <p className="text-sm text-text-muted">Complete Level {level.level - 1} to reveal modules</p>
            </div>
          ) : (
            level.modules.map((mod, i) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className={[
                  'flex items-start gap-3 p-3 rounded-xl border transition-colors',
                  mod.status === 'complete' ? 'border-brand-green/30 bg-brand-green/5' :
                  mod.status === 'active'   ? 'border-brand-red/30 bg-brand-red/5' :
                  'border-border-subtle bg-bg-tertiary',
                ].join(' ')}
              >
                <div className={[
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
                  mod.status === 'complete' ? 'bg-brand-green border-brand-green' :
                  mod.status === 'active'   ? 'border-brand-red' :
                  'border-border-strong',
                ].join(' ')}>
                  {mod.status === 'complete' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {mod.status === 'active' && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-brand-red"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                  {mod.status === 'locked' && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6A6A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-body font-medium leading-snug ${mod.status === 'locked' ? 'text-text-muted' : 'text-text-primary'}`}>
                    {mod.name}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{mod.days}</p>
                  <p className="text-xs text-text-muted mt-1 leading-snug">{mod.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer CTA */}
        <div className="px-5 pb-6 pt-4 border-t border-border-subtle shrink-0">
          {isActive && (
            <Button variant="primary" size="lg" className="w-full">
              🚀 Continue Mission
            </Button>
          )}
          {isComplete && (
            <Button variant="secondary" size="lg" className="w-full">
              📊 View Summary
            </Button>
          )}
        </div>
      </motion.div>
    </>
  )
}
