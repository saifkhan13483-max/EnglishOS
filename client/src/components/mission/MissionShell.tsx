import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import WarmupFlash      from './WarmupFlash'
import CoreDrop         from './CoreDrop'
import ApplyIt          from './ApplyIt'
import FeynmanMoment    from './FeynmanMoment'

import StoryReplay      from './StoryReplay'
import SentenceBuilder  from './SentenceBuilder'
import ConversationSim  from './ConversationSim'
import DayClose         from './DayClose'

const MORNING_PHASES = ['Warm-Up', 'Core Drop', 'Apply It', 'Feynman']
const EVENING_PHASES = ['Story', 'Sentences', 'Conversation', 'Day Close']

const RESUME_KEY = 'eos_mission_resume'
const RESUME_MAX_AGE_MS = 24 * 60 * 60 * 1000 // 24 hours

interface ResumeState {
  missionType: 'morning' | 'evening'
  phase: number
  savedAt: number
}

interface XpToast { id: number; amount: number }

interface MissionShellProps {
  type?: 'morning' | 'evening'
}

function getSavedPhase(type: 'morning' | 'evening'): number {
  try {
    const raw = localStorage.getItem(RESUME_KEY)
    if (!raw) return 1
    const saved = JSON.parse(raw) as ResumeState
    const age = Date.now() - saved.savedAt
    if (saved.missionType === type && age < RESUME_MAX_AGE_MS && saved.phase > 1) {
      return saved.phase
    }
  } catch {
    // ignore malformed data
  }
  return 1
}

export default function MissionShell({ type = 'morning' }: MissionShellProps) {
  const navigate = useNavigate()
  const [phase,  setPhase]  = useState(() => getSavedPhase(type))
  const [dir,    setDir]    = useState(1)
  const [toasts, setToasts] = useState<XpToast[]>([])

  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const isEvening = type === 'evening'
  const PHASES    = isEvening ? EVENING_PHASES : MORNING_PHASES
  const TOTAL     = PHASES.length

  // Persist current phase to localStorage whenever it changes (Edge Cases 2, 4)
  useEffect(() => {
    const state: ResumeState = { missionType: type, phase, savedAt: Date.now() }
    localStorage.setItem(RESUME_KEY, JSON.stringify(state))
  }, [phase, type])

  // On session expiry mid-mission, ensure state is saved before the page navigates (Edge Case 2)
  useEffect(() => {
    function handleSessionExpired() {
      const state: ResumeState = {
        missionType: type,
        phase: phaseRef.current,
        savedAt: Date.now(),
      }
      localStorage.setItem(RESUME_KEY, JSON.stringify(state))
    }
    window.addEventListener('eos:session-expired', handleSessionExpired)
    return () => window.removeEventListener('eos:session-expired', handleSessionExpired)
  }, [type])

  function advance() {
    setDir(1)
    setPhase((p) => Math.min(p + 1, TOTAL))
  }

  function showXp(amount: number) {
    const id = Date.now()
    setToasts((t) => [...t, { id, amount }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500)
  }

  function handleMissionComplete() {
    // Clear resume state on successful completion
    localStorage.removeItem(RESUME_KEY)
    navigate('/dashboard')
  }

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as number[] } },
    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.2 } }),
  }

  return (
    <div className="min-h-screen bg-bg-primary font-body flex flex-col">

      {/* ── Fixed top bar ── */}
      <div className="shrink-0 sticky top-0 z-30 bg-bg-primary/90 backdrop-blur-sm border-b border-border-subtle">
        {/* Row 1: back + title */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-text-muted hover:text-text-secondary transition-colors p-1 rounded-lg"
            aria-label="Back to dashboard"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex-1 text-center">
            <p className="font-display font-semibold text-text-primary text-sm">
              {isEvening ? '🌙 Evening Mission' : '☀️ Morning Mission'}
            </p>
          </div>

          <span className="text-xs font-mono text-text-muted w-7 text-right">
            {phase}/{TOTAL}
          </span>
        </div>

        {/* Row 2: 4-segment progress bar */}
        <div className="flex gap-1 px-4 pb-1">
          {PHASES.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 flex-1 rounded-full"
              animate={{
                backgroundColor:
                  i + 1 < phase  ? '#2ECC71' :
                  i + 1 === phase ? (isEvening ? '#4A9EFF' : '#E94560') :
                  '#2A2A3E',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Row 3: phase names */}
        <div className="flex px-4 pb-3">
          {PHASES.map((name, i) => (
            <div key={name} className="flex-1 text-center">
              <span
                className={`text-[10px] font-mono transition-colors duration-200 ${
                  i + 1 === phase
                    ? isEvening
                      ? 'text-brand-blue font-semibold'
                      : 'text-brand-red font-semibold'
                    : 'text-text-muted'
                }`}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Phase content ── */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={phase}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            {/* ── Morning phases ── */}
            {!isEvening && phase === 1 && <WarmupFlash   onComplete={advance} onXpEarned={showXp} />}
            {!isEvening && phase === 2 && <CoreDrop      onComplete={advance} />}
            {!isEvening && phase === 3 && <ApplyIt       onComplete={advance} />}
            {!isEvening && phase === 4 && <FeynmanMoment onComplete={handleMissionComplete} />}

            {/* ── Evening phases ── */}
            {isEvening && phase === 1 && <StoryReplay     onComplete={advance} />}
            {isEvening && phase === 2 && <SentenceBuilder onComplete={advance} onXpEarned={showXp} />}
            {isEvening && phase === 3 && <ConversationSim onComplete={advance} onXpEarned={showXp} />}
            {isEvening && phase === 4 && <DayClose        onComplete={handleMissionComplete} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── XP Toast ── */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.85 }}
              animate={{ opacity: 1, x: 0,  scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-display font-bold text-sm shadow-xl"
            >
              <span>⭐</span>
              +{t.amount} XP
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
