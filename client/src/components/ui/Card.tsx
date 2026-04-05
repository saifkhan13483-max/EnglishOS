import { motion, HTMLMotionProps } from 'framer-motion'

type CardVariant = 'default' | 'power-pack'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant
  padding?: CardPadding
  children: React.ReactNode
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...rest
}: CardProps) {
  const isPowerPack = variant === 'power-pack'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={[
        'relative bg-bg-tertiary rounded-2xl border transition-colors duration-200',
        isPowerPack ? 'border-brand-gold' : 'border-border-subtle',
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {isPowerPack && (
        <div className="absolute top-3 right-3">
          <PowerPackCornerBadge />
        </div>
      )}
      {children}
    </motion.div>
  )
}

function PowerPackCornerBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-gold/10 border border-brand-gold text-brand-gold text-xs font-display font-semibold">
      <span>⭐</span>
      <span>Power Pack</span>
    </span>
  )
}

export default Card
