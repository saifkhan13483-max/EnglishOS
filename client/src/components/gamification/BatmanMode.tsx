import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BatmanModeActivationProps {
  onDismiss: () => void
}

export function BatmanModeActivation({ onDismiss }: BatmanModeActivationProps) {
  const [phase, setPhase] = useState<'sweep' | 'glow' | 'text' | 'button'>('sweep')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('glow'), 600)
    const t2 = setTimeout(() => setPhase('text'), 1400)
    const t3 = setTimeout(() => setPhase('button'), 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Dark sweep overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #000000 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Purple glow pulse */}
      <AnimatePresence>
        {(phase === 'glow' || phase === 'text' || phase === 'button') && (
          <motion.div
            key="glow"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3, 0.7, 0.4] }}
            transition={{ duration: 1.2, times: [0, 0.2, 0.4, 0.7, 1] }}
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.35) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Animated purple border rings */}
      <AnimatePresence>
        {(phase === 'glow' || phase === 'text' || phase === 'button') && (
          <>
            <motion.div
              key="ring1"
              className="absolute rounded-full border border-brand-purple/20 pointer-events-none"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: '120vw', height: '120vw', opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
            <motion.div
              key="ring2"
              className="absolute rounded-full border border-brand-purple/15 pointer-events-none"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: '80vw', height: '80vw', opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 max-w-lg text-center">
        {/* Batman icon */}
        <AnimatePresence>
          {(phase === 'text' || phase === 'button') && (
            <motion.div
              key="icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <motion.span
                className="text-7xl block"
                animate={{ filter: ['drop-shadow(0 0 0px #A855F7)', 'drop-shadow(0 0 24px #A855F7)', 'drop-shadow(0 0 12px #A855F7)'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                🦇
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text */}
        <AnimatePresence>
          {(phase === 'text' || phase === 'button') && (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              <motion.p
                className="font-mono text-xs uppercase tracking-[0.3em] text-brand-purple/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                7-Day Streak Unlocked
              </motion.p>
              <motion.h1
                className="font-display font-bold text-4xl md:text-5xl text-text-primary leading-tight"
                initial={{ opacity: 0, letterSpacing: '0.3em' }}
                animate={{ opacity: 1, letterSpacing: '0.02em' }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ textShadow: '0 0 30px rgba(168,85,247,0.5)' }}
              >
                BATMAN MODE
                <br />
                <span className="text-brand-purple">ACTIVATED.</span>
              </motion.h1>
              <motion.p
                className="font-body text-base text-text-secondary leading-relaxed mt-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                You planned ahead. That's the difference.
              </motion.p>
              <motion.p
                className="font-body text-sm text-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                You now have one Skip Day per week — use it wisely.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dismiss button */}
        <AnimatePresence>
          {phase === 'button' && (
            <motion.div
              key="btn"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xs"
            >
              <button
                onClick={onDismiss}
                className="w-full py-3 px-6 rounded-2xl font-body font-semibold text-sm text-white transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  boxShadow: '0 0 24px rgba(168,85,247,0.4)',
                }}
              >
                I am ready. Let's go. →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Particle flickers */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-purple pointer-events-none"
          style={{
            top: `${15 + Math.sin(i * 1.4) * 35 + 35}%`,
            left: `${10 + (i / 7) * 80}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: 2 + i * 0.2,
            delay: 0.8 + i * 0.15,
            repeat: Infinity,
            repeatDelay: 1 + i * 0.3,
          }}
        />
      ))}
    </motion.div>
  )
}

export default BatmanModeActivation
