import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import LevelWrapCeremony from '@/components/mission/LevelWrapCeremony'
import { useProgressStore } from '@/stores/progressStore'
import { trackEvent } from '@/utils/analytics'

// ── Question types & data ─────────────────────────────────────────────────────

type QuestionType = 'vocab' | 'grammar' | 'sentence'

interface Question {
  id: number
  type: QuestionType
  prompt: string
  hint: string
  answer?: string
  options?: string[]
  correct?: number
  sentence?: string
  isCorrect?: boolean
}

const QUESTIONS: Question[] = [
  {
    id: 1, type: 'vocab',
    prompt: 'Type the English meaning of: "yaad karna"',
    hint: 'Think about when you try to recall something from the past.',
    answer: 'remember',
  },
  {
    id: 2, type: 'grammar',
    prompt: 'Which sentence is grammatically correct?',
    hint: 'Remember the SVO formula and the negative rule.',
    options: [
      'She do not go to school.',
      'She does not go to school.',
      'She not does go to school.',
      'She is not go to school.',
    ],
    correct: 1,
  },
  {
    id: 3, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'Check the subject-verb agreement rule.',
    sentence: 'He are my friend.',
    isCorrect: false,
  },
  {
    id: 4, type: 'vocab',
    prompt: 'Type the English meaning of: "samajhna"',
    hint: 'Think about when something becomes clear in your mind.',
    answer: 'understand',
  },
  {
    id: 5, type: 'grammar',
    prompt: 'Which word completes the sentence correctly? "I ___ very happy today."',
    hint: 'Remember: "am" goes with "I".',
    options: ['is', 'are', 'am', 'be'],
    correct: 2,
  },
  {
    id: 6, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'Check: does "They" need "do not" or "does not"?',
    sentence: 'They do not like cold weather.',
    isCorrect: true,
  },
  {
    id: 7, type: 'vocab',
    prompt: 'Type the English meaning of: "koshish karna"',
    hint: 'Think about making effort toward a goal.',
    answer: 'try',
  },
  {
    id: 8, type: 'grammar',
    prompt: 'Which sentence asks a correct question?',
    hint: 'Questions start with Do/Does/Is/Are.',
    options: [
      'You do like tea?',
      'Like you tea?',
      'Do you like tea?',
      'You like tea do?',
    ],
    correct: 2,
  },
  {
    id: 9, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'Think about the SVO formula. Is the word order right?',
    sentence: 'Eats she rice every day.',
    isCorrect: false,
  },
  {
    id: 10, type: 'vocab',
    prompt: 'Type the English meaning of: "seekhna"',
    hint: 'Think about gaining new knowledge or skill.',
    answer: 'learn',
  },
]

const PASS_THRESHOLD = 70

// ── Utility ───────────────────────────────────────────────────────────────────
function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    ref.current = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000)
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [])

  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  const formatted = `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
  return { remaining, formatted }
}

// ── Question card ─────────────────────────────────────────────────────────────
function VocabQuestion({ question, onAnswer }: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')

  function check() {
    const correct = input.trim().toLowerCase() === question.answer!.toLowerCase()
    setStatus(correct ? 'correct' : 'wrong')
    setTimeout(() => { setStatus('idle'); setInput(''); onAnswer(correct) }, 1100)
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        autoFocus
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && input.trim() && status === 'idle' && check()}
        placeholder="Type your answer…"
        disabled={status !== 'idle'}
        className={[
          'w-full bg-bg-tertiary border rounded-xl px-4 py-3 text-base font-body text-text-primary placeholder:text-text-muted focus:outline-none transition-all',
          status === 'correct' ? 'border-brand-green bg-brand-green/5' :
          status === 'wrong'   ? 'border-brand-red bg-brand-red/5' :
          'border-border-subtle focus:border-brand-blue',
        ].join(' ')}
      />
      {status !== 'idle' && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm font-body text-center ${status === 'correct' ? 'text-brand-green' : 'text-brand-red'}`}
        >
          {status === 'correct' ? `✓ Correct! "${question.answer}"` : `✗ The answer is "${question.answer}"`}
        </motion.p>
      )}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!input.trim() || status !== 'idle'}
        onClick={check}
      >
        Check Answer
      </Button>
    </div>
  )
}

