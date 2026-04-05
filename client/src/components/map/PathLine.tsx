import { motion } from 'framer-motion'

export type PathStatus = 'complete' | 'upcoming' | 'locked'

interface PathLineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  status: PathStatus
}

const COMPLETE_COLOR  = '#2ECC71'
const UPCOMING_COLOR  = '#4A9EFF'
const LOCKED_COLOR    = '#2A2A3E'

export default function PathLine({ x1, y1, x2, y2, status }: PathLineProps) {
  const isComplete = status === 'complete'
  const isUpcoming = status === 'upcoming'

  const pathLength = Math.hypot(x2 - x1, y2 - y1)

  return (
    <g>
      {/* Base line */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isComplete ? COMPLETE_COLOR : isUpcoming ? UPCOMING_COLOR : LOCKED_COLOR}
        strokeWidth={isLocked(status) ? 1.2 : 2}
        strokeDasharray={isComplete ? 'none' : '5 7'}
        strokeLinecap="round"
        opacity={isLocked(status) ? 0.5 : 1}
      />

      {/* Shimmer overlay for complete segments */}
      {isComplete && (
        <motion.line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={`${pathLength * 0.15} ${pathLength}`}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -pathLength * 1.5 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          opacity={0.5}
        />
      )}

      {/* Animated dash for upcoming segments */}
      {isUpcoming && (
        <motion.line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={UPCOMING_COLOR}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="5 7"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -24 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          opacity={0.6}
        />
      )}
    </g>
  )
}

function isLocked(s: PathStatus): boolean {
  return s === 'locked'
}
