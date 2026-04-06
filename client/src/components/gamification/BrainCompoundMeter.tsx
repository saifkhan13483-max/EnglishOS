import { motion, AnimatePresence } from 'framer-motion'

interface BrainCompoundMeterProps {
  value: number           // 0–100
  size: 'mini' | 'full'
}

export default function BrainCompoundMeter({ value, size }: BrainCompoundMeterProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)))
  const isFull = clamped >= 100

  if (size === 'mini') {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm leading-none">🧠</span>
        <div className="relative w-20 h-1.5 bg-bg-secondary rounded-full overflow-hidden border border-border-subtle">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: isFull
                ? 'linear-gradient(90deg, #F5B014, #FBBF24)'
                : 'linear-gradient(90deg, #2ECC71, #4A9EFF)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${clamped}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {isFull && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0px 0px rgba(245,176,20,0)',
                  '0 0 6px 2px rgba(245,176,20,0.6)',
                  '0 0 0px 0px rgba(245,176,20,0)',
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
        </div>
        <span className="text-xs font-mono text-text-muted">{clamped}%</span>
      </div>
    )
  }

  // ── Full variant ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-3">
      {/* Deep Mission badge */}
      <AnimatePresence>
        {isFull && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center justify-center"
          >
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs font-bold uppercase tracking-wider"
              style={{
                background: 'rgba(245,176,20,0.12)',
                borderColor: 'rgba(245,176,20,0.5)',
                color: '#F5B014',
              }}
              animate={{
                boxShadow: [
                  '0 0 0px 0px rgba(245,176,20,0)',
                  '0 0 12px 4px rgba(245,176,20,0.35)',
                  '0 0 0px 0px rgba(245,176,20,0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>⚡</span>
              <span>Deep Mission Unlocked!</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Label row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider">
            Brain Compound Meter
          </p>
          <p className="text-sm text-text-secondary font-body mt-0.5">
            This meter fills only through real review — it reflects your actual retention.
          </p>
        </div>
        <motion.span
          key={clamped}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="font-display font-bold text-xl ml-4 shrink-0"
          style={{ color: isFull ? '#F5B014' : '#2ECC71' }}
        >
          {clamped}%
        </motion.span>
      </div>

      {/* Bar */}
      <div className="relative h-3 bg-bg-tertiary rounded-full overflow-hidden border border-border-subtle">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isFull
              ? 'linear-gradient(90deg, #F5B014, #FBBF24)'
              : 'linear-gradient(90deg, #2ECC71, #4A9EFF)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {isFull && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 0px 0px rgba(245,176,20,0)',
                '0 0 10px 4px rgba(245,176,20,0.5)',
                '0 0 0px 0px rgba(245,176,20,0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  )
}
