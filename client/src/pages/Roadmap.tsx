import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SEO from '@/components/layout/SEO'
import roadmapRaw from '@/assets/roadmap.md?raw'

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface DayEntry {
  day: number
  label: string
  topic: string
  bullets: string[]
  isRevision: boolean
  isFeynman: boolean
  isLevelComplete: boolean
  isModuleComplete: boolean
}

interface ModuleData {
  number: number
  name: string
  dayRange: string
  days: DayEntry[]
}

interface LevelData {
  number: number
  name: string
  emoji: string
  color: string
  colorDim: string
  dayRange: string
  totalDays: number
  goal: string
  modules: ModuleData[]
}

/* ─────────────────────────────────────────
   Level display config
───────────────────────────────────────── */
const LEVEL_META: Record<number, { color: string; colorDim: string; emoji: string }> = {
  1: { color: '#E94560', colorDim: 'rgba(233,69,96,0.15)',  emoji: '🏕️' },
  2: { color: '#F5B014', colorDim: 'rgba(245,176,20,0.15)', emoji: '🏘️' },
  3: { color: '#4A9EFF', colorDim: 'rgba(74,158,255,0.15)', emoji: '🏙️' },
  4: { color: '#2ECC71', colorDim: 'rgba(46,204,113,0.15)', emoji: '🌆' },
  5: { color: '#A855F7', colorDim: 'rgba(168,85,247,0.15)', emoji: '🏛️' },
  6: { color: '#F97316', colorDim: 'rgba(249,115,22,0.15)', emoji: '🌍' },
}

