import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LevelNode, { type NodeStatus } from '@/components/map/LevelNode'
import PathLine,  { type PathStatus }  from '@/components/map/PathLine'
import Button from '@/components/ui/Button'
import Badge  from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { Skeleton } from '@/components/ui/Skeleton'
import { useShallow } from 'zustand/react/shallow'
import { useProgressStore, type MapLevel, type MapModule } from '@/stores/progressStore'
import { api } from '@/services/api'
import SEO from '@/components/layout/SEO'

/* ─────────────────────────────────────────
   Client-side display config (names/colors/metadata)
───────────────────────────────────────── */

const LEVEL_DISPLAY: Record<number, { name: string; color: string; totalDays: number }> = {
  1: { name: 'Base Camp',   color: '#E94560', totalDays: 30 },
  2: { name: 'Village',     color: '#F5B014', totalDays: 45 },
  3: { name: 'Town',        color: '#4A9EFF', totalDays: 45 },
  4: { name: 'City',        color: '#2ECC71', totalDays: 60 },
  5: { name: 'Capital',     color: '#A855F7', totalDays: 60 },
  6: { name: 'World Stage', color: '#F97316', totalDays: 60 },
}

const MODULE_META: Record<number, Record<number, { name: string; days: string; description: string }>> = {
  1: {
    1: { name: 'Alphabets & Sounds',  days: 'Days 1–5',   description: '26 letters, vowels first, pronunciation guide with Roman Urdu' },
    2: { name: 'Core 100 Words',      days: 'Days 6–12',  description: 'The 100 words powering 50% of all everyday conversations' },
    3: { name: 'Basic Sentences',     days: 'Days 13–20', description: 'SVO formula — one formula, every sentence in English' },
    4: { name: 'Speaking Practice',   days: 'Days 21–30', description: 'Daily speaking drills and pronunciation with Feynman Check' },
  },
  2: {
    1: { name: 'Present Tense',       days: 'Days 1–9',   description: 'Simple and continuous present — the foundation of conversation' },
    2: { name: 'Past Tense',          days: 'Days 10–18', description: 'Simple and continuous past — telling stories' },
    3: { name: 'Future Tense',        days: 'Days 19–27', description: 'Will, going to, and planning your future in English' },
    4: { name: 'Daily Conversations', days: 'Days 28–36', description: 'Greetings, small talk, shopping, and everyday exchanges' },
    5: { name: 'Level 2 Gate',        days: 'Days 37–45', description: 'Pass the gate test to unlock Level 3 — Town' },
  },
  3: {
    1: { name: 'All 12 Tenses',       days: 'Days 1–9',   description: 'Complete tense system — from simple to perfect continuous' },
    2: { name: '500 Core Words',      days: 'Days 10–18', description: 'Expand from 100 to 500 — the vocabulary of fluency' },
    3: { name: 'Short Stories',       days: 'Days 19–27', description: 'Read and retell South Asian daily life stories in English' },
    4: { name: 'Listening Practice',  days: 'Days 28–36', description: 'Train your ear — accents, speed, and real conversation audio' },
    5: { name: 'Level 3 Gate',        days: 'Days 37–45', description: 'Pass the gate test to unlock Level 4 — City' },
  },
  4: {
    1: { name: 'Reading Skills',      days: 'Days 1–10',  description: 'News articles, emails, and real-world English documents' },
    2: { name: 'Writing Skills',      days: 'Days 11–20', description: 'Emails, messages, and structured written communication' },
    3: { name: 'Complex Sentences',   days: 'Days 21–30', description: 'Clauses, connectors, and advanced sentence structures' },
    4: { name: 'Speaking Confidence', days: 'Days 31–40', description: 'Opinion sharing, debate basics, and clear articulation' },
    5: { name: 'Idioms & Phrases',    days: 'Days 41–50', description: 'Top 50 idioms used in everyday South Asian English' },
    6: { name: 'Level 4 Gate',        days: 'Days 51–60', description: 'Pass the gate test to unlock Level 5 — Capital' },
  },
  5: {
    1: { name: 'Advanced Grammar',    days: 'Days 1–10',  description: 'Conditionals, passive voice, reported speech mastery' },
    2: { name: 'Phrasal Verbs',       days: 'Days 11–20', description: 'Top 100 phrasal verbs in context — the secret to fluency' },
    3: { name: 'Fluency Drills',      days: 'Days 21–30', description: 'Speed, rhythm, and spontaneous speaking exercises' },
    4: { name: 'Job Interview Prep',  days: 'Days 31–40', description: 'HR questions, answers, and professional vocabulary' },
    5: { name: 'Business English',    days: 'Days 41–50', description: 'Emails, meetings, presentations, and workplace language' },
    6: { name: 'Level 5 Gate',        days: 'Days 51–60', description: 'Pass the gate test to unlock Level 6 — World Stage' },
  },
  6: {
    1: { name: 'Professional Writing', days: 'Days 1–10', description: 'CVs, cover letters, formal reports, and business proposals' },
    2: { name: 'Public Speaking',      days: 'Days 11–20', description: 'Presentations, storytelling, and commanding a room' },
    3: { name: 'Advanced Vocabulary',  days: 'Days 21–30', description: 'Academic and professional vocabulary for any domain' },
    4: { name: 'IELTS/Exam Prep',      days: 'Days 31–40', description: 'Exam strategies and band score optimization' },
    5: { name: 'Accent & Delivery',    days: 'Days 41–50', description: 'Pronunciation polish, pace, and confident delivery' },
    6: { name: 'Final Gate',           days: 'Days 51–60', description: 'The final gate — professional English fluency certification' },
  },
}

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */

