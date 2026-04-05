import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge  from '@/components/ui/Badge'

type InputTab = 'text' | 'voice'

interface ScoreResult {
  clarity:    number
  vocabulary: number
  relevance:  number
  feedback:   string
  gaps:       string[]
}

const MOCK_RESULT: ScoreResult = {
  clarity:    82,
  vocabulary: 75,
  relevance:  90,
  feedback:   'Good explanation! You covered the main idea clearly. Try to include a real-life example next time to make it even simpler for a 10-year-old.',
  gaps:       ['they', 'them', 'us'],
}

const PROMPT = 'Explain what pronouns are as if you\'re telling a 10-year-old. Use simple English words.'
const CONCEPT = 'Pronouns — Module 2: Core 100 Words'

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setValue(Math.round(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [target, duration, active])
  return value
}

function ScoreBar({ label, value, color, active }: { label: string; value: number; color: string; active: boolean }) {
  const count = useCountUp(value, 1000, active)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-body text-text-muted">{label}</span>
        <span className="text-sm font-mono font-bold" style={{ color }}>{count}</span>
      </div>
      <div className="h-2 bg-bg-secondary rounded-full overflow-hidden border border-border-subtle">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={active ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        />
      </div>
    </div>
  )
}

interface FeynmanMomentProps {
  onComplete: () => void
}

export default function FeynmanMoment({ onComplete }: FeynmanMomentProps) {
  const [tab,       setTab]       = useState<InputTab>('text')
  const [text,      setText]      = useState('')
  const [loading,   setLoading]   = useState(false)
  const [result,    setResult]    = useState<ScoreResult | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  async function handleEvaluate() {
    if (!text.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2200))
    setLoading(false)
    setResult(MOCK_RESULT)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
  }

  const showResult = !!result && !loading

  return (
    <div className="flex flex-col gap-6 py-8 px-4 max-w-lg mx-auto w-full">
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 4</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Feynman Moment</h2>
        <p className="text-sm text-text-muted mt-1">Explain It Simply</p>
      </div>

      {/* Concept chip */}
      <div className="flex justify-center">
        <Badge variant="blue" size="sm">📚 {CONCEPT}</Badge>
      </div>

      {/* Prompt card */}
      <div className="bg-brand-red/5 border border-brand-red/30 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0">🧠</span>
          <div>
            <p className="text-xs font-mono text-brand-red uppercase tracking-wider mb-2">Your Prompt</p>
            <p className="text-text-primary text-base font-body leading-relaxed">{PROMPT}</p>
          </div>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex bg-bg-tertiary border border-border-subtle rounded-xl p-1 gap-1">
        {(['text', 'voice'] as InputTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              'flex-1 py-2 rounded-lg text-sm font-body font-medium transition-colors capitalize',
              tab === t ? 'bg-bg-secondary text-text-primary' : 'text-text-muted hover:text-text-secondary',
            ].join(' ')}
          >
            {t === 'text' ? '✏️ Text' : '🎤 Voice'}
          </button>
        ))}
      </div>

      {/* Input area */}
      {tab === 'text' ? (
        <textarea
          className="w-full h-36 bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm resize-none outline-none focus:border-brand-red transition-colors placeholder:text-text-muted font-body"
          placeholder="Write your explanation here in simple English…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading || !!result}
        />
      ) : (
        <div className="bg-bg-secondary border border-border-subtle rounded-xl px-4 py-8 flex flex-col items-center gap-3">
          <span className="text-4xl">🎤</span>
          <p className="text-sm text-text-muted font-body text-center">Voice input coming in v2.0</p>
          <Badge variant="muted" size="sm">Coming soon</Badge>
        </div>
      )}

      {/* Evaluate button */}
      {!result && (
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={tab === 'text' ? !text.trim() : true}
          loading={loading}
          onClick={handleEvaluate}
        >
          {loading ? 'Checking your explanation…' : 'Evaluate My Explanation'}
        </Button>
      )}

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Score card */}
            <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-5 flex flex-col gap-4">
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Your Scores</p>
              <ScoreBar label="Clarity"    value={MOCK_RESULT.clarity}    color="#2ECC71" active={showResult} />
              <ScoreBar label="Vocabulary" value={MOCK_RESULT.vocabulary} color="#4A9EFF" active={showResult} />
              <ScoreBar label="Relevance"  value={MOCK_RESULT.relevance}  color="#F5B014" active={showResult} />
            </div>

            {/* Feedback */}
            <div className="bg-bg-tertiary border border-border-subtle rounded-2xl p-5">
              <p className="text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Feedback</p>
              <p className="text-sm text-text-secondary leading-relaxed">{MOCK_RESULT.feedback}</p>
            </div>

            {/* Knowledge gaps */}
            {MOCK_RESULT.gaps.length > 0 && (
              <div className="bg-brand-red/5 border border-brand-red/20 rounded-2xl p-5">
                <p className="text-xs font-mono text-brand-red mb-3 uppercase tracking-wider">
                  Knowledge Gaps — Added to Review Queue
                </p>
                <div className="flex flex-wrap gap-2">
                  {MOCK_RESULT.gaps.map((word) => (
                    <Badge key={word} variant="red" size="md">{word}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Complete mission */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 360, damping: 22 }}
            >
              <Button variant="primary" size="lg" className="w-full" onClick={onComplete}>
                🎉 Complete Mission
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
