import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '@/components/ui/Badge'

// ── Static mock data ──────────────────────────────────────────────────────────

interface FeynmanEntry {
  id: number
  date: string
  module: string
  prompt: string
  response: string
  score: number
  prevScore: number | null
  gaps: string[]
}

const ENTRIES: FeynmanEntry[] = [
  {
    id: 6,
    date: 'Apr 04, 2026',
    module: 'Core 100 Words — Group D (Nouns)',
    prompt: 'Explain what a "noun" is as if you are teaching a 10-year-old who has never heard the word.',
    response: 'A noun is a word that gives name to a thing, person, place or idea. For example "apple" is a noun because it is a thing. "Bilal" is a noun because it is a person\'s name. "Lahore" is a noun because it is a place. Even things we cannot touch like "happiness" or "time" are nouns because they are ideas. In simple words: if you can say "this is a ___", that blank is probably a noun.',
    score: 84,
    prevScore: 76,
    gaps: [],
  },
  {
    id: 5,
    date: 'Apr 02, 2026',
    module: 'Core 100 Words — Group C (Action Verbs)',
    prompt: 'Explain what a verb is and why the difference between "see" and "look" matters.',
    response: 'A verb is an action word. Like "run", "eat", "sleep" — these are all verbs. Now "see" and "look" — both seem same but are different. "See" happens automatically, you don\'t try. Like you are sitting and you see a bird. But "look" is when you are intentionally trying to notice something. Teacher said "look at the board" — you are making effort. I think this matters because in conversation if someone says "did you see" they mean accidentally, but "did you look" means did you try.',
    score: 76,
    prevScore: 71,
    gaps: ['intentionally', 'automatically'],
  },
  {
    id: 4,
    date: 'Mar 31, 2026',
    module: 'Basic Sentences — Negative Form',
    prompt: 'Explain the rule for making a sentence negative in English.',
    response: 'To make sentence negative we add "not" after the verb "be" — like "I am not happy." For other verbs we use "do not" or "does not". For "I, you, we, they" we say "do not" and for "he, she, it" we say "does not". Example — "I do not eat meat." or "She does not go school." The short forms are don\'t and doesn\'t. I get confused sometimes about when to use does not versus do not.',
    score: 71,
    prevScore: 68,
    gaps: ['does not vs do not'],
  },
  {
    id: 3,
    date: 'Mar 28, 2026',
    module: 'Basic Sentences — The SVO Formula',
    prompt: 'Explain the SVO sentence formula as if explaining to a friend who speaks only Urdu.',
    response: 'English mein har sentence ka ek formula hota hai: Subject Verb Object. Subject matlab jo kaam kar raha hai, Verb matlab kaam itself, aur Object matlab jis par kaam ho raha hai. Jaise "I eat food" — I is subject, eat is verb, food is object. Urdu mein hum kehte hain "Mein khaana khata hoon" but order alag hai. English mein order fix hai — Subject pehle, phir Verb, phir Object. Yeh formula yaad rakhne se almost koi bhi sentence ban sakta hai.',
    score: 68,
    prevScore: null,
    gaps: ['formula', 'object'],
  },
  {
    id: 2,
    date: 'Mar 26, 2026',
    module: 'Core 100 Words — Be Verbs',
    prompt: 'When do you use "am", "is", and "are"? Explain the rule simply.',
    response: '"Am" is used with "I" only. "Is" is used with he, she, it — single person or thing. "Are" is used with you, we, they — multiple people. Like "I am good." "She is smart." "We are friends." I think the trick is just to memorize which one goes with which word.',
    score: 65,
    prevScore: null,
    gaps: ['memorize', 'multiple'],
  },
  {
    id: 1,
    date: 'Mar 24, 2026',
    module: 'Alphabets & Sounds — Vowels',
    prompt: 'What are vowels and why are they important in English?',
    response: 'Vowels are A, E, I, O, U. They are important because almost every English word has at least one vowel. Without vowels words are hard to say. Vowels make the main sound in a word.',
    score: 55,
    prevScore: null,
    gaps: ['almost', 'pronunciation'],
  },
]

// ── Score badge color ─────────────────────────────────────────────────────────
function scoreBadge(score: number) {
  if (score >= 80) return { variant: 'green' as const, label: `${score}%` }
  if (score >= 65) return { variant: 'blue'  as const, label: `${score}%` }
  return               { variant: 'red'   as const, label: `${score}%` }
}