interface DisplayModule {
  name: string
  status: 'complete' | 'active' | 'locked'
  days: string
  description: string
}

interface DisplayLevel {
  level: number
  name: string
  totalDays: number
  status: NodeStatus
  currentDay: number
  color: string
  modules: DisplayModule[]
}

type PathDef = { from: number; to: number; status: PathStatus }

const DESKTOP_POS: Record<number, { x: number; y: number }> = {
  1: { x: 22, y: 18 },
  2: { x: 78, y: 18 },
  3: { x: 22, y: 50 },
  4: { x: 78, y: 50 },
  5: { x: 22, y: 82 },
  6: { x: 78, y: 82 },
}

function buildDisplayLevels(mapLevels: MapLevel[]): DisplayLevel[] {
  if (mapLevels.length === 0) {
    return Object.keys(LEVEL_DISPLAY).map((k) => {
      const lvl = parseInt(k)
      const cfg = LEVEL_DISPLAY[lvl]
      return {
        level: lvl,
        name: cfg.name,
        totalDays: cfg.totalDays,
        status: lvl === 1 ? 'active' : 'locked',
        currentDay: 0,
        color: cfg.color,
        modules: [],
      }
    })
  }

  return mapLevels.map((apiLevel) => {
    const cfg = LEVEL_DISPLAY[apiLevel.level]
    const modulesMeta = MODULE_META[apiLevel.level] ?? {}

    const completedCount = apiLevel.modules.filter((m) => m.status === 'complete').length
    const activeCount = apiLevel.modules.filter((m) => m.status === 'active').length
    const currentDay = completedCount * Math.floor(cfg.totalDays / (apiLevel.modules.length || 1))
      + (activeCount > 0 ? Math.floor(cfg.totalDays / (apiLevel.modules.length || 1) / 2) : 0)

    const modules: DisplayModule[] = apiLevel.modules.map((m: MapModule) => {
      const meta = modulesMeta[m.module] ?? {
        name: `Module ${m.module}`,
        days: '',
        description: '',
      }
      return {
        name: meta.name,
        status: m.status as 'complete' | 'active' | 'locked',
        days: meta.days,
        description: meta.description,
      }
    })

    return {
      level: apiLevel.level,
      name: cfg.name,
      totalDays: cfg.totalDays,
      status: apiLevel.status as NodeStatus,
      currentDay,
      color: cfg.color,
      modules,
    }
  })
}

