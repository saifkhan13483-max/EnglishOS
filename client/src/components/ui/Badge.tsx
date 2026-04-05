import { motion } from 'framer-motion'

type BadgeVariant = 'red' | 'blue' | 'gold' | 'green' | 'muted'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  red: 'bg-brand-red/15 text-brand-red border border-brand-red/30',
  blue: 'bg-brand-blue/15 text-brand-blue border border-brand-blue/30',
  gold: 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30',
  green: 'bg-brand-green/15 text-brand-green border border-brand-green/30',
  muted: 'bg-bg-tertiary text-text-muted border border-border-subtle',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

function Badge({
  variant = 'muted',
  size = 'md',
  children,
  className = '',
}: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
      className={[
        'inline-flex items-center gap-1 rounded-full font-body font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </motion.span>
  )
}

export default Badge
