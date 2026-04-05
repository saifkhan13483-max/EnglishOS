import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

// ── Vocabulary map (word → Roman Urdu) ──────────────────────────────────────
const VOCAB: Record<string, string> = {
  want: 'chahna',
  water: 'paani',
  food: 'khaana',
  friend: 'dost',
  good: 'acha',
  morning: 'subah',
  hello: 'salam',
  please: 'meherbani',
  need: 'zaroorat',
  have: 'rakhna',
  home: 'ghar',
  happy: 'khush',
  eat: 'khaana',
  drink: 'peena',
  money: 'paisa',
  work: 'kaam',
  come: 'aana',
  go: 'jaana',
  man: 'aadmi',
  speak: 'bolna',
}

// ── Scene gradients ──────────────────────────────────────────────────────────
const SCENES: Record<string, string> = {
  market:   'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #0d2137 100%)',
  tea:      'linear-gradient(135deg, #1a1200 0%, #3d2800 50%, #1a0c00 100%)',
  shop:     'linear-gradient(135deg, #001a1a 0%, #003333 50%, #001a2e 100%)',
  street:   'linear-gradient(135deg, #0d0d1a 0%, #1a1a3d 50%, #0a0d1a 100%)',
  evening:  'linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #0d0000 100%)',
}

// ── Story data ───────────────────────────────────────────────────────────────
type PanelNode = {
  type: 'panel'
  scene: keyof typeof SCENES
  speaker: string
  speakerColor: string
  text: string
}

type ChoiceNode = {
  type: 'choice'
  scene: keyof typeof SCENES
  speaker: string
  speakerColor: string
  prompt: string
  options: [string, string]
  acks: [string, string]
}

type StoryNode = PanelNode | ChoiceNode

const STORY: StoryNode[] = [
  {
    type: 'panel',
    scene: 'street',
    speaker: 'Narrator',
    speakerColor: '#6A6A8A',
    text: 'Bilal walks down a busy street in Lahore. He is happy today — it is his first morning of English practice.',
  },
  {
    type: 'panel',
    scene: 'market',
    speaker: 'Narrator',
    speakerColor: '#6A6A8A',
    text: 'A friendly man at the market smiles at him. The man wants to speak English too.',
  },
  {
    type: 'panel',
    scene: 'market',
    speaker: 'Shopkeeper',
    speakerColor: '#4A9EFF',
    text: '"Good morning, friend! Come, come. What do you need today?"',
  },
  {
    type: 'choice',
    scene: 'market',
    speaker: 'Narrator',
    speakerColor: '#6A6A8A',
    prompt: 'How does Bilal reply to the shopkeeper?',
    options: ['"Hello! I want some water, please."', '"Good morning! I need food."'],
    acks: [
      '"Hello! I want some water, please." — The shopkeeper smiles. "Good English! You speak very well."',
      '"Good morning! I need food." — The shopkeeper nods. "Yes, yes! Good morning to you too."',
    ],
  },
  {
    type: 'panel',
    scene: 'shop',
    speaker: 'Shopkeeper',
    speakerColor: '#4A9EFF',
    text: '"We have fresh tea and cold water. What do you want to eat today?"',
  },
  {
    type: 'panel',
    scene: 'shop',
    speaker: 'Narrator',
    speakerColor: '#6A6A8A',
    text: 'Bilal looks at the items. He has money and he is ready to speak English again.',
  },
  {
    type: 'choice',
    scene: 'tea',
    speaker: 'Narrator',
    speakerColor: '#6A6A8A',
    prompt: 'What does Bilal decide to do?',
    options: ['"I want tea, please."', '"I want food. How much money?"'],
    acks: [
      'Bilal says "I want tea, please." The shopkeeper gives him a warm cup. "Very good English, friend!"',
      'Bilal asks about money. "Good question!" says the shopkeeper and shows him the price.',
    ],
  },
  {
    type: 'panel',
    scene: 'evening',
    speaker: 'Shopkeeper',
    speakerColor: '#4A9EFF',
    text: '"Come again tomorrow, friend. You speak good English. Practice every day — you will go far!"',
  },
  {
    type: 'panel',
    scene: 'street',
    speaker: 'Narrator',
    speakerColor: '#6A6A8A',
    text: 'Bilal walks home happy. Today he used real English in a real situation. Tomorrow he will come back.',
  },
]

