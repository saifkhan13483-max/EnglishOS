import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/onboarding')
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
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-3.5 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full mt-1">
            Create Account
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
