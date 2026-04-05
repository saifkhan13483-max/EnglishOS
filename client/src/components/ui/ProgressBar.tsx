import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  color?: string
  label?: string
  animated?: boolean
  className?: string
}

function ProgressBar({
  value,
  color = '#4A9EFF',
  label,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={['w-full', className].join(' ')}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-body text-text-muted">{label}</span>
          <span className="text-xs font-mono text-text-secondary">{clamped}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden border border-border-subtle">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={
            animated
              ? { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  )
}

export default ProgressBar