/* ─────────────────────────────────────────
   Markdown parser
───────────────────────────────────────── */
function parseRoadmap(raw: string): LevelData[] {
  const lines = raw.split('\n')
  const levels: LevelData[] = []
  let currentLevel: LevelData | null = null
  let currentModule: ModuleData | null = null
  let currentDay: DayEntry | null = null
  let inDayBlock = false

  const pushDay = () => {
    if (currentDay && currentModule) {
      currentModule.days.push(currentDay)
      currentDay = null
      inDayBlock = false
    }
  }

  const pushModule = () => {
    if (currentModule && currentLevel) {
      if (currentDay) pushDay()
      currentLevel.modules.push(currentModule)
      currentModule = null
    }
  }

  const pushLevel = () => {
    if (currentLevel) {
      pushModule()
      levels.push(currentLevel)
      currentLevel = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    /* ── Level heading: ## 🏕️ LEVEL 1 — BASE CAMP (DAYS 1–30) ── */
    const lvlMatch = line.match(/^##\s+(🏕️|🏘️|🏙️|🌆|🏛️|🌍)\s+LEVEL\s+(\d+)\s+[—–]\s+(.+?)\s+\(DAYS\s+([\d–]+)\)/)
    if (lvlMatch) {
      pushLevel()
      const num = parseInt(lvlMatch[2])
      const meta = LEVEL_META[num] ?? { color: '#E94560', colorDim: 'rgba(233,69,96,0.15)', emoji: '🏕️' }
      const dayRange = lvlMatch[4]
      const parts = dayRange.split('–')
      const start = parseInt(parts[0])
      const end = parseInt(parts[1] ?? parts[0])
      currentLevel = {
        number: num,
        name: lvlMatch[3],
        emoji: lvlMatch[1],
        color: meta.color,
        colorDim: meta.colorDim,
        dayRange,
        totalDays: end - start + 1,
        goal: '',
        modules: [],
      }
      continue
    }

    /* goal line ("> **Goal:** ...") */
    if (currentLevel && line.match(/>\s+\*\*Goal:\*\*/)) {
      currentLevel.goal = line.replace(/^>\s+\*\*Goal:\*\*\s*/, '').trim()
      continue
    }

    /* ── Module heading: ### 📚 MODULE 1 — NAME (DAYS ...) ── */
    const modMatch = line.match(/^###\s+📚\s+MODULE\s+(\d+)\s+[—–]\s+(.+?)\s+\(DAYS\s+([\d–]+)\)/)
    if (modMatch && currentLevel) {
      pushModule()
      currentModule = {
        number: parseInt(modMatch[1]),
        name: modMatch[2],
        dayRange: modMatch[3],
        days: [],
      }
      continue
    }

    /* ── Day heading: ### DAY 1 or ### DAY 1 — ... ── */
    const dayMatch = line.match(/^###\s+DAY\s+(\d+)(?:\s+[—–]\s+(.+))?/)
    if (dayMatch && currentLevel) {
      if (!currentModule) {
        /* day outside a module — create a default module */
        currentModule = {
          number: 0,
          name: 'General',
          dayRange: '',
          days: [],
        }
      }
      pushDay()
      const dayNum = parseInt(dayMatch[1])
      const label = dayMatch[2] ?? ''
      inDayBlock = true
      currentDay = {
        day: dayNum,
        label,
        topic: '',
        bullets: [],
        isRevision: label.includes('🔄') || label.includes('REVISION') || label.includes('SPACED'),
        isFeynman: false,
        isLevelComplete: label.includes('LEVEL') && label.includes('COMPLETE'),
        isModuleComplete: false,
      }
      continue
    }

    /* ── Inside a day block ── */
    if (inDayBlock && currentDay) {
      /* Topic line */
      if (line.startsWith('**Topic:**')) {
        currentDay.topic = line.replace('**Topic:**', '').trim()
        continue
      }
      /* Feynman or revision markers in bullet form */
      if (line.includes('Feynman Challenge') || line.includes('🧠')) {
        currentDay.isFeynman = true
      }
      if (line.includes('🔄') || line.includes('REVISION') || line.includes('Spaced Rep')) {
        currentDay.isRevision = true
      }
      /* Module complete marker */
      if (line.includes('MODULE') && line.includes('COMPLETE')) {
        currentDay.isModuleComplete = true
      }
      /* Collect bullet lines (skip empty / pure --- / headings) */
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('---') && !trimmed.startsWith('#') && !trimmed.startsWith('>')) {
        /* clean markdown bold */
        const clean = trimmed
          .replace(/^\-\s+/, '')
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .trim()
        if (clean.length > 1) {
          currentDay.bullets.push(clean)
        }
      }
    }
  }

  pushLevel()
  return levels
}

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

function DayCard({ entry, color }: { entry: DayEntry; color: string }) {
  const [open, setOpen] = useState(false)

  let badge: React.ReactNode = null
  if (entry.isLevelComplete) badge = <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30">Level Complete</span>
  else if (entry.isModuleComplete) badge = <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Module Complete</span>
  else if (entry.isFeynman) badge = <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">🧠 Feynman</span>
  else if (entry.isRevision) badge = <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">🔄 Revision</span>

  return (
    <div className="border border-border-subtle rounded-xl overflow-hidden bg-bg-secondary/40">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-bg-secondary/60 transition-colors"
      >
        <span
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
          style={{ background: `${color}20`, color }}
        >
          {entry.day}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {badge}
            {entry.label && !entry.isLevelComplete && (
              <span className="text-[10px] text-text-muted font-mono truncate">{entry.label}</span>
            )}
          </div>
          <p className="text-sm font-medium text-text-primary truncate mt-0.5">
            {entry.topic || `Day ${entry.day}`}
          </p>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`flex-shrink-0 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-border-subtle">
              <ul className="space-y-1.5">
                {entry.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ModuleSection({ mod, color, colorDim }: { mod: ModuleData; color: string; colorDim: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-border-subtle rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-bg-secondary/50 transition-colors"
        style={{ background: open ? colorDim : undefined }}
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: `${color}30`, color }}
        >
          {mod.number}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-text-primary text-sm">{mod.name}</p>
          {mod.dayRange && (
            <p className="text-xs text-text-muted font-mono mt-0.5">Days {mod.dayRange}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted font-mono">{mod.days.length} days</span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-border-subtle space-y-2 bg-bg-primary/30">
              {mod.days.map(day => (
                <DayCard key={day.day} entry={day} color={color} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LevelCard({ level, isActive, onClick }: {
  level: LevelData
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border transition-all duration-200 ${
        isActive
          ? 'border-transparent'
          : 'border-border-subtle bg-bg-secondary/40 hover:border-border-primary'
      }`}
      style={isActive ? { background: level.colorDim, borderColor: `${level.color}60` } : {}}
    >
      <span className="text-2xl">{level.emoji}</span>
      <span className="text-xs font-semibold" style={isActive ? { color: level.color } : { color: 'var(--text-secondary)' }}>
        Level {level.number}
      </span>
      <span className="text-[10px] text-text-muted font-mono">{level.totalDays}d</span>
    </button>
  )
}

/* ─────────────────────────────────────────
   Frameworks section (static)
───────────────────────────────────────── */
const FRAMEWORKS = [
  {
    icon: '🔬',
    color: '#E94560',
    dim: 'rgba(233,69,96,0.12)',
    title: 'DiSS Method',
    subtitle: 'Deconstruct → Select → Sequence → Stakes',
    desc: 'Har Level pe English ko chhote tukdon mein toda, sirf 20% content jo 80% results deta hai select kiya, sahi order mein sequence kiya, aur stakes set ki.',
  },
  {
    icon: '💡',
    color: '#F5B014',
    dim: 'rgba(245,176,20,0.12)',
    title: 'Feynman Technique',
    subtitle: 'Understand by teaching',
    desc: 'Aaj jo seekha use apne words mein explain karo — jahan ruk jao wahi knowledge gap hai. Har Level mein Feynman Challenges hain jo real understanding verify karte hain.',
  },
  {
    icon: '🔄',
    color: '#4A9EFF',
    dim: 'rgba(74,158,255,0.12)',
    title: 'Spaced Repetition',
    subtitle: '1 → 3 → 7 → 21 day review cycles',
    desc: 'Dimag se content bhoolne se theek pehle revise karo. Roadmap mein har 7 din pe Revision Day markers hain, aur EnglishOS Morning WarmupFlash automatically schedule karta hai.',
  },
  {
    icon: '🎯',
    color: '#2ECC71',
    dim: 'rgba(46,204,113,0.12)',
    title: 'Serial Mastery',
    subtitle: 'One level at a time',
    desc: 'Ek Level master karo, Gate Test pass karo, tab agle Level pe jao. Skip karna allowed nahi — yeh roadmap is principle pe bana hai.',
  },
]

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function Roadmap() {
  const navigate = useNavigate()
  const [activeLevel, setActiveLevel] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFrameworks, setShowFrameworks] = useState(false)

  const levels = useMemo(() => parseRoadmap(roadmapRaw), [])
  const currentLevel = levels.find(l => l.number === activeLevel)

  const filteredModules = useMemo(() => {
    if (!currentLevel) return []
    if (!searchQuery.trim()) return currentLevel.modules
    const q = searchQuery.toLowerCase()
    return currentLevel.modules
      .map(mod => ({
        ...mod,
        days: mod.days.filter(day =>
          day.topic.toLowerCase().includes(q) ||
          day.bullets.some(b => b.toLowerCase().includes(q)) ||
          String(day.day).includes(q)
        ),
      }))
      .filter(mod => mod.days.length > 0)
  }, [currentLevel, searchQuery])

  const totalDays = levels.reduce((sum, l) => sum + l.totalDays, 0)

  return (
    <>
      <SEO title="300-Day Roadmap — EnglishOS" description="Complete 300-day English mastery roadmap — Base Camp to World Stage" />

      <div className="min-h-screen bg-bg-primary font-body">
        {/* ── Top nav ── */}
        <div className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-border-subtle hover:border-border-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="font-bold text-text-primary text-sm tracking-tight">300-Day Roadmap</span>
            </div>
            <span className="text-xs font-mono text-text-muted">{totalDays} days · 6 levels</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-mono font-medium">
              <span>🗺️</span> EnglishOS Mastery Roadmap
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
              Base Camp se<br />
              <span className="text-brand-red">World Stage</span> Tak
            </h1>
            <p className="text-text-secondary text-sm max-w-lg mx-auto leading-relaxed">
              300 din ka complete plan — Bilkul shuruwaat se professional English tak.
              Roz 1 ghanta · 4 proven frameworks · 6 levels
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {[
                { label: '300 Days', sub: 'Day-by-day plan' },
                { label: '6 Levels', sub: 'Base Camp → World Stage' },
                { label: '1 hr/day', sub: '20 min + 40 min' },
                { label: '4 Methods', sub: 'Science-backed' },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center px-4 py-2 rounded-xl bg-bg-secondary/60 border border-border-subtle">
                  <span className="text-base font-bold text-text-primary">{s.label}</span>
                  <span className="text-[10px] text-text-muted font-mono">{s.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Level overview table ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border-subtle overflow-hidden"
          >
            <div className="bg-bg-secondary/60 px-5 py-4 border-b border-border-subtle">
              <h2 className="font-bold text-text-primary text-sm">Roadmap Overview</h2>
            </div>
            <div className="divide-y divide-border-subtle">
              {[
                { emoji: '🏕️', level: 1, name: 'Base Camp',   days: '1–30',    total: 30,  goal: 'Alphabets, Words, Basic Sentences' },
                { emoji: '🏘️', level: 2, name: 'Village',     days: '31–75',   total: 45,  goal: 'Grammar, Tenses, Daily Conversations' },
                { emoji: '🏙️', level: 3, name: 'Town',        days: '76–120',  total: 45,  goal: 'All 12 Tenses, 500 Words, Reading' },
                { emoji: '🌆', level: 4, name: 'City',         days: '121–180', total: 60,  goal: 'Writing, Letters, Speaking Confidence' },
                { emoji: '🏛️', level: 5, name: 'Capital',     days: '181–240', total: 60,  goal: 'Advanced Grammar, Idioms, Business English' },
                { emoji: '🌍', level: 6, name: 'World Stage',  days: '241–300', total: 60,  goal: 'Professional English, IELTS, Interviews' },
              ].map(row => {
                const meta = LEVEL_META[row.level]
                return (
                  <button
                    key={row.level}
                    onClick={() => setActiveLevel(row.level)}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-bg-secondary/40 transition-colors text-left"
                  >
                    <span className="text-xl flex-shrink-0">{row.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-text-primary">Level {row.level} — {row.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: meta.colorDim, color: meta.color }}>
                          {row.total} days
                        </span>
                      </div>
                      <p className="text-xs text-text-muted truncate mt-0.5">{row.goal}</p>
                    </div>
                    <span className="text-xs font-mono text-text-muted flex-shrink-0">Days {row.days}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* ── Learning Science Frameworks ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border-subtle overflow-hidden"
          >
            <button
              onClick={() => setShowFrameworks(f => !f)}
              className="w-full flex items-center justify-between px-5 py-4 bg-bg-secondary/60 border-b border-border-subtle hover:bg-bg-secondary/80 transition-colors"
            >
              <div>
                <h2 className="font-bold text-text-primary text-sm">🧠 Learning Science Framework</h2>
                <p className="text-xs text-text-muted mt-0.5">4 proven methodologies that power this roadmap</p>
              </div>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`text-text-muted transition-transform duration-200 ${showFrameworks ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <AnimatePresence>
              {showFrameworks && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FRAMEWORKS.map(fw => (
                      <div
                        key={fw.title}
                        className="rounded-xl p-4 border border-border-subtle"
                        style={{ background: fw.dim }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{fw.icon}</span>
                          <span className="font-bold text-sm" style={{ color: fw.color }}>{fw.title}</span>
                        </div>
                        <p className="text-xs font-mono text-text-muted mb-2">{fw.subtitle}</p>
                        <p className="text-xs text-text-secondary leading-relaxed">{fw.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Level navigator ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <h2 className="font-bold text-text-primary text-base">Browse by Level</h2>

            {/* Level tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {levels.map(level => (
                <LevelCard
                  key={level.number}
                  level={level}
                  isActive={activeLevel === level.number}
                  onClick={() => setActiveLevel(level.number)}
                />
              ))}
            </div>

            {/* Active level detail */}
            {currentLevel && (
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                {/* Level header */}
                <div
                  className="rounded-2xl p-5 border"
                  style={{ background: currentLevel.colorDim, borderColor: `${currentLevel.color}40` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{currentLevel.emoji}</span>
                        <h3 className="font-bold text-text-primary">
                          Level {currentLevel.number} — {currentLevel.name}
                        </h3>
                      </div>
                      <p className="text-xs font-mono text-text-muted">Days {currentLevel.dayRange} · {currentLevel.totalDays} days · {currentLevel.modules.length} modules</p>
                      {currentLevel.goal && (
                        <p className="text-sm text-text-secondary mt-2">{currentLevel.goal}</p>
                      )}
                    </div>
                    <span
                      className="flex-shrink-0 text-xs font-mono font-bold px-3 py-1 rounded-full"
                      style={{ background: `${currentLevel.color}30`, color: currentLevel.color }}
                    >
                      {currentLevel.totalDays}d
                    </span>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="15" height="15"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search topics or day number..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-subtle bg-bg-secondary/60 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-primary transition-colors"
                  />
                </div>

                {/* Modules */}
                <div className="space-y-3">
                  {filteredModules.length === 0 ? (
                    <div className="text-center py-12 text-text-muted text-sm">No results found for "{searchQuery}"</div>
                  ) : (
                    filteredModules.map(mod => (
                      <ModuleSection
                        key={mod.number}
                        mod={mod}
                        color={currentLevel.color}
                        colorDim={currentLevel.colorDim}
                      />
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-brand-red/30 bg-brand-red/8 p-6 text-center space-y-3"
          >
            <h3 className="font-bold text-text-primary">Tayaar ho? Journey shuru karo!</h3>
            <p className="text-sm text-text-secondary">Roadmap ke sath EnglishOS pe roz Morning aur Evening Missions complete karo — XP kamao, streak barqarar rakho.</p>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-red text-white text-sm font-semibold hover:bg-brand-red/90 transition-colors"
            >
              Shuru Karo — Free Hai
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </motion.div>

        </div>
      </div>
    </>
  )
}
