import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg-primary font-body flex flex-col items-center justify-center px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-6 max-w-sm"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border border-border-subtle"
          style={{ backgroundColor: '#E9456015' }}
        >
          404
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-display font-bold text-2xl text-text-primary">
            Page not found
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            This page doesn't exist. Your journey continues on the map.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={() => navigate('/map')}
          >
            Go to Map
          </Button>
          <Button
            variant="ghost"
            size="md"
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
