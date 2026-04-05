import { motion } from 'framer-motion'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
}

function Toggle({ checked, onChange, label, disabled = false, className = '' }: ToggleProps) {
  return (
    <label
      className={[
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          'relative w-11 h-6 rounded-full border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
          checked
            ? 'bg-brand-red border-brand-red'
            : 'bg-bg-secondary border-border-strong',
        ].join(' ')}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-5 h-5 bg-text-primary rounded-full shadow-md"
          style={{ left: checked ? 'calc(100% - 1.375rem)' : '0.125rem' }}
        />
      </button>
      {label && (
        <span className="text-sm font-body text-text-secondary">{label}</span>
      )}
    </label>
  )
}

export default Toggle
