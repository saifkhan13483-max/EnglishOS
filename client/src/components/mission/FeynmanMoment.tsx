import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useMissionStore, FeynmanResult } from '@/stores/missionStore'
import { useProgressStore } from '@/stores/progressStore'
import { getFeynmanPrompt } from '@/constants/scenarios'
import { useToast } from '@/hooks/useToast'

type InputTab = 'text' | 'voice'

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

function ScoreBar({
  label,
  value,
  color,
  active,
}: {
  label: string
  value: number
  color: string
  active: boolean
}) {
  const count = useCountUp(value, 1000, active)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-body text-text-muted">{label}</span>
        <span className="text-sm font-mono font-bold" style={{ color }}>
          {count}
        </span>
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
  const submitFeynmanResponse = useMissionStore((s) => s.submitFeynmanResponse)
  const completeMission = useMissionStore((s) => s.completeMission)
  const feynmanResult = useMissionStore((s) => s.feynmanResult)
  const isLoading = useMissionStore((s) => s.isLoading)
  const currentModule = useProgressStore((s) => s.learnerProfile?.currentModule ?? 2)
  const toast = useToast()

  const { concept, prompt } = getFeynmanPrompt(currentModule)

  const [tab, setTab] = useState<InputTab>('text')
  const [text, setText] = useState('')
  const [completing, setCompleting] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const result: FeynmanResult | null = feynmanResult
  const showResult = !!result && !isLoading

  // Auto-scroll to results when they appear
  useEffect(() => {
    if (showResult) {
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
    }
  }, [showResult])

  async function handleEvaluate() {
    if (!text.trim()) return
    try {
      await submitFeynmanResponse(text)
    } catch {
      toast.error('Could not evaluate your response. Please try again.')
    }
  }

  async function handleComplete() {
    setCompleting(true)
    try {
      await completeMission({ feynmanScore: result?.scores.overall })
    } catch {
      toast.warning('Mission results could not be saved, but your progress is safe.')
    } finally {
      setCompleting(false)
      onComplete()
    }
  }

  return (
    <div className="flex flex-col gap-6 py-8 px-4 max-w-lg mx-auto w-full">
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 4</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Feynman Moment</h2>
        <p className="text-sm text-text-muted mt-1">Explain It Simply</p>
      </div>

      <div className="flex justify-center">
        <Badge variant="blue" size="sm">📚 {concept}</Badge>
      </div>

      <div className="bg-brand-red/5 border border-brand-red/30 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0">🧠</span>
          <div>
            <p className="text-xs font-mono text-brand-red uppercase tracking-wider mb-2">Your Prompt</p>
            <p className="text-text-primary text-base font-body leading-relaxed">{prompt}</p>
          </div>
        </div>
      </div>

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

      {tab === 'text' ? (
        <textarea
          className="w-full h-36 bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm resize-none outline-none focus:border-brand-red transition-colors placeholder:text-text-muted font-body"
          placeholder="Write your explanation here in simple English…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading || !!result}
        />
      ) : (
        <div className="bg-bg-secondary border border-border-subtle rounded-xl px-4 py-8 flex flex-col items-center gap-3">
          <span className="text-4xl">🎤</span>
          <p className="text-sm text-text-muted font-body text-center">Voice input coming in v2.0</p>
          <Badge variant="muted" size="sm">Coming soon</Badge>
        </div>
      )}

      {!result && (
        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={tab === 'text' ? !text.trim() : true}
            loading={isLoading}
            onClick={handleEvaluate}
          >
            {isLoading ? 'Checking your explanation…' : 'Evaluate My Explanation'}
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="w-full text-text-muted"
            disabled={isLoading}
            onClick={handleComplete}
          >
            Skip for now
          </Button>
        </div>
      )}

      <AnimatePresence>
        {showResult && result && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Your Scores</p>
                <span className="text-sm font-mono font-bold text-brand-gold">
                  Overall: {result.scores.overall}
                </span>
              </div>
              <ScoreBar label="Vocabulary (40%)" value={result.scores.vocabulary} color="#4A9EFF" active={showResult} />
              <ScoreBar label="Simplicity (35%)"  value={result.scores.simplicity}  color="#2ECC71" active={showResult} />
              <ScoreBar label="Relevance (25%)"   value={result.scores.relevance}   color="#F5B014" active={showResult} />
            </div>

            <div className="bg-bg-tertiary border border-border-subtle rounded-2xl p-5">
              <p className="text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Feedback</p>
              <p className="text-sm text-text-secondary leading-relaxed">{result.feedback}</p>
            </div>

            {result.suggestion && (
              <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-5">
                <p className="text-xs font-mono text-brand-blue mb-2 uppercase tracking-wider">Suggestion</p>
                <p className="text-sm text-text-secondary leading-relaxed">{result.suggestion}</p>
              </div>
            )}

            {result.knowledgeGaps.length > 0 && (
              <div className="bg-brand-red/5 border border-brand-red/20 rounded-2xl p-5">
                <p className="text-xs font-mono text-brand-red mb-3 uppercase tracking-wider">
                  Knowledge Gaps — Added to Review Queue
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.knowledgeGaps.map((word) => (
                    <Badge key={word} variant="red" size="md">{word}</Badge>
                  ))}
                </div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 360, damping: 22 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                loading={completing}
                onClick={handleComplete}
              >
                🎉 Complete Mission
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
