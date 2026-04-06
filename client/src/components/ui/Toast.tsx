import { AnimatePresence, motion } from 'framer-motion'
import { useToastStore } from '@/hooks/useToast'

const VARIANT_CONFIG = {
  success: {
    bar:  'bg-brand-green',
    icon: 'text-brand-green',
    border: 'border-brand-green/30',
    bg: 'bg-bg-secondary',
    symbol: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    bar:  'bg-brand-red',
    icon: 'text-brand-red',
    border: 'border-brand-red/30',
    bg: 'bg-bg-secondary',
    symbol: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  info: {
    bar:  'bg-brand-blue',
    icon: 'text-brand-blue',
    border: 'border-brand-blue/30',
    bg: 'bg-bg-secondary',
    symbol: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  warning: {
    bar:  'bg-brand-gold',
    icon: 'text-brand-gold',
    border: 'border-brand-gold/30',
    bg: 'bg-bg-secondary',
    symbol: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const cfg = VARIANT_CONFIG[toast.variant]
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 56, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 56, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
              className={`pointer-events-auto relative overflow-hidden flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg w-72 max-w-[90vw] ${cfg.bg} ${cfg.border}`}
            >
              <span className={`shrink-0 mt-0.5 ${cfg.icon}`}>{cfg.symbol}</span>
              <p className="text-sm font-body text-text-primary flex-1 leading-snug pr-1">
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-text-muted hover:text-text-primary transition-colors mt-0.5"
                aria-label="Dismiss"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <motion.div
                className={`absolute bottom-0 left-0 h-0.5 ${cfg.bar}`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