// ── Trend arrow ───────────────────────────────────────────────────────────────
function Trend({ score, prev }: { score: number; prev: number | null }) {
  if (prev === null) return <span className="text-xs font-mono text-text-muted">—</span>
  const diff = score - prev
  const up = diff >= 0
  return (
    <span className={`flex items-center gap-0.5 text-xs font-mono font-bold ${up ? 'text-brand-green' : 'text-brand-red'}`}>
      {up ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
      {up ? '+' : ''}{diff}
    </span>
  )
}

// ── Entry card ────────────────────────────────────────────────────────────────
function EntryCard({ entry, index }: { entry: FeynmanEntry; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const TRUNCATE = 160
  const isLong = entry.response.length > TRUNCATE
  const display = expanded || !isLong ? entry.response : entry.response.slice(0, TRUNCATE) + '…'
  const sb = scoreBadge(entry.score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono text-text-muted">{entry.date}</span>
            <Trend score={entry.score} prev={entry.prevScore} />
          </div>
          <p className="text-xs font-mono text-brand-blue truncate">{entry.module}</p>
        </div>
        <Badge variant={sb.variant} size="sm">{sb.label}</Badge>
      </div>

      {/* Prompt */}
      <div className="mx-4 mb-3 bg-bg-tertiary border border-border-subtle rounded-xl px-3 py-2.5">
        <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Prompt</p>
        <p className="text-sm font-body text-text-secondary leading-relaxed">{entry.prompt}</p>
      </div>

      {/* Response */}
      <div className="px-4 pb-3">
        <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1.5">Your Response</p>
        <p className="text-sm font-body text-text-primary leading-relaxed">{display}</p>
        {isLong && (
          <button
            className="mt-1.5 text-xs text-brand-blue hover:underline font-body"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less ↑' : 'Read more ↓'}
          </button>
        )}
      </div>

      {/* Knowledge gaps */}
      {entry.gaps.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Knowledge Gaps</p>
          <div className="flex flex-wrap gap-2">
            {entry.gaps.map((gap) => (
              <span
                key={gap}
                className="px-2.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 text-xs font-mono text-brand-red"
              >
                {gap}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FeynmanArchive() {
  const navigate = useNavigate()
  const avgScore = Math.round(ENTRIES.reduce((s, e) => s + e.score, 0) / ENTRIES.length)

  return (
    <div className="min-h-screen bg-bg-primary font-body">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-sm border-b border-border-subtle flex items-center justify-between px-4 py-3.5">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-sm">Map</span>
        </button>
        <h1 className="font-display font-bold text-text-primary text-lg">Feynman Journey</h1>
        <Badge variant="blue" size="sm">Avg {avgScore}%</Badge>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center py-2"
        >
          <p className="text-sm text-text-secondary font-body leading-relaxed">
            Watch your own understanding grow over time.
          </p>
          <p className="text-xs text-text-muted font-mono mt-1">
            {ENTRIES.length} explanations submitted · score improving 📈
          </p>
        </motion.div>

        {/* Score trend overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="bg-bg-secondary border border-border-subtle rounded-2xl px-4 py-3 flex items-center gap-6"
        >
          <div className="text-center flex-1">
            <p className="font-display text-2xl font-bold text-brand-green">{ENTRIES[0].score}%</p>
            <p className="text-xs font-mono text-text-muted mt-0.5">Latest</p>
          </div>
          <div className="w-px h-10 bg-border-subtle" />
          <div className="text-center flex-1">
            <p className="font-display text-2xl font-bold text-brand-blue">{avgScore}%</p>
            <p className="text-xs font-mono text-text-muted mt-0.5">Average</p>
          </div>
          <div className="w-px h-10 bg-border-subtle" />
          <div className="text-center flex-1">
            <p className="font-display text-2xl font-bold text-text-primary">{ENTRIES[ENTRIES.length - 1].score}%</p>
            <p className="text-xs font-mono text-text-muted mt-0.5">First</p>
          </div>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <EntryCard key={entry.id} entry={entry} index={i + 0.2} />
          ))}
        </div>

      </div>
    </div>
  )
}