function GrammarQuestion({ question, onAnswer }: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)

  function choose(i: number) {
    if (locked) return
    setSelected(i)
    setLocked(true)
    const correct = i === question.correct
    setTimeout(() => { setSelected(null); setLocked(false); onAnswer(correct) }, 1200)
  }

  return (
    <div className="flex flex-col gap-3">
      {question.options!.map((opt, i) => {
        const isSelected = selected === i
        const isCorrect  = i === question.correct
        const style =
          !locked || !isSelected ? 'border-border-subtle hover:border-brand-blue hover:bg-brand-blue/5' :
          isCorrect ? 'border-brand-green bg-brand-green/5 text-brand-green' :
                      'border-brand-red bg-brand-red/5 text-brand-red'

        return (
          <motion.button
            key={i}
            whileTap={locked ? {} : { scale: 0.98 }}
            onClick={() => choose(i)}
            disabled={locked}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-body transition-all ${style} ${locked && !isSelected ? 'opacity-40' : ''}`}
          >
            <span className="font-mono text-text-muted mr-3">{String.fromCharCode(65 + i)}.</span>
            {opt}
          </motion.button>
        )
      })}
    </div>
  )
}

function SentenceQuestion({ question, onAnswer }: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const [status, setStatus] = useState<'idle' | 'done'>('idle')

  function choose(userSaysCorrect: boolean) {
    if (status !== 'idle') return
    setStatus('done')
    const correct = userSaysCorrect === question.isCorrect
    setTimeout(() => { setStatus('idle'); onAnswer(correct) }, 1000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-4 py-4 text-center">
        <p className="font-display font-bold text-text-primary text-lg leading-snug">
          "{question.sentence}"
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant={status === 'done' && !question.isCorrect ? 'primary' : 'secondary'}
          size="lg"
          className="flex-1"
          disabled={status !== 'idle'}
          onClick={() => choose(false)}
        >
          ✗ Incorrect
        </Button>
        <Button
          variant={status === 'done' && question.isCorrect ? 'primary' : 'secondary'}
          size="lg"
          className="flex-1"
          disabled={status !== 'idle'}
          onClick={() => choose(true)}
        >
          ✓ Correct
        </Button>
      </div>
    </div>
  )
}

// ── Badge for question type ───────────────────────────────────────────────────
const TYPE_LABELS: Record<QuestionType, { label: string; color: string }> = {
  vocab:    { label: 'Vocabulary Recall',   color: '#4A9EFF' },
  grammar:  { label: 'Grammar Rule',        color: '#F5B014' },
  sentence: { label: 'Sentence Check',      color: '#2ECC71' },
}

// ── Score reveal ──────────────────────────────────────────────────────────────
function ScoreReveal({ correct, total, wrongIds, onRetry, onPass }: {
  correct: number
  total: number
  wrongIds: number[]
  onRetry: () => void
  onPass: () => void
}) {
  const pct = Math.round((correct / total) * 100)
  const passed = pct >= PASS_THRESHOLD
  const { formatted } = useCountdown(24 * 60 * 60)

  const wrongModules = [
    ...new Set(wrongIds.map(id => {
      const q = QUESTIONS.find(q => q.id === id)
      if (!q) return null
      if (q.type === 'vocab')    return 'Vocabulary — Core 100 Words'
      if (q.type === 'grammar')  return 'Grammar — Sentence Formation'
      if (q.type === 'sentence') return 'Sentence Identification'
      return null
    }).filter(Boolean))
  ] as string[]

  return (
    <motion.div
      key="score-reveal"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="flex flex-col items-center gap-6 py-4"
    >
      {/* Score circle */}
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="#2A2A3E" strokeWidth="12" />
          <motion.circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke={passed ? '#2ECC71' : '#E94560'}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 70}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - pct / 100) }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            transform="rotate(-90 80 80)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-4xl" style={{ color: passed ? '#2ECC71' : '#E94560' }}>
            {pct}%
          </span>
          <span className="text-xs font-mono text-text-muted mt-0.5">{correct}/{total} correct</span>
        </div>
      </div>

      {passed ? (
        <>
          <div className="text-center">
            <p className="font-display font-bold text-text-primary text-2xl mb-1">Level Gate Passed! 🎉</p>
            <p className="text-sm text-text-secondary font-body">
              You have proven your mastery of Level 1 — Base Camp.
            </p>
          </div>
          <Button variant="primary" size="lg" className="w-full max-w-sm" onClick={onPass}>
            Begin Level Wrap →
          </Button>
        </>
      ) : (
        <>
          <div className="text-center">
            <p className="font-display font-bold text-text-primary text-2xl mb-1">Not Quite Yet</p>
            <p className="text-sm text-text-secondary font-body">
              You need {PASS_THRESHOLD}% to pass. Review the modules below and try again.
            </p>
          </div>

          {wrongModules.length > 0 && (
            <div className="w-full max-w-sm bg-bg-secondary border border-border-subtle rounded-2xl p-4">
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Modules to Review</p>
              <div className="flex flex-col gap-2">
                {wrongModules.map(m => (
                  <div key={m} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                    <span className="text-sm font-body text-text-secondary">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-brand-red/10 border border-brand-red/30 rounded-2xl px-4 py-3 w-full max-w-sm text-center">
            <p className="text-xs font-mono text-brand-red uppercase tracking-wider mb-1">24-Hour Cooldown</p>
            <p className="font-display font-bold text-text-primary text-xl">{formatted}</p>
            <p className="text-xs text-text-muted mt-1 font-body">until next attempt</p>
          </div>

          <Button variant="secondary" size="lg" className="w-full max-w-sm" onClick={onRetry}>
            ← Go Back and Review
          </Button>
        </>
      )}
    </motion.div>
  )
}

// ── Level metadata ─────────────────────────────────────────────────────────────

const LEVEL_NAMES: Record<number, string> = {
  1: 'Base Camp',
  2: 'Village',
  3: 'Town',
  4: 'City',
  5: 'Capital',
  6: 'World Stage',
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LevelGate() {
  const navigate = useNavigate()
  const learnerProfile = useProgressStore(s => s.learnerProfile)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showHint, setShowHint] = useState(false)
  const [done, setDone] = useState(false)
  const [wrongIds, setWrongIds] = useState<number[]>([])
  const [showCeremony, setShowCeremony] = useState(false)

  const current = QUESTIONS[currentIdx]
  const total   = QUESTIONS.length
  const pct     = Math.round((currentIdx / total) * 100)

  function handleAnswer(correct: boolean) {
    const newAnswers = [...answers, correct]
    setAnswers(newAnswers)
    setShowHint(false)

    if (!correct) setWrongIds(prev => [...prev, current.id])

    if (currentIdx + 1 >= total) {
      const finalCorrect = newAnswers.filter(Boolean).length
      const pctFinal = Math.round((finalCorrect / total) * 100)
      const passed = pctFinal >= PASS_THRESHOLD

      trackEvent('level_gate_attempted', { score_pct: pctFinal, correct: finalCorrect, total })
      if (passed) {
        trackEvent('level_gate_passed', { score_pct: pctFinal })
      } else {
        trackEvent('level_gate_failed', { score_pct: pctFinal, wrong_count: total - finalCorrect })
      }

      setDone(true)
    } else {
      setCurrentIdx(i => i + 1)
    }
  }

  const correctCount = answers.filter(Boolean).length

  // Show the ceremony overlay when the gate is passed
  if (showCeremony) {
    const level = learnerProfile?.currentLevel ?? 1
    return (
      <LevelWrapCeremony
        level={level}
        locationName={LEVEL_NAMES[level] ?? `Level ${level}`}
        stats={{
          vocabWords: 100,
          grammarRules: 12,
          daysCompleted: learnerProfile?.dayNumber ?? 30,
          feynmanImprovement: 34,
        }}
        myWhy={learnerProfile?.why ?? 'Career Growth'}
        nextLevelName={LEVEL_NAMES[level + 1] ?? `Level ${level + 1}`}
        onBegin={() => navigate('/dashboard')}
        onReturnToMap={() => navigate('/map')}
      />
    )
  }

  if (done) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <div className="w-full h-1 bg-bg-tertiary">
          <div className="h-full bg-brand-green transition-all duration-700" style={{ width: '100%' }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <ScoreReveal
            correct={correctCount}
            total={total}
            wrongIds={wrongIds}
            onRetry={() => navigate('/dashboard')}
            onPass={() => setShowCeremony(true)}
          />
        </div>
      </div>
    )
  }

  const typeInfo = TYPE_LABELS[current.type]

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col font-body">
      {/* Progress bar */}
      <div className="w-full h-1 bg-bg-tertiary">
        <motion.div
          className="h-full bg-brand-blue"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-text-muted hover:text-text-primary transition-colors p-1"
          aria-label="Exit gate"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Level 1 Gate</p>
          <p className="text-xs font-mono text-text-secondary">Prove Your Mastery</p>
        </div>
        <span className="text-xs font-mono text-text-muted">{currentIdx + 1}/{total}</span>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Type badge */}
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: typeInfo.color }}
              />
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: typeInfo.color }}>
                {typeInfo.label}
              </span>
            </div>

            {/* Prompt */}
            <h2 className="font-display font-bold text-text-primary text-xl leading-snug">
              {current.prompt}
            </h2>

            {/* Question input */}
            {current.type === 'vocab'    && <VocabQuestion    question={current} onAnswer={handleAnswer} />}
            {current.type === 'grammar'  && <GrammarQuestion  question={current} onAnswer={handleAnswer} />}
            {current.type === 'sentence' && <SentenceQuestion question={current} onAnswer={handleAnswer} />}

            {/* Hint toggle */}
            <div>
              <button
                className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono underline underline-offset-2"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-text-muted font-body mt-2 leading-relaxed"
                  >
                    💡 {current.hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom progress indicator */}
      <div className="px-4 pb-6 pt-2 flex justify-center gap-1.5 max-w-lg mx-auto w-full">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={[
              'h-1 flex-1 rounded-full transition-all duration-300',
              i < currentIdx ? 'bg-brand-blue' :
              i === currentIdx ? 'bg-brand-blue/40' :
              'bg-bg-tertiary',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