// ── Highlighted text component ───────────────────────────────────────────────
function HighlightedText({ text }: { text: string }) {
  const [tooltip, setTooltip] = useState<{ word: string; x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  const words = text.split(/(\s+|[",!?.]+)/)
  return (
    <span ref={containerRef} className="relative">
      {words.map((segment, i) => {
        const clean = segment.toLowerCase().replace(/[^a-z]/g, '')
        const meaning = VOCAB[clean]
        if (!meaning) return <span key={i}>{segment}</span>
        return (
          <span key={i} className="relative inline-block">
            <button
              className="underline decoration-dotted decoration-brand-blue/60 text-inherit cursor-pointer hover:text-brand-blue transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                const r = e.currentTarget.getBoundingClientRect()
                const cr = containerRef.current?.getBoundingClientRect()
                setTooltip(t =>
                  t?.word === clean ? null : { word: clean, x: r.left - (cr?.left ?? 0), y: r.bottom - (cr?.top ?? 0) + 4 }
                )
              }}
            >
              {segment}
            </button>
            {tooltip?.word === clean && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-50 top-full left-0 mt-1 px-2.5 py-1.5 rounded-lg bg-bg-secondary border border-brand-blue/40 text-brand-blue text-xs font-mono whitespace-nowrap shadow-xl pointer-events-none"
              >
                {meaning}
              </motion.span>
            )}
          </span>
        )
      })}
      {tooltip && (
        <div className="fixed inset-0 z-40" onClick={() => setTooltip(null)} />
      )}
    </span>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
interface StoryReplayProps {
  onComplete: () => void
}

export default function StoryReplay({ onComplete }: StoryReplayProps) {
  const [idx, setIdx] = useState(0)
  const [choiceMade, setChoiceMade] = useState<{ nodeIdx: number; ack: string } | null>(null)
  const [dir, setDir] = useState(1)

  const node = STORY[idx]

  function advance() {
    setDir(1)
    if (idx >= STORY.length - 1) { onComplete(); return }
    setIdx(i => i + 1)
    setChoiceMade(null)
  }

  function pickChoice(optionIdx: 0 | 1) {
    if (node.type !== 'choice') return
    setChoiceMade({ nodeIdx: idx, ack: node.acks[optionIdx] })
  }

  const progress = ((idx + 1) / STORY.length) * 100
  const isLast = idx === STORY.length - 1

  return (
    <div className="flex flex-col gap-5 py-8 px-4 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 1</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Story Time</h2>
        <p className="text-sm text-text-muted mt-1">Practice in Context</p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-bg-tertiary rounded-full overflow-hidden border border-border-subtle">
        <motion.div
          className="h-full bg-brand-blue rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Scene card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          custom={dir}
          initial={{ x: dir * 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: dir * -60, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="rounded-2xl overflow-hidden"
        >
          {/* Scene illustration */}
          <div
            className="h-32 flex items-end p-4"
            style={{ background: SCENES[node.scene] }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg">
                {node.speaker === 'Shopkeeper' ? '🧔' : node.speaker === 'Bilal' ? '🧑' : '📖'}
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: node.speakerColor }}>
                {node.speaker}
              </span>
            </div>
          </div>

          {/* Dialogue box */}
          <div className="bg-bg-secondary border border-border-subtle border-t-0 rounded-b-2xl p-5">
            <p className="text-text-primary text-base font-body leading-relaxed">
              <HighlightedText text={node.type === 'choice' ? node.prompt : node.text} />
            </p>
            {node.type === 'panel' && (
              <p className="text-xs text-text-muted mt-2 font-mono">
                Tap highlighted words for Roman Urdu meaning
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Choice acknowledgment */}
      <AnimatePresence>
        {choiceMade && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-brand-blue/10 border border-brand-blue/30 rounded-2xl p-4"
          >
            <p className="text-xs font-mono text-brand-blue mb-1 uppercase tracking-wider">Story continues…</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <HighlightedText text={choiceMade.ack} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Choices or Next button */}
      {node.type === 'choice' && !choiceMade ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          {node.options.map((opt, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => pickChoice(i as 0 | 1)}
              className="w-full text-left bg-bg-secondary border border-brand-blue/30 hover:border-brand-blue rounded-xl px-4 py-3.5 text-sm text-text-secondary hover:text-text-primary transition-colors font-body"
            >
              <span className="font-mono text-brand-blue mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <Button
          variant={isLast ? 'primary' : 'secondary'}
          size="lg"
          className="w-full"
          onClick={advance}
          disabled={node.type === 'choice' && !choiceMade}
        >
          {isLast ? '✓ Complete Story' : 'Next →'}
        </Button>
      )}

      {/* Panel counter */}
      <p className="text-center text-xs font-mono text-text-muted">
        Panel {idx + 1} of {STORY.length}
      </p>
    </div>
  )
}