function buildPaths(mapLevels: MapLevel[]): PathDef[] {
  const pairs = [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  ]
  return pairs.map(([from, to]) => {
    const fromLevel = mapLevels.find((l) => l.level === from)
    let status: PathStatus = 'locked'
    if (fromLevel) {
      if (fromLevel.status === 'complete') status = 'complete'
      else if (fromLevel.status === 'active') status = 'upcoming'
    }
    return { from, to, status }
  })
}

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function MasteryMap() {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState<DisplayLevel | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { mapLevels, loadMasteryMap, learnerProfile } = useProgressStore(
    useShallow((s) => ({
      mapLevels: s.mapLevels,
      loadMasteryMap: s.loadMasteryMap,
      learnerProfile: s.learnerProfile,
    }))
  )

  useEffect(() => {
    setIsLoading(true)
    loadMasteryMap().finally(() => setIsLoading(false))
  }, [loadMasteryMap])

  const displayLevels = buildDisplayLevels(mapLevels)
  const paths = buildPaths(mapLevels)

  const currentLevel = learnerProfile?.currentLevel ?? 1
  const levelName = LEVEL_DISPLAY[currentLevel]?.name ?? `Level ${currentLevel}`
  const mapTitle = `Your English Journey — Level ${currentLevel}: ${levelName} — EnglishOS`

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bg-primary overflow-hidden font-body">
      <SEO
        title={mapTitle}
        description="Follow your personal English learning path. Complete daily missions, pass Level Gates, and track your progression from Base Camp to World Stage."
        url="/map"
      />

      {/* ── Map canvas ── */}
      <div className="flex-1 relative overflow-hidden">
        <MapBackground />

        {/* Top nav strip */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 bg-bg-primary/60 backdrop-blur-sm border-b border-border-subtle">
          <span className="font-display font-bold text-lg text-text-primary">
            English<span className="text-brand-red">OS</span>
          </span>
          <TopBarStats />
        </div>

        {/* Desktop Z-pattern map — hidden on mobile */}
        <div className="hidden md:block absolute inset-0 pt-16 pb-4">
          {isLoading ? <MapSkeleton /> : (
            <DesktopMap levels={displayLevels} paths={paths} onSelect={setSelectedLevel} />
          )}
        </div>

        {/* Mobile vertical map */}
        <div className="md:hidden absolute inset-0 pt-16 pb-[200px] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center gap-0 px-6 py-6">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="w-28 h-28" rounded="rounded-full" />
                  {i < 6 && <div className="w-0.5 h-10 my-1 bg-bg-tertiary animate-pulse rounded-full" />}
                </div>
              ))}
            </div>
          ) : (
            <MobileMap levels={displayLevels} onSelect={setSelectedLevel} />
          )}
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
   Top bar streak / day badge
───────────────────────────────────────── */
function TopBarStats() {
  const { streak, learnerProfile } = useProgressStore(
    useShallow((s) => ({ streak: s.streak, learnerProfile: s.learnerProfile }))
  )
  const dayNumber = learnerProfile?.dayNumber ?? 0
  return (
    <div className="flex items-center gap-3">
      <Badge variant="red" size="sm">🔥 {streak}-day streak</Badge>
      {dayNumber > 0 && <Badge variant="muted" size="sm">Day {dayNumber}</Badge>}
    </div>
  )
}

/* ─────────────────────────────────────────
   Map background
───────────────────────────────────────── */
function MapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-bg-primary" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-10 rounded-full"
        style={{ background: 'radial-gradient(ellipse, #4A9EFF 0%, transparent 65%)', filter: 'blur(80px)' }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C8C8E0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute top-[8%] left-[10%] w-48 h-32 rounded-2xl border border-border-subtle/30 opacity-20 rotate-12" />
      <div className="absolute top-[40%] right-[8%] w-32 h-20 rounded-xl border border-border-subtle/20 opacity-15 -rotate-6" />
      <div className="absolute bottom-[15%] left-[20%] w-24 h-24 rounded-full border border-border-subtle/20 opacity-20" />
      <div className="absolute top-[65%] right-[20%] w-40 h-16 rounded-xl border border-border-subtle/15 opacity-15 rotate-3" />
    </div>
  )
}

