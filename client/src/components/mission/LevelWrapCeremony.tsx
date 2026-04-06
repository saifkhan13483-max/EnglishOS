import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LevelWrapStats {
  vocabWords: number
  grammarRules: number
  daysCompleted: number
  feynmanImprovement: number
}

export interface LevelWrapCeremonyProps {
  level: number
  locationName: string
  stats: LevelWrapStats
  myWhy: string
  nextLevelName: string
  onBegin?: () => void
  onReturnToMap?: () => void
}

// ── Why → motivational message map ────────────────────────────────────────────

const WHY_MESSAGES: Record<string, string> = {
  'Job Interview':           'Your interview English just leveled up. Keep going.',
  'Career Growth':           'You are building something most people never finish.',
  'Social Confidence':       'Your confidence is compounding every single day.',
  'Study Abroad':            'Every level brings your dream closer to reality.',
  'Business Communication':  'Your professional voice is getting stronger. Do not stop.',
  'Personal Development':    'You promised yourself this. You are delivering. Keep going.',
}

function getWhyMessage(myWhy: string): string {
  return WHY_MESSAGES[myWhy] ?? 'You have proven that you are serious. Keep that energy.'
}

// ── Level colors (matches the Mastery Map palette) ────────────────────────────

const LEVEL_COLORS: Record<number, string> = {
  1: '#E94560',
  2: '#F5B014',
  3: '#4A9EFF',
  4: '#2ECC71',
  5: '#A855F7',
  6: '#F97316',
}

function levelColor(n: number) {
  return LEVEL_COLORS[n] ?? '#C8C8E0'
}

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0)
  const startedRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    let begin: number | null = null
    const step = (ts: number) => {
      if (!begin) begin = ts
      const p = Math.min((ts - begin) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [target, duration])

  useEffect(() => {
    if (active) start()
  }, [active, start])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return val
}

// ── Animated stat row ─────────────────────────────────────────────────────────

function StatRow({
  value,
  suffix,
  label,
  active,
  delay,
  color,
}: {
  value: number
  suffix: string
  label: string
  active: boolean
  delay: number
  color: string
}) {
  const counted = useCountUp(value, 900, active)

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between py-2.5 border-b border-border-subtle last:border-0"
    >
      <span className="text-sm font-body text-text-secondary">{label}</span>
      <motion.span
        className="font-display font-bold text-base tabular-nums"
        style={{ color }}
      >
        {counted.toLocaleString()}{suffix}
      </motion.span>
    </motion.div>
  )
}

// ── Mini map node ─────────────────────────────────────────────────────────────

function MapNode({
  lvl,
  name,
  state,
  delay,
}: {
  lvl: number
  name: string
  state: 'completed' | 'next' | 'locked'
  delay: number
}) {
  const color = levelColor(lvl)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 22 }}
      className="flex flex-col items-center gap-2"
    >
      {/* Node circle */}
      <motion.div
        className="relative w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0"
        style={{
          borderColor: state === 'locked' ? '#2A2A3E' : color,
          background: state === 'locked' ? '#12121A' : `${color}18`,
        }}
        animate={
          state === 'completed'
            ? {
                boxShadow: [
                  `0 0 0px 0px ${color}00`,
                  `0 0 18px 6px ${color}60`,
                  `0 0 0px 0px ${color}00`,
                ],
              }
            : state === 'next'
            ? {
                boxShadow: [
                  `0 0 0px 0px ${color}00`,
                  `0 0 12px 4px ${color}40`,
                  `0 0 0px 0px ${color}00`,
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: state !== 'locked' ? Infinity : 0 }}
      >
        {state === 'completed' ? (
          <motion.svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.5, ease: 'easeOut' }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        ) : state === 'next' ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
            className="font-display font-bold text-sm"
            style={{ color }}
          >
            {lvl}
          </motion.span>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2A2A3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        )}
      </motion.div>

      {/* Level label */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: state !== 'locked' ? 1 : 0.3 }}
          transition={{ delay: delay + 0.25 }}
          className="text-[10px] font-mono uppercase tracking-wider"
          style={{ color: state !== 'locked' ? color : '#6A6A8A' }}
        >
          L{lvl}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: state !== 'locked' ? 1 : 0.25, y: 0 }}
          transition={{ delay: delay + 0.35, duration: 0.4 }}
          className="text-xs font-body font-medium text-text-secondary leading-tight"
        >
          {name}
        </motion.p>
      </div>
    </motion.div>
  )
}

