import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { useUIStore, type WhyOption } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'
import { api, ApiError } from '@/services/api'
import SEO from '@/components/layout/SEO'

const TOTAL_STEPS = 5

const JOURNEY = [
  { level: 1, name: 'Base Camp',   days: 'Days 1–30',    color: '#E94560' },
  { level: 2, name: 'Village',     days: 'Days 31–75',   color: '#F5B014' },
  { level: 3, name: 'Town',        days: 'Days 76–120',  color: '#4A9EFF' },
  { level: 4, name: 'City',        days: 'Days 121–180', color: '#2ECC71' },
  { level: 5, name: 'Capital',     days: 'Days 181–240', color: '#A855F7' },
  { level: 6, name: 'World Stage', days: 'Days 241–300', color: '#F97316' },
]

const WHY_OPTIONS: { id: WhyOption; label: string; icon: string }[] = [
  { id: 'job-interview',     label: 'Job Interview',             icon: '💼' },
  { id: 'career-growth',     label: 'Career Growth',             icon: '📈' },
  { id: 'social-confidence', label: 'Social Confidence',         icon: '🤝' },
  { id: 'study-abroad',      label: 'Study Abroad',              icon: '🎓' },
  { id: 'family-abroad',     label: 'Talking to Family Abroad',  icon: '❤️' },
  { id: 'business',          label: 'Building a Business',       icon: '🚀' },
]

const MORNING_PRESETS = ['07:00', '08:00', '09:00']
const EVENING_PRESETS = ['19:00', '20:00', '21:00']

function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

function diagnoseLevel(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  if (words === 0) return 1
  if (words < 10)  return 1
  if (words < 25)  return 2
  if (words < 50)  return 3
  return 4
}

const LEVEL_REASONS: Record<number, string> = {
  1: 'Your response suggests you are at the beginning of your journey. Level 1 will build your foundation — alphabets, core words, and basic sentence structures.',
  2: 'You have some basics. Level 2 starts with essential grammar and everyday conversation.',
  3: 'Solid foundation detected. Level 3 dives into all tenses, 500 key words, and story-based reading.',
  4: 'Strong intermediate base. Level 4 focuses on reading, writing, and complex sentence structures.',
}

const slideVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.25 } }),
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [dir,  setDir]  = useState(1)

  function advance() { setDir(1);  setStep((s) => s + 1) }
  function back()    { setDir(-1); setStep((s) => s - 1) }

  return (
    <div className="min-h-screen bg-bg-primary font-body flex flex-col">
      <SEO
        title="Start Your English Journey — EnglishOS"
        description="Set up your EnglishOS profile and start your 300-day English fluency journey. Powered by the Polymath methodology for Urdu and Hindi speakers."
        url="/onboarding"
      />

      {/* ── top bar ── */}
      <div className="shrink-0 px-6 pt-6 pb-2 flex items-center justify-between max-w-2xl mx-auto w-full">
        <span className="font-display font-bold text-lg text-text-primary">
          English<span className="text-brand-red">OS</span>
        </span>
        <span className="text-xs font-mono text-text-muted">Step {step} of {TOTAL_STEPS}</span>
      </div>

      {/* ── progress bar ── */}
      <div className="shrink-0 px-6 max-w-2xl mx-auto w-full">
        <div className="flex gap-1.5 mb-6">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full flex-1"
              animate={{
                backgroundColor: i < step ? '#E94560' : i === step - 1 ? '#E94560' : '#2A2A3E',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* ── step content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex-1 px-6 max-w-2xl mx-auto w-full"
          >
            {step === 1 && <Step1 onNext={advance} />}
            {step === 2 && <Step2 onNext={advance} onBack={back} />}
            {step === 3 && <Step3 onNext={advance} onBack={back} />}
            {step === 4 && <Step4 onNext={advance} onBack={back} />}
            {step === 5 && <Step5 onDone={() => navigate('/map')} onBack={back} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   STEP 1 — Language Diagnostic
══════════════════════════════════════ */
function Step1({ onNext }: { onNext: () => void }) {
  const { onboardingData, setOnboardingData } = useUIStore()
  const [loading,  setLoading]  = useState(false)
  const [analysed, setAnalysed] = useState(false)

  async function handleAnalyse() {
    if (!onboardingData.diagnosticText.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    const level = diagnoseLevel(onboardingData.diagnosticText)
    setOnboardingData({ recommendedLevel: level, chosenLevel: level })
    setLoading(false)
    setAnalysed(true)
  }

  return (
    <div className="py-8 flex flex-col gap-6">
      <div>
        <Badge variant="red" size="sm" className="mb-3">Step 1 — Diagnostic</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Let's find your starting point
        </h1>
        <p className="text-text-muted text-sm">
          Tell us anything about yourself in English — any words or sentences you know. Don't worry about mistakes.
        </p>
      </div>

      <textarea
        className="w-full h-36 bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm resize-none outline-none focus:border-brand-red transition-colors placeholder:text-text-muted font-body"
        placeholder="Write anything... my name is Ahmed, I live in Lahore, I like cricket..."
        value={onboardingData.diagnosticText}
        onChange={(e) => setOnboardingData({ diagnosticText: e.target.value })}
        disabled={loading || analysed}
      />

      <AnimatePresence mode="wait">
        {!analysed ? (
          <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Button
              variant="primary"
              size="lg"
              loading={loading}
              disabled={!onboardingData.diagnosticText.trim()}
              onClick={handleAnalyse}
              className="w-full"
            >
              {loading ? 'Analysing your English…' : 'Analyse My English'}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <Card variant="power-pack" padding="lg">
              <div className="mt-6">
                <p className="text-xs font-mono text-text-muted mb-1">Recommendation</p>
                <p className="font-display text-xl font-bold text-text-primary mb-2">
                  Start at{' '}
                  <span className="text-brand-red">Level {onboardingData.recommendedLevel}</span>
                  {' '}—{' '}
                  {JOURNEY[onboardingData.recommendedLevel - 1]?.name}
                </p>
                <p className="text-sm text-text-secondary">{LEVEL_REASONS[onboardingData.recommendedLevel]}</p>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={() => {
                  const next = Math.max(1, onboardingData.chosenLevel - 1)
                  setOnboardingData({ chosenLevel: next })
                }}
                disabled={onboardingData.chosenLevel <= 1}
              >
                ← Lower Level
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={() => {
                  const next = Math.min(4, onboardingData.chosenLevel + 1)
                  setOnboardingData({ chosenLevel: next })
                }}
                disabled={onboardingData.chosenLevel >= 4}
              >
                Higher Level →
              </Button>
            </div>

            {onboardingData.chosenLevel !== onboardingData.recommendedLevel && (
              <p className="text-xs text-brand-gold text-center font-mono">
                ⚠ You adjusted to Level {onboardingData.chosenLevel} — that's fine, we trust your judgment.
              </p>
            )}

            <Button variant="primary" size="lg" className="w-full" onClick={onNext}>
              Confirm Level {onboardingData.chosenLevel} — Continue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ══════════════════════════════════════
   STEP 2 — My Why
══════════════════════════════════════ */
function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { onboardingData, setOnboardingData } = useUIStore()

  return (
    <div className="py-8 flex flex-col gap-6">
      <div>
        <Badge variant="blue" size="sm" className="mb-3">Step 2 — Your Why</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Why do you want to learn English?
        </h1>
        <p className="text-text-muted text-sm">Your "why" powers your streak on hard days. Choose one.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {WHY_OPTIONS.map((opt) => {
          const selected = onboardingData.why === opt.id
          return (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOnboardingData({ why: opt.id })}
              className={[
                'relative flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-colors duration-150 cursor-pointer',
                selected
                  ? 'bg-brand-red/10 border-brand-red'
                  : 'bg-bg-secondary border-border-subtle hover:border-border-strong',
              ].join(' ')}
            >
              {selected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
              <span className="text-2xl">{opt.icon}</span>
              <span className={`text-xs font-body font-medium leading-tight ${selected ? 'text-brand-red' : 'text-text-secondary'}`}>
                {opt.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Other option */}
      <div>
        <button
          onClick={() => setOnboardingData({ why: 'other' })}
          className={[
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-colors',
            onboardingData.why === 'other'
              ? 'border-brand-red bg-brand-red/10 text-brand-red'
              : 'border-border-subtle bg-bg-secondary text-text-muted hover:border-border-strong',
          ].join(' ')}
        >
          ✏️ Other reason…
        </button>
        <AnimatePresence>
          {onboardingData.why === 'other' && (
            <motion.input
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 42 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 text-text-secondary text-sm outline-none focus:border-brand-red transition-colors placeholder:text-text-muted"
              placeholder="Tell us your reason…"
              value={onboardingData.whyOther}
              onChange={(e) => setOnboardingData({ whyOther: e.target.value })}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-auto">
        <Button variant="secondary" size="md" onClick={onBack} className="flex-1">← Back</Button>
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          disabled={!onboardingData.why || (onboardingData.why === 'other' && !onboardingData.whyOther.trim())}
          onClick={onNext}
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   STEP 3 — Daily Commitment
══════════════════════════════════════ */
interface TimeSelectorProps {
  label: string
  presets: string[]
  value: string
  onChange: (v: string) => void
}

function TimeSelector({ label, presets, value, onChange }: TimeSelectorProps) {
  const isCustom = !presets.includes(value)
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-body font-medium text-text-secondary">{label}</p>
      <div className="flex flex-wrap gap-2">
        {presets.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={[
              'px-4 py-2 rounded-xl text-sm border transition-colors',
              value === t
                ? 'bg-brand-red/10 border-brand-red text-brand-red'
                : 'bg-bg-secondary border-border-subtle text-text-muted hover:border-border-strong',
            ].join(' ')}
          >
            {fmt12(t)}
          </button>
        ))}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onChange(isCustom ? value : '10:00')}
            className={[
              'px-4 py-2 rounded-xl text-sm border transition-colors',
              isCustom
                ? 'bg-brand-red/10 border-brand-red text-brand-red'
                : 'bg-bg-secondary border-border-subtle text-text-muted hover:border-border-strong',
            ].join(' ')}
          >
            Custom
          </button>
          <AnimatePresence>
            {isCustom && (
              <motion.input
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 100 }}
                exit={{ opacity: 0, width: 0 }}
                type="time"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-bg-secondary border border-brand-red rounded-xl px-3 py-2 text-sm text-text-secondary outline-none font-mono"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { onboardingData, setOnboardingData } = useUIStore()

  return (
    <div className="py-8 flex flex-col gap-7">
      <div>
        <Badge variant="gold" size="sm" className="mb-3">Step 3 — Daily Commitment</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          When will you learn?
        </h1>
        <p className="text-text-muted text-sm">Consistency beats intensity. Pick times you'll actually keep.</p>
      </div>

      <Card padding="md" className="flex items-start gap-3">
        <span className="text-xl shrink-0 mt-0.5">⏰</span>
        <p className="text-sm text-text-secondary">
          We recommend <strong className="text-text-primary">20 min morning</strong> + <strong className="text-text-primary">40 min evening</strong> = 1 hour total. That's all it takes.
        </p>
      </Card>

      <TimeSelector
        label="Morning session"
        presets={MORNING_PRESETS}
        value={onboardingData.morningTime}
        onChange={(v) => setOnboardingData({ morningTime: v })}
      />

      <TimeSelector
        label="Evening session"
        presets={EVENING_PRESETS}
        value={onboardingData.eveningTime}
        onChange={(v) => setOnboardingData({ eveningTime: v })}
      />

      <div className="bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-text-muted">Your daily schedule</span>
        <span className="font-mono text-sm text-brand-blue">
          {fmt12(onboardingData.morningTime)} &amp; {fmt12(onboardingData.eveningTime)}
        </span>
      </div>

      <div className="flex gap-3 mt-auto">
        <Button variant="secondary" size="md" onClick={onBack} className="flex-1">← Back</Button>
        <Button variant="primary" size="md" className="flex-1" onClick={onNext}>Continue →</Button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   STEP 4 — Stakes Setup
══════════════════════════════════════ */
function Step4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { onboardingData, setOnboardingData } = useUIStore()
  const charCount = onboardingData.commitmentStatement.trim().length
  const MIN_CHARS = 20
  const canAdvance = charCount >= MIN_CHARS

  return (
    <div className="py-8 flex flex-col gap-6">
      <div>
        <Badge variant="red" size="sm" className="mb-3">Step 4 — Stakes</Badge>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Set your stake.
        </h1>
        <p className="text-sm text-text-muted mb-1">
          Your brain works harder when something is on the line.
        </p>
      </div>

      <Card padding="md" className="border-brand-red/30 bg-brand-red/5">
        <p className="text-xs font-mono text-brand-red mb-1">DiSS — Stakes Principle</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          The DiSS framework treats stakes as a biological lever — not motivation. Your brain protects what it stands to lose. Setting a real stake on Day 1 is what separates learners who finish from those who quit by Week 3.
        </p>
      </Card>

      {/* Commitment statement */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-body font-medium text-text-secondary">
          Personal commitment statement{' '}
          <span className="text-brand-red text-xs">*required</span>
        </label>
        <textarea
          className="w-full h-24 bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm resize-none outline-none focus:border-brand-red transition-colors placeholder:text-text-muted font-body"
          placeholder="I commit to learning English because… and I will study every day at [time] because my goal is to…"
          value={onboardingData.commitmentStatement}
          onChange={(e) => setOnboardingData({ commitmentStatement: e.target.value })}
        />
        <div className="flex items-center justify-between">
          {charCount < MIN_CHARS ? (
            <p className="text-xs text-brand-red font-mono">
              {charCount === 0
                ? 'You must write a commitment statement to continue.'
                : `${MIN_CHARS - charCount} more character${MIN_CHARS - charCount === 1 ? '' : 's'} needed.`}
            </p>
          ) : (
            <p className="text-xs text-green-400 font-mono">✓ Commitment saved</p>
          )}
          <p className={`text-xs font-mono ${charCount < MIN_CHARS ? 'text-text-muted' : 'text-green-400'}`}>
            {charCount} / {MIN_CHARS}+
          </p>
        </div>
      </div>

      {/* Partner email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-body font-medium text-text-secondary flex items-center gap-2">
          Accountability partner email
          <Badge variant="gold" size="sm">Recommended</Badge>
        </label>
        <input
          type="email"
          className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm outline-none focus:border-brand-blue transition-colors placeholder:text-text-muted"
          placeholder="partner@example.com (optional)"
          value={onboardingData.partnerEmail}
          onChange={(e) => setOnboardingData({ partnerEmail: e.target.value })}
        />
      </div>

      {/* Notify checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 accent-brand-red w-4 h-4"
          checked={onboardingData.notifyPartner}
          onChange={(e) => setOnboardingData({ notifyPartner: e.target.checked })}
        />
        <span className="text-sm text-text-secondary">
          Notify my partner if I miss 3 days in a row
        </span>
      </label>

      <div className="flex gap-3 mt-auto">
        <Button variant="secondary" size="md" onClick={onBack} className="flex-1">← Back</Button>
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          disabled={!canAdvance}
          onClick={onNext}
        >
          Lock In My Stake →
        </Button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   STEP 5 — Map Reveal + API Submit
══════════════════════════════════════ */
function Step5({ onDone, onBack }: { onDone: () => void; onBack: () => void }) {
  const { onboardingData, resetOnboardingData } = useUIStore()
  const setUser = useAuthStore((s) => s.setUser)
  const startLevel = onboardingData.chosenLevel

  const [revealed,  setRevealed]  = useState(false)
  const [nodesLit,  setNodesLit]  = useState(0)
  const [showBtn,   setShowBtn]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 400)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (!revealed) return
    let count = 0
    const iv = setInterval(() => {
      count += 1
      setNodesLit(count)
      if (count >= JOURNEY.length) {
        clearInterval(iv)
        setTimeout(() => setShowBtn(true), 500)
      }
    }, 400)
    return () => clearInterval(iv)
  }, [revealed])

  async function handleBegin() {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const whyText =
        onboardingData.why === 'other'
          ? onboardingData.whyOther
          : onboardingData.why ?? 'Not specified'

      const toHHMM = (t: string) => (t && t.length >= 5 ? t.slice(0, 5) : t)

      const result = await api.post<{ success: boolean; data: import('@/stores/authStore').SafeLearner }>(
        '/api/v1/learner/onboarding',
        {
          placementLevel:    onboardingData.chosenLevel,
          whyMotivation:     whyText,
          stakesStatement:   onboardingData.commitmentStatement.trim(),
          accountabilityEmail: onboardingData.partnerEmail || undefined,
          morningSessionTime: toHHMM(onboardingData.morningTime),
          eveningSessionTime: toHHMM(onboardingData.eveningTime),
        }
      )
      setUser(result.data)
      resetOnboardingData()
      onDone()
    } catch (err) {
      if (err instanceof ApiError) {
        setSubmitError(err.message)
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
      setSubmitting(false)
    }
  }

  return (
    <div className="py-8 flex flex-col gap-8 items-center">
      {/* back */}
      <div className="w-full">
        <button onClick={onBack} className="text-text-muted text-sm hover:text-text-secondary transition-colors flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <Badge variant="red" size="sm" className="mb-3">Your 300-Day Map</Badge>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
          Your journey starts here.
        </h1>
        <p className="text-text-muted text-sm mt-2">Each level unlocks when you master the one before it.</p>
      </motion.div>

      {/* Vertical node map */}
      <div className="w-full max-w-sm flex flex-col gap-0 items-center">
        {JOURNEY.map((lvl, i) => {
          const isLit   = nodesLit > i
          const isStart = lvl.level === startLevel
          const isPast  = lvl.level < startLevel
          return (
            <div key={lvl.level} className="flex flex-col items-center w-full">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={isLit ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="relative flex items-center gap-4 w-full"
              >
                {/* Node */}
                <motion.div
                  animate={
                    isStart && isLit
                      ? {
                          boxShadow: [
                            `0 0 0px 0px ${lvl.color}00`,
                            `0 0 20px 6px ${lvl.color}60`,
                            `0 0 0px 0px ${lvl.color}00`,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-display font-bold text-xl shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: isLit ? `${lvl.color}20` : '#1A1A28',
                    borderColor:     isLit ? lvl.color : '#2A2A3E',
                    color:           isLit ? lvl.color : '#6A6A8A',
                  }}
                >
                  {isPast ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : lvl.level}
                </motion.div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className={`font-display font-semibold text-sm ${isLit ? 'text-text-primary' : 'text-text-muted'}`}>
                      {lvl.name}
                    </span>
                    {isStart && (
                      <Badge variant="red" size="sm">You start here</Badge>
                    )}
                  </div>
                  <span className={`text-xs font-mono ${isLit ? 'text-text-muted' : 'text-border-strong'}`}>
                    {lvl.days}
                  </span>
                </div>
              </motion.div>

              {/* Connector */}
              {i < JOURNEY.length - 1 && (
                <div className="w-0.5 h-8 ml-7 self-start">
                  <motion.div
                    className="w-full h-full rounded-full"
                    animate={{ backgroundColor: nodesLit > i + 1 ? `${JOURNEY[i].color}40` : '#2A2A3E' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <AnimatePresence>
        {showBtn && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className="flex flex-col items-center gap-3 w-full max-w-sm"
          >
            {submitError && (
              <p className="text-sm text-brand-red font-body text-center bg-brand-red/10 border border-brand-red/30 rounded-xl px-4 py-2.5 w-full">
                {submitError}
              </p>
            )}
            <Button
              variant="primary"
              size="lg"
              loading={submitting}
              className="w-full"
              onClick={handleBegin}
            >
              {submitting ? 'Setting up your map…' : '🚀 Begin Mission 1'}
            </Button>
            <p className="text-xs text-text-muted font-mono">
              Level {startLevel} · {JOURNEY[startLevel - 1]?.name} · Your journey begins now
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
