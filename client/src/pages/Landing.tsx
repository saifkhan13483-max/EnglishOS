import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay } },
})

const STATS = [
  { value: '800M+', label: 'South Asian learners' },
  { value: '4', label: 'Proven Methodologies' },
  { value: '300-Day', label: 'Roadmap' },
  { value: 'AI', label: 'Powered Practice' },
]

const METHODS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    color: 'text-brand-red',
    bg: 'bg-brand-red/10 border-brand-red/20',
    badge: 'red' as const,
    title: 'DiSS Framework',
    tagline: 'Optimal learning structure',
    desc: 'English is deconstructed into 6 levels, each with a Power Pack of the top 20% content that delivers 80% of results. Level Gates enforce Serial Mastery — you cannot skip ahead.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m1.636-6.364-.707-.707M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      </svg>
    ),
    color: 'text-brand-gold',
    bg: 'bg-brand-gold/10 border-brand-gold/20',
    badge: 'gold' as const,
    title: 'Feynman Technique',
    tagline: 'Deep comprehension, not illusion',
    desc: 'After every module, you explain the concept in your own words. AI evaluates your explanation and turns gaps into your personalised review queue. You cannot fake understanding.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10 border-brand-blue/20',
    badge: 'blue' as const,
    title: 'Spaced Repetition',
    tagline: 'Beat the forgetting curve',
    desc: 'The Ebbinghaus curve shows 70% of content is forgotten in 48 hours. EnglishOS surfaces every word at Day 1 → 3 → 7 → 21 intervals, adaptive to your accuracy.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: 'text-brand-green',
    bg: 'bg-brand-green/10 border-brand-green/20',
    badge: 'green' as const,
    title: 'Serial Mastery',
    tagline: 'One level at a time, completely',
    desc: 'No jumping between topics. Complete Level 1 before Level 2 unlocks. Depth before breadth — the same principle that built every great skill in history.',
  },
]

const JOURNEY = [
  { level: 1, name: 'Base Camp', days: 'Days 1–30', color: '#E94560', modules: 'Alphabets · 100 Words · Sentences' },
  { level: 2, name: 'Village', days: 'Days 31–75', color: '#F5B014', modules: 'Grammar · Conversation · Daily Topics' },
  { level: 3, name: 'Town', days: 'Days 76–120', color: '#4A9EFF', modules: 'All Tenses · 500 Words · Stories' },
  { level: 4, name: 'City', days: 'Days 121–180', color: '#2ECC71', modules: 'Reading · Writing · Complex Sentences' },
  { level: 5, name: 'Capital', days: 'Days 181–240', color: '#A855F7', modules: 'Advanced Grammar · Idioms · Fluency' },
  { level: 6, name: 'World Stage', days: 'Days 241–300', color: '#F97316', modules: 'Professional · Confidence · Job/Exams' },
]

const COMPARISON = [
  { feature: 'Polymath methodology', eos: true, duo: false, bc: false },
  { feature: 'Roman Urdu native support', eos: true, duo: false, bc: false },
  { feature: 'AI conversation simulator', eos: true, duo: false, bc: false },
  { feature: 'Feynman gap detection', eos: true, duo: false, bc: false },
  { feature: 'Adaptive spaced repetition', eos: true, duo: 'Partial', bc: false },
  { feature: 'Stakes & accountability system', eos: true, duo: 'Streak only', bc: false },
  { feature: 'Sequential level locking', eos: true, duo: false, bc: false },
  { feature: 'Mission framing (not lessons)', eos: true, duo: false, bc: false },
  { feature: 'Shareable progress identity', eos: true, duo: 'Basic', bc: false },
]

type CellValue = boolean | string

function Cell({ val }: { val: CellValue }) {
  if (val === true)
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-green/15 text-brand-green">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </span>
    )
  if (val === false)
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-red/10 text-brand-red">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </span>
    )
  return <span className="text-xs font-mono text-text-muted">{val}</span>
}