/* ─────────────────────────────────────────
   Map skeleton (while loading)
───────────────────────────────────────── */
function MapSkeleton() {
  const positions = Object.values(DESKTOP_POS)
  return (
    <div className="relative w-full h-full max-w-2xl mx-auto px-8">
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <Skeleton className="w-28 h-28" rounded="rounded-full" />
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   Desktop Z-pattern map
───────────────────────────────────────── */
function DesktopMap({ levels, paths, onSelect }: {
  levels: DisplayLevel[]
  paths: PathDef[]
  onSelect: (l: DisplayLevel) => void
}) {
  return (
    <div className="relative w-full h-full max-w-2xl mx-auto px-8">
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
function MobileMap({ levels, onSelect }: { levels: DisplayLevel[]; onSelect: (l: DisplayLevel) => void }) {
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
  const {
    streak, brainCompoundPct, todayMissions, myWhy, batmanModeActive, batmanSkipUsedThisWeek, setBatmanState,
  } = useProgressStore(
    useShallow((s) => ({
      streak: s.streak,
      brainCompoundPct: s.brainCompoundPct,
      todayMissions: s.todayMissions,
      myWhy: s.myWhy,
      batmanModeActive: s.batmanModeActive,
      batmanSkipUsedThisWeek: s.batmanSkipUsedThisWeek,
      setBatmanState: s.setBatmanState,
    }))
  )
  const [skipLoading, setSkipLoading] = useState(false)
  const [skipError, setSkipError] = useState<string | null>(null)

  const morningDone = todayMissions?.morning?.status === 'COMPLETE'
  const eveningDone = todayMissions?.evening?.status === 'COMPLETE'

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

      {/* Batman Mode */}
      {batmanModeActive && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border"
            style={{ background: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.35)' }}
          >
            <motion.span
              className="text-base shrink-0"
              animate={{ filter: ['drop-shadow(0 0 0px #A855F7)', 'drop-shadow(0 0 8px #A855F7)', 'drop-shadow(0 0 0px #A855F7)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >🦇</motion.span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ color: '#A855F7' }}>
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="currentColor" opacity="0.7" />
            </svg>
            <span className="text-xs font-mono font-semibold" style={{ color: '#A855F7' }}>Batman Mode Active</span>
          </div>

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
              style={{ background: 'rgba(168,85,247,0.12)', borderColor: 'rgba(168,85,247,0.4)', color: '#A855F7' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="currentColor" />
              </svg>
              {skipLoading ? 'Using…' : 'Use Your Skip Day'}
            </button>
          )}
          {skipError && <p className="text-xs text-brand-red font-mono">{skipError}</p>}
        </motion.div>
      )}

      {/* Brain Compound Meter */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-sm">🧠</span>
          <p className="text-xs font-body font-medium text-text-secondary">Brain Compound Meter</p>
        </div>
        <ProgressBar value={brainCompoundPct} color="#4A9EFF" />
        <p className="text-xs text-text-muted font-mono mt-1">{Math.round(brainCompoundPct)}% knowledge compounded</p>
      </div>

      {/* Today's missions */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Today's Missions</p>
        <MissionRow label="Morning Mission" done={morningDone} time="20 min" />
        <MissionRow label="Evening Mission" done={eveningDone} time="40 min" />
      </div>

      {/* My Why */}
      {myWhy && (
        <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5">
          <p className="text-xs font-mono text-text-muted mb-0.5">Your Why</p>
          <p className="text-sm font-body text-text-secondary">{myWhy}</p>
        </div>
      )}

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
function LevelDrawer({ level, onClose }: { level: DisplayLevel; onClose: () => void }) {
  const isActive = level.status === 'active'

  return (
    <>
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="drawer-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-bg-secondary border-l border-border-subtle flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border-subtle shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: level.color }} />
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

        {isActive && (
          <div className="px-5 py-4 border-b border-border-subtle shrink-0">
            <ProgressBar
              value={level.currentDay > 0 ? Math.round((level.currentDay / level.totalDays) * 100) : 0}
              color={level.color}
              label={`Day ${level.currentDay} of ${level.totalDays}`}
            />
          </div>
        )}

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
                    <motion.div className="w-2 h-2 rounded-full bg-brand-red" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                  )}
                  {mod.status === 'locked' && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6A6A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={`text-sm font-body font-medium truncate ${mod.status === 'complete' ? 'text-brand-green' : mod.status === 'active' ? 'text-text-primary' : 'text-text-muted'}`}>
                      {mod.name}
                    </p>
                    {mod.days && <span className="text-[10px] font-mono text-text-muted shrink-0">{mod.days}</span>}
                  </div>
                  {mod.description && (
                    <p className="text-xs font-body text-text-muted leading-relaxed">{mod.description}</p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </>
  )
}