// ── Beam / path between nodes ─────────────────────────────────────────────────

function PathBeam({ fromColor, toColor, active, delay }: {
  fromColor: string
  toColor: string
  active: boolean
  delay: number
}) {
  return (
    <div className="flex items-center justify-center flex-1 mx-1 mt-[-28px]">
      <div className="relative w-full h-1 bg-bg-tertiary rounded-full overflow-hidden">
        <AnimatePresence>
          {active && (
            <motion.div
              key="beam"
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: `linear-gradient(90deg, ${fromColor}, ${toColor})` }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Checkmark SVG (Stage 1) ───────────────────────────────────────────────────

function CheckmarkHero() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.15 }}
      className="flex flex-col items-center gap-5"
    >
      {/* Outer ring + checkmark */}
      <div className="relative">
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid #2ECC71' }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(46,204,113,0.12)', border: '2px solid #2ECC71' }}
        >
          <motion.svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2ECC71"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="text-center"
      >
        <p className="text-xs font-mono text-brand-green uppercase tracking-widest mb-1">Level Complete</p>
        <h1 className="font-display font-bold text-3xl text-text-primary">Well done.</h1>
      </motion.div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function LevelWrapCeremony({
  level,
  locationName,
  stats,
  myWhy,
  nextLevelName,
  onBegin,
  onReturnToMap,
}: LevelWrapCeremonyProps) {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1)

  // ── Confetti on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true })

    const burst = (opts?: confetti.Options) =>
      myConfetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.45 },
        colors: ['#E94560', '#F5B014', '#4A9EFF', '#2ECC71', '#FFFFFF'],
        gravity: 0.85,
        scalar: 1.1,
        ...opts,
      })

    burst()
    const t1 = setTimeout(() => burst(), 600)
    const t2 = setTimeout(() => {
      myConfetti({ particleCount: 70, spread: 110, origin: { x: 0.1, y: 0.5 }, angle: 65, colors: ['#E94560', '#F5B014'] })
      myConfetti({ particleCount: 70, spread: 110, origin: { x: 0.9, y: 0.5 }, angle: 115, colors: ['#4A9EFF', '#2ECC71'] })
    }, 1100)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // ── Stage timer sequence ───────────────────────────────────────────────────
  useEffect(() => {
    const t2 = setTimeout(() => setStage(2), 2000)
    const t3 = setTimeout(() => setStage(3), 5000)
    const t4 = setTimeout(() => setStage(4), 7000)
    const t5 = setTimeout(() => setStage(5), 10000)
    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5) }
  }, [])

  // ── Navigation ─────────────────────────────────────────────────────────────
  function handleBegin() {
    if (onBegin) onBegin()
    else navigate('/map')
  }

  function handleReturnToMap() {
    if (onReturnToMap) onReturnToMap()
    else navigate('/map')
  }

  const completedColor = levelColor(level)
  const nextColor = levelColor(level + 1)
  const whyMessage = getWhyMessage(myWhy)

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto flex flex-col">
      {/* Confetti canvas — fixed, full-screen, non-interactive */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[60] w-full h-full"
      />

      <div className="relative z-[61] flex flex-col items-center min-h-screen px-4 py-12 max-w-lg mx-auto w-full">

        {/* ── Stage 1: Checkmark hero ── */}
        <CheckmarkHero />

        {/* ── Stage 2: Summary card (slides up from below) ── */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              key="summary-card"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.1 }}
              className="w-full mt-8"
            >
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden">
                {/* Card header */}
                <div
                  className="px-5 py-4 border-b border-border-subtle"
                  style={{ background: `${completedColor}10` }}
                >
                  <p className="text-[11px] font-mono uppercase tracking-widest mb-0.5" style={{ color: completedColor }}>
                    Level {level} Complete
                  </p>
                  <h2 className="font-display font-bold text-xl text-text-primary">
                    {locationName}
                  </h2>
                </div>

                {/* Animated stats */}
                <div className="px-5 py-1 divide-y divide-border-subtle">
                  <StatRow
                    value={stats.vocabWords}
                    suffix=" words"
                    label="Vocabulary words learned"
                    active={stage >= 2}
                    delay={0.05}
                    color="#4A9EFF"
                  />
                  <StatRow
                    value={stats.grammarRules}
                    suffix=" rules"
                    label="Grammar rules mastered"
                    active={stage >= 2}
                    delay={0.18}
                    color="#F5B014"
                  />
                  <StatRow
                    value={stats.daysCompleted}
                    suffix=" days"
                    label="Days completed"
                    active={stage >= 2}
                    delay={0.31}
                    color="#2ECC71"
                  />
                  <StatRow
                    value={stats.feynmanImprovement}
                    suffix="%"
                    label="Feynman clarity improved since Day 1"
                    active={stage >= 2}
                    delay={0.44}
                    color="#E94560"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stage 3: My Why message ── */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              key="why-message"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full mt-5"
            >
              <div className="bg-brand-gold/5 border border-brand-gold/25 rounded-2xl px-5 py-4 flex items-start gap-3">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.15 }}
                  className="text-xl shrink-0 mt-0.5"
                >
                  💛
                </motion.span>
                <div>
                  <p className="text-[11px] font-mono text-brand-gold uppercase tracking-wider mb-1">
                    Your Why
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="text-sm font-body text-text-primary font-medium leading-relaxed"
                  >
                    {whyMessage}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stage 4: Mastery Map mini view ── */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              key="mini-map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full mt-5"
            >
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-5">
                <p className="text-[11px] font-mono text-text-muted uppercase tracking-widest mb-5">
                  Mastery Map — Updated
                </p>

                {/* Nodes + path */}
                <div className="flex items-start justify-center gap-0">
                  {/* Completed level */}
                  <MapNode
                    lvl={level}
                    name={locationName}
                    state="completed"
                    delay={0.1}
                  />

                  {/* Beam between them */}
                  <PathBeam
                    fromColor={completedColor}
                    toColor={nextColor}
                    active
                    delay={0.4}
                  />

                  {/* Next level */}
                  <MapNode
                    lvl={level + 1}
                    name={nextLevelName}
                    state="next"
                    delay={0.8}
                  />

                  {/* Further locked level (if not last) */}
                  {level + 2 <= 6 && (
                    <>
                      <PathBeam
                        fromColor={nextColor}
                        toColor={levelColor(level + 2)}
                        active={false}
                        delay={0}
                      />
                      <MapNode
                        lvl={level + 2}
                        name="…"
                        state="locked"
                        delay={0.9}
                      />
                    </>
                  )}
                </div>

                {/* Next level unlock label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="mt-4 flex items-center justify-center gap-2"
                >
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: nextColor }}
                  />
                  <p className="text-xs font-body text-text-secondary">
                    <span className="font-medium" style={{ color: nextColor }}>
                      Level {level + 1} — {nextLevelName}
                    </span>
                    {' '}is now unlocked
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stage 5: CTA buttons ── */}
        <AnimatePresence>
          {stage >= 5 && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full mt-6 flex flex-col gap-3"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleBegin}
              >
                Begin Level {level + 1} — {nextLevelName} →
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="w-full"
                onClick={handleReturnToMap}
              >
                Return to Map
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button — always visible after stage 1 */}
        <AnimatePresence>
          {stage >= 2 && stage < 5 && (
            <motion.button
              key="skip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8 }}
              onClick={() => setStage(5)}
              className="mt-8 text-xs font-mono text-text-muted hover:text-text-secondary transition-colors underline underline-offset-2"
            >
              Skip animation →
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
