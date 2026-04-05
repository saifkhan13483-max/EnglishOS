import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  content: string
  children: React.ReactNode
  className?: string
}

function Tooltip({ content, children, className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={['relative inline-flex', className].join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
          >
            <div className="relative px-3 py-1.5 rounded-lg bg-bg-secondary border border-border-strong text-text-secondary text-xs font-body whitespace-nowrap shadow-xl">
              {content}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border-strong" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tooltip
