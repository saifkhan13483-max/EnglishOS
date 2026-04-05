import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

export type NodeStatus = 'locked' | 'active' | 'complete'

export interface LevelNodeProps {
  level: number
  name: string
  totalDays: number
  currentDay?: number
  status: NodeStatus
  color: string
  onClick?: () => void
}

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function LevelNode({
  level, name, totalDays, currentDay = 0, status, color, onClick,
}: LevelNodeProps) {
  const isActive   = status === 'active'
  const isComplete = status === 'complete'
  const isLocked   = status === 'locked'
  const clickable  = isActive || isComplete

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {/* Circle */}
      <motion.button
        onClick={clickable ? onClick : undefined}
        whileHover={clickable ? { scale: 1.08 } : {}}
        whileTap={clickable   ? { scale: 0.95 } : {}}
        className={[
          'relative flex items-center justify-center rounded-full border-2 font-display font-bold text-2xl transition-colors duration-300',
          'w-20 h-20',
          isLocked   ? 'opacity-35 cursor-not-allowed border-border-subtle bg-bg-tertiary text-text-muted' : '',
          isActive   ? 'cursor-pointer' : '',
          isComplete ? 'cursor-pointer' : '',
        ].filter(Boolean).join(' ')}
        style={
          !isLocked
            ? { borderColor: color, backgroundColor: `${color}20`, color }
            : undefined
        }
      >
        {/* Active: pulsing glow rings */}
        {isActive && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              style={{ backgroundColor: color }}
            />
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              style={{ backgroundColor: color }}
            />
          </>
        )}

        {/* Complete: green glow */}
        {isComplete && (
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: `0 0 18px 4px ${color}80` }}
          />
        )}

        {/* Node content */}
        {isLocked   && <LockIcon />}
        {isComplete && <CheckIcon />}
        {isActive   && <span>{level}</span>}

        {/* Complete checkmark badge overlay */}
        {isComplete && (
          <span
            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-bg-primary"
            style={{ backgroundColor: color }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white"
              strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </motion.button>

      {/* Label */}
      <div className="flex flex-col items-center gap-1">
        <span
          className={`font-display font-semibold text-sm text-center leading-tight ${isLocked ? 'text-text-muted' : 'text-text-primary'}`}
        >
          {name}
        </span>
        <span className="text-xs font-mono text-text-muted">{totalDays} days</span>

        {isActive && (
          <Badge variant="red" size="sm">Day {currentDay} of {totalDays}</Badge>
        )}
        {isComplete && (
          <Badge variant="green" size="sm">Complete ✓</Badge>
        )}
        {isLocked && (
          <Badge variant="muted" size="sm">Locked</Badge>
        )}
      </div>
    </div>
  )
}