export default function Landing() {
  const navigate = useNavigate()
  const methodRef = useRef<HTMLElement>(null)

  function scrollToMethod() {
    methodRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-bg-primary font-body overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
        <span className="font-display font-bold text-xl text-text-primary">
          English<span className="text-brand-red">OS</span>
        </span>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign in</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/onboarding')}>Get Started</Button>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-24 pb-20">
        {/* Radial red glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-25"
            style={{
              background: 'radial-gradient(ellipse at center, #E94560 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <motion.div variants={stagger(0)} initial="hidden" animate="show">
            <Badge variant="red" size="sm">⚡ Powered by Polymath Methodology</Badge>
          </motion.div>

          <motion.h1
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
            className="font-display text-6xl md:text-8xl font-bold text-text-primary leading-none tracking-tight"
          >
            English<span className="text-brand-red">OS</span>
          </motion.h1>

          <motion.p
            variants={stagger(0.2)}
            initial="hidden"
            animate="show"
            className="font-display text-xl md:text-2xl text-text-secondary max-w-xl leading-snug"
          >
            Not a language app.{' '}
            <span className="text-text-primary font-semibold">An operating system for learning English.</span>
          </motion.p>

          <motion.p
            variants={stagger(0.3)}
            initial="hidden"
            animate="show"
            className="text-base text-text-muted max-w-md"
          >
            300 days. 1 hour a day. Fluent English.{' '}
            <br className="hidden sm:block" />
            Built for South Asian learners.
          </motion.p>

          <motion.div
            variants={stagger(0.4)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row gap-3 mt-2"
          >
            <Button variant="primary" size="lg" onClick={() => navigate('/onboarding')}>
              Start Your Journey
            </Button>
            <Button variant="ghost" size="lg" onClick={scrollToMethod}>
              See How It Works
            </Button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={stagger(0.55)}
            initial="hidden"
            animate="show"
            className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl"
          >
            {STATS.map((s) => (
              <div
                key={s.value}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-2xl bg-bg-secondary border border-border-subtle"
              >
                <span className="font-display text-2xl font-bold text-text-primary">{s.value}</span>
                <span className="text-xs text-text-muted text-center">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted"
        >
          <span className="text-xs font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          METHODOLOGY
      ══════════════════════════════════════ */}
      <section ref={methodRef} className="py-24 px-5 bg-bg-secondary">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14"
          >
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">The Science</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              Built on Learning Science,<br className="hidden sm:block" /> Not Guesswork
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {METHODS.map((m, i) => (
              <motion.div
                key={m.title}
                variants={stagger(i * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                <Card padding="lg" className="h-full">
                  <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-start gap-4">
                      <span className={`flex items-center justify-center w-11 h-11 rounded-xl border ${m.bg} ${m.color} shrink-0`}>
                        {m.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-display font-semibold text-text-primary text-base">{m.title}</h3>
                          <Badge variant={m.badge} size="sm">{m.tagline}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOURNEY MAP
      ══════════════════════════════════════ */}
      <section className="py-24 px-5 bg-bg-primary overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16"
          >
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Your Path</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              300 Days. One Clear Road.
            </h2>
            <p className="text-text-muted mt-3 text-sm">Each level unlocks only after the previous one is mastered.</p>
          </motion.div>

          {/* Desktop horizontal path */}
          <div className="hidden md:block">
            <div className="relative flex items-start justify-between gap-0">
              {/* Connecting line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-border-subtle z-0" />
              {JOURNEY.map((lvl, i) => (
                <motion.div
                  key={lvl.level}
                  variants={stagger(i * 0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  className="relative z-10 flex flex-col items-center gap-3 flex-1 px-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-display font-bold text-xl text-white shadow-lg"
                    style={{
                      backgroundColor: `${lvl.color}20`,
                      borderColor: lvl.color,
                      color: lvl.color,
                    }}
                  >
                    {lvl.level}
                  </motion.div>
                  <div className="text-center">
                    <p className="font-display font-semibold text-text-primary text-sm">{lvl.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">{lvl.days}</p>
                    <p className="text-xs text-text-muted mt-1 leading-tight max-w-[100px] mx-auto">{lvl.modules}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical path */}
          <div className="md:hidden flex flex-col gap-0">
            {JOURNEY.map((lvl, i) => (
              <motion.div
                key={lvl.level}
                variants={stagger(i * 0.08)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="flex items-start gap-4"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-12 h-12 rounded-xl border-2 flex items-center justify-center font-display font-bold text-lg shrink-0"
                    style={{
                      backgroundColor: `${lvl.color}20`,
                      borderColor: lvl.color,
                      color: lvl.color,
                    }}
                  >
                    {lvl.level}
                  </motion.div>
                  {i < JOURNEY.length - 1 && (
                    <div className="w-0.5 h-10 bg-border-subtle mt-0" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="font-display font-semibold text-text-primary">{lvl.name}</p>
                  <p className="text-xs text-text-muted mt-0.5">{lvl.days}</p>
                  <p className="text-xs text-text-muted mt-1">{lvl.modules}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SOCIAL PROOF — COMPARISON TABLE
      ══════════════════════════════════════ */}
      <section className="py-24 px-5 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14"
          >
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Why EnglishOS</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              Why EnglishOS is Different
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl border border-border-subtle overflow-hidden"
          >
            {/* Table header */}
            <div className="grid grid-cols-4 bg-bg-tertiary border-b border-border-subtle">
              <div className="px-5 py-4 text-xs font-mono text-text-muted uppercase tracking-wider">Feature</div>
              <div className="px-4 py-4 text-center">
                <span className="font-display font-bold text-brand-red text-sm">EnglishOS</span>
              </div>
              <div className="px-4 py-4 text-center">
                <span className="text-xs font-body text-text-muted">Duolingo</span>
              </div>
              <div className="px-4 py-4 text-center">
                <span className="text-xs font-body text-text-muted">British Council</span>
              </div>
            </div>

            {COMPARISON.map((row, i) => (
              <motion.div
                key={row.feature}
                variants={stagger(i * 0.04)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`grid grid-cols-4 border-b border-border-subtle last:border-0 ${
                  i % 2 === 0 ? 'bg-bg-primary' : 'bg-bg-secondary'
                } hover:bg-bg-tertiary transition-colors duration-150`}
              >
                <div className="px-5 py-3.5 text-sm text-text-secondary">{row.feature}</div>
                <div className="px-4 py-3.5 flex items-center justify-center"><Cell val={row.eos} /></div>
                <div className="px-4 py-3.5 flex items-center justify-center"><Cell val={row.duo} /></div>
                <div className="px-4 py-3.5 flex items-center justify-center"><Cell val={row.bc} /></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA FOOTER
      ══════════════════════════════════════ */}
      <section className="relative py-28 px-5 bg-bg-primary overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(ellipse, #E94560 0%, transparent 65%)',
              filter: 'blur(70px)',
            }}
          />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-7"
        >
          <Badge variant="red" size="sm">🚀 300 Days to Fluency</Badge>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Begin your 300-day<br />journey today.
          </h2>

          <p className="text-text-muted text-base max-w-sm">
            No tutor. No expensive course. No willpower required — just the right system.
          </p>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button variant="primary" size="lg" onClick={() => navigate('/onboarding')}>
              Start Free
            </Button>
          </motion.div>

          <p className="text-xs text-text-muted font-mono">Free to start · No credit card needed</p>
        </motion.div>
      </section>

      {/* ── FOOTER BAR ── */}
      <div className="bg-bg-secondary border-t border-border-subtle px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-display font-bold text-text-primary text-sm">
          English<span className="text-brand-red">OS</span>
        </span>
        <span className="text-xs text-text-muted font-mono">
          Built for South Asian learners · Powered by Polymath Methodology
        </span>
      </div>
    </div>
  )
}
