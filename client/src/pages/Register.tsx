import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'
import { ApiError } from '@/services/api'
import { useToast } from '@/hooks/useToast'

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (password.length === 0) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 8)  score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: 'Weak',   color: '#E94560' }
  if (score <= 2) return { score, label: 'Fair',   color: '#F5B014' }
  if (score <= 3) return { score, label: 'Good',   color: '#4A9EFF' }
  return             { score, label: 'Strong', color: '#2ECC71' }
}

export default function Register() {
  const navigate  = useNavigate()
  const register  = useAuthStore((s) => s.register)
  const toast     = useToast()

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const strength = useMemo(() => getPasswordStrength(password), [password])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password.length < 8) {
      const msg = 'Password must be at least 8 characters.'
      setError(msg)
      toast.warning(msg)
      return
    }
    setLoading(true)
    try {
      await register(email, password, name)
      navigate('/onboarding', { replace: true })
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : 'Something went wrong. Please try again.'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary font-body flex flex-col items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm flex flex-col gap-6"
      >
        <div className="text-center">
          <Link to="/" className="inline-block font-display font-bold text-2xl text-text-primary mb-6">
            English<span className="text-brand-red">OS</span>
          </Link>
          <h1 className="font-display font-bold text-xl text-text-primary">Start your 300-day journey</h1>
          <p className="text-sm text-text-muted mt-1">Free to start. No credit card needed.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bilal Ahmed"
              required
              autoComplete="name"
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-3.5 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="bilal@example.com"
              required
              autoComplete="email"
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-3.5 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 characters"
              minLength={8}
              required
              autoComplete="new-password"
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-3.5 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors"
            />

            {/* Password strength indicator */}
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-col gap-1.5"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((segment) => (
                    <motion.div
                      key={segment}
                      className="h-1 flex-1 rounded-full"
                      animate={{
                        backgroundColor: segment <= strength.score ? strength.color : '#2A2A3E',
                      }}
                      transition={{ duration: 0.25 }}
                    />
                  ))}
                </div>
                <p className="text-xs font-mono" style={{ color: strength.color }}>
                  {strength.label}
                </p>
              </motion.div>
            )}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-brand-red font-body text-center bg-brand-red/10 border border-brand-red/30 rounded-xl px-4 py-2.5"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-1">
            {loading ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-blue hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
