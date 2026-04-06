import { forwardRef } from 'react'
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-red text-text-primary border border-brand-red hover:brightness-110',
  secondary:
    'bg-transparent text-text-secondary border border-border-subtle hover:border-border-strong hover:text-text-primary',
  ghost:
    'bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:bg-bg-tertiary',
  danger:
    'bg-transparent text-brand-red border border-brand-red hover:bg-brand-red hover:text-text-primary',
}

/*
  All sizes enforce a minimum 44×44 px touch target (WCAG 2.5.5 / Apple HIG).
  sm and md previously fell short on height; min-h-[44px] fixes this without
  changing the visual padding on desktop.
*/
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5 min-h-[44px]',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2 min-h-[44px]',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5 min-h-[44px]',
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading
    const shouldReduceMotion = useReducedMotion()

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled || shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={isDisabled || shouldReduceMotion ? {} : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-body font-medium transition-colors duration-150 cursor-pointer select-none',
          variantClasses[variant],
          sizeClasses[size],
          isDisabled ? 'opacity-40 cursor-not-allowed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loading && <Spinner />}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
