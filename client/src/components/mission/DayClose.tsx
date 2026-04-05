import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

// ── Mock summary data ────────────────────────────────────────────────────────
const SUMMARY = {
  xpToday:       150,
  streak:        7,
  brainCompound: 42,
  reviewCount:   8,
  reviewWords:   ['want', 'understand', 'remember'],
  userWhy:       'speaking English confidently at work',
}

// ── Animated number count-up hook ────────────────────────────────────────────
function useCountUp(target: number, duration: number) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const start = useCallback(() => {
    if (started.current) return
    started.current = true
    let begin: number | null = null
    const step = (ts: number) => {
      if (!begin) begin = ts
      const p = Math.min((ts - begin) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return { val, start }
}

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  icon, label, value, unit, color, delay,
}: {
  icon: string; label: string; value: number; unit?: string; color: string; delay: number
}) {
  const { val, start } = useCountUp(value, 900)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={start}
      className="flex-1 bg-bg-secondary border border-border-subtle rounded-2xl p-4 flex flex-col items-center gap-1.5 text-center"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-display text-2xl font-bold" style={{ color }}>
        {val}{unit}
      </span>
      <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{label}</span>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
interface DayCloseProps {
  onComplete?: () => void
}

export default function DayClose({ onComplete }: DayCloseProps) {
  const navigate    = useNavigate()
  const canvasRef   = useRef<HTMLCanvasElement>(null)

  // Fire confetti burst on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true })

    const burst = (opts?: confetti.Options) =>
      myConfetti({ particleCount: 120, spread: 80, origin: { y: 0.55 },
        colors: ['#E94560', '#4A9EFF', '#F5B014', '#2ECC71', '#FFFFFF'],
        gravity: 0.9, scalar: 1.1, ...opts })

    burst()
    const t1 = setTimeout(() => burst(), 500)
    const t2 = setTimeout(() => {
      myConfetti({ particleCount: 60, spread: 100, origin: { x: 0.1, y: 0.6 }, angle: 60 })
      myConfetti({ particleCount: 60, spread: 100, origin: { x: 0.9, y: 0.6 }, angle: 120 })
    }, 900)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  function handleReturn() {
    if (onComplete) onComplete()
    navigate('/dashboard')
  }

  return (
    <div className="relative min-h-screen bg-bg-primary flex flex-col items-center">
      {/* Confetti canvas (full-screen overlay, pointer-events none) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      />

      <div className="flex flex-col gap-6 py-8 px-4 max-w-lg mx-auto w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 280, damping: 20 }}
          className="text-center"
        >
          <div className="text-5xl mb-3">🎉</div>
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 4</p>
          <h2 className="font-display text-3xl font-bold text-text-primary">Mission Complete!</h2>
          <p className="text-sm text-brand-green font-body mt-1">
            Evening Mission — Day {SUMMARY.streak} ✓
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="flex gap-3">
          <StatCard icon="⭐" label="XP Today"    value={SUMMARY.xpToday}       unit=" XP" color="#F5B014" delay={0.2}  />
          <StatCard icon="🔥" label="Streak"      value={SUMMARY.streak}        unit="d"   color="#E94560" delay={0.35} />
          <StatCard icon="🧠" label="Brain %"     value={SUMMARY.brainCompound} unit="%"   color="#2ECC71" delay={0.5}  />
        </div>

        {/* Brain Compound Meter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="bg-bg-secondary border border-border-subtle rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider">
                Brain Compound Meter
              </p>
              <p className="text-sm text-text-secondary font-body mt-0.5">
                Retention building up daily
              </p>
            </div>
            <span className="font-display font-bold text-brand-green text-xl">
              {SUMMARY.brainCompound}%
            </span>
          </div>
          <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden border border-border-subtle">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #2ECC71, #4A9EFF)' }}
              initial={{ width: 0 }}
              animate={{ width: `${SUMMARY.brainCompound}%` }}
              transition={{ delay: 0.7, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </div>
        </motion.div>

        {/* Tomorrow's review */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="bg-bg-secondary border border-border-subtle rounded-2xl p-5"
        >
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">
            Tomorrow's Review
          </p>
          <p className="text-sm text-text-primary font-body mb-3">
            You have{' '}
            <span className="font-bold text-brand-blue">{SUMMARY.reviewCount} cards</span>{' '}
            to review tomorrow
          </p>
          <div className="flex flex-wrap gap-2">
            {SUMMARY.reviewWords.map(word => (
              <span
                key={word}
                className="px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-mono text-brand-blue"
              >
                {word}
              </span>
            ))}
            {SUMMARY.reviewCount > SUMMARY.reviewWords.length && (
              <span className="px-3 py-1 rounded-full bg-bg-tertiary border border-border-subtle text-xs font-mono text-text-muted">
                +{SUMMARY.reviewCount - SUMMARY.reviewWords.length} more
              </span>
            )}
          </div>
        </motion.div>

        {/* My Why */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="bg-brand-gold/5 border border-brand-gold/30 rounded-2xl p-5 flex items-start gap-3"
        >
          <span className="text-xl shrink-0">💛</span>
          <div>
            <p className="text-xs font-mono text-brand-gold uppercase tracking-wider mb-1">My Why</p>
            <p className="text-sm text-text-secondary font-body leading-relaxed">
              Every session brings you closer to{' '}
              <span className="text-text-primary font-medium">{SUMMARY.userWhy}</span>.
              Today you took one more step. Keep going.
            </p>
          </div>
        </motion.div>

        {/* Return button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, type: 'spring', stiffness: 320, damping: 22 }}
        >
          <Button variant="primary" size="lg" className="w-full" onClick={handleReturn}>
            Return to Map →
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
