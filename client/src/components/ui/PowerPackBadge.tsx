import { motion } from 'framer-motion'

interface PowerPackBadgeProps {
  className?: string
}

function PowerPackBadge({ className = '' }: PowerPackBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      whileHover={{ scale: 1.05 }}
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
        'bg-brand-gold/10 border border-brand-gold/40',
        'text-brand-gold text-xs font-display font-semibold',
        'shadow-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="shrink-0"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      Power Pack
    </motion.span>
  )
}

export default PowerPackBadge
