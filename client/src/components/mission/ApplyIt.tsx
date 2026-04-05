import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const SCENARIO = {
  title: 'Real Situation',
  description: 'You are at a restaurant in Lahore. The waiter comes to your table. Order a meal and a drink in English.',
  hint: 'Use words like: I want, please, thank you',
  modelResponse: 'I want chicken biryani and one cold water, please. How much is that?',
  modelNotes: 'Notice: "I want" (chahna), "please" for politeness, clear item names, and a follow-up question.',
}

interface ApplyItProps {
  onComplete: () => void
}

export default function ApplyIt({ onComplete }: ApplyItProps) {
  const [response,    setResponse]    = useState('')
  const [submitted,   setSubmitted]   = useState(false)
  const [assessment,  setAssessment]  = useState<'up' | 'down' | null>(null)

  function handleSubmit() {
    if (!response.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col gap-6 py-8 px-4 max-w-lg mx-auto w-full">
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 3</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Apply It — Real Situation</h2>
      </div>

      {/* Scenario card */}
      <div className="bg-bg-secondary border border-brand-gold/30 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🍽️</span>
          <span className="text-xs font-mono text-brand-gold uppercase tracking-wider">Scenario</span>
        </div>
        <p className="text-text-primary text-base font-body leading-relaxed">{SCENARIO.description}</p>
        <p className="text-xs text-text-muted mt-3 font-mono">{SCENARIO.hint}</p>
      </div>

      {/* Response input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-body font-medium text-text-secondary">
          Your response in English
        </label>
        <textarea
          className="w-full h-28 bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm resize-none outline-none focus:border-brand-red transition-colors placeholder:text-text-muted font-body"
          placeholder="Type your response here…"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          disabled={submitted}
        />
      </div>

      {!submitted && (
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!response.trim()}
          onClick={handleSubmit}
        >
          Submit Response
        </Button>
      )}

      {/* Model response + self-assessment */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Model response */}
            <div className="bg-brand-green/5 border border-brand-green/30 rounded-2xl p-5">
              <p className="text-xs font-mono text-brand-green mb-2 uppercase tracking-wider">Model Response</p>
              <p className="text-text-primary text-sm leading-relaxed italic">"{SCENARIO.modelResponse}"</p>
              <p className="text-xs text-text-muted mt-3 leading-relaxed">{SCENARIO.modelNotes}</p>
            </div>

            {/* Self-assessment */}
            <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-5">
              <p className="text-sm font-body font-medium text-text-secondary mb-4 text-center">
                How did you do?
              </p>
              <div className="flex gap-4 justify-center mb-4">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setAssessment('up')}
                  className={[
                    'flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border-2 transition-colors cursor-pointer',
                    assessment === 'up'
                      ? 'border-brand-green bg-brand-green/10'
                      : 'border-border-subtle hover:border-brand-green/50',
                  ].join(' ')}
                >
                  <span className="text-3xl">👍</span>
                  <span className={`text-xs font-mono ${assessment === 'up' ? 'text-brand-green' : 'text-text-muted'}`}>
                    Got it!
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setAssessment('down')}
                  className={[
                    'flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border-2 transition-colors cursor-pointer',
                    assessment === 'down'
                      ? 'border-brand-red bg-brand-red/10'
                      : 'border-border-subtle hover:border-brand-red/50',
                  ].join(' ')}
                >
                  <span className="text-3xl">👎</span>
                  <span className={`text-xs font-mono ${assessment === 'down' ? 'text-brand-red' : 'text-text-muted'}`}>
                    Need practice
                  </span>
                </motion.button>
              </div>

              <AnimatePresence>
                {assessment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-text-muted text-center font-mono mb-4">
                      {assessment === 'up'
                        ? '✓ Great — this word goes to your 7-day review queue.'
                        : '✗ Noted — this scenario moves to tomorrow\'s warm-up.'}
                    </p>
                    <Button variant="primary" size="lg" className="w-full" onClick={onComplete}>
                      Continue to Feynman Moment →
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
