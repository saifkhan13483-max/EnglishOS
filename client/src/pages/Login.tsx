import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/map')
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
          <h1 className="font-display font-bold text-xl text-text-primary">Welcome back</h1>
          <p className="text-sm text-text-muted mt-1">Continue your journey to fluency</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="••••••••"
              required
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-3.5 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full mt-1">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-blue hover:underline font-medium">
            Get started free
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
