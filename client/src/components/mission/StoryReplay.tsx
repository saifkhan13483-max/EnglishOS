import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { getStory, SCENE_GRADIENTS } from '@/constants/stories'
import { useProgressStore } from '@/stores/progressStore'
import { useMissionStore } from '@/stores/missionStore'

const STORY_XP = 50

// Build a vocab map from the learner's loaded module content
function useVocabMap(): Record<string, string> {
  const moduleContent = useMissionStore(s => s.moduleContent)
  return useMemo(() => {
    const map: Record<string, string> = {}
    for (const item of moduleContent) {
      if (item.english && item.urduRoman) {
        map[item.english.toLowerCase()] = item.urduRoman
      }
    }
    return map
  }, [moduleContent])
}

function HighlightedText({ text, vocab }: { text: string; vocab: Record<string, string> }) {
  const [tooltip, setTooltip] = useState<{ word: string; x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  const segments = text.split(/(\s+|[",!?.]+)/)

  return (
    <span ref={containerRef} className="relative">
      {segments.map((segment, i) => {
        const clean = segment.toLowerCase().replace(/[^a-z]/g, '')
        const meaning = vocab[clean]
        if (!meaning) return <span key={i}>{segment}</span>
        return (
          <span key={i} className="relative inline-block">
            <button
              className="underline decoration-dotted decoration-brand-blue/60 text-inherit cursor-pointer hover:text-brand-blue transition-colors"
              onClick={e => {
                e.stopPropagation()
                const r = e.currentTarget.getBoundingClientRect()
                const cr = containerRef.current?.getBoundingClientRect()
                setTooltip(t =>
                  t?.word === clean
                    ? null
                    : { word: clean, x: r.left - (cr?.left ?? 0), y: r.bottom - (cr?.top ?? 0) + 4 }
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
      {tooltip && <div className="fixed inset-0 z-40" onClick={() => setTooltip(null)} />}
    </span>
  )
}

interface StoryReplayProps {
  onComplete: () => void
}

export default function StoryReplay({ onComplete }: StoryReplayProps) {
  const learnerProfile = useProgressStore(s => s.learnerProfile)
  const addXp = useMissionStore(s => s.addXp)
  const vocab = useVocabMap()

  const level = learnerProfile?.currentLevel ?? 1
  const module = learnerProfile?.currentModule ?? 1
  const story = getStory(level, module)

  const [idx, setIdx] = useState(0)
  const [choiceMade, setChoiceMade] = useState<{ nodeIdx: number; ack: string } | null>(null)
  const [dir, setDir] = useState(1)

  /* Guard: if story has no nodes, auto-complete this phase */
  if (!story.nodes.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 max-w-lg mx-auto w-full">
        <span className="text-4xl">📖</span>
        <p className="text-text-secondary text-sm text-center">Story content is being prepared for this level. Completing phase…</p>
        <button
          onClick={() => { addXp(0); onComplete() }}
          className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue/90 transition-colors"
        >
          Continue
        </button>
      </div>
    )
  }

  const node = story.nodes[idx]

  function advance() {
    setDir(1)
    if (idx >= story.nodes.length - 1) {
      addXp(STORY_XP)
      onComplete()
      return
    }
    setIdx(i => i + 1)
    setChoiceMade(null)
  }

  function pickChoice(optionIdx: 0 | 1) {
    if (node.type !== 'choice') return
    setChoiceMade({ nodeIdx: idx, ack: node.acks[optionIdx] })
  }

  const progress = ((idx + 1) / story.nodes.length) * 100
  const isLast = idx === story.nodes.length - 1
  const sceneGradient = SCENE_GRADIENTS[node.scene] ?? SCENE_GRADIENTS['street']

  const speakerIcon =
    node.speaker === 'Shopkeeper'   ? '🧔' :
    node.speaker === 'Teacher'      ? '👩‍🏫' :
    node.speaker === 'Bilal'        ? '🧑' :
    node.speaker === 'Interviewer'  ? '💼' :
    node.speaker === 'Colleague'    ? '👔' :
    node.speaker === 'Sara'         ? '👩' :
    node.speaker === 'Ali'          ? '🧑' :
    node.speaker === 'Manager'      ? '👔' :
    '📖'

  return (
    <div className="flex flex-col gap-5 py-8 px-4 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 1</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">{story.title}</h2>
        <p className="text-sm text-text-muted mt-1">{story.subtitle}</p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-bg-tertiary rounded-full overflow-hidden border border-border-subtle">
        <motion.div
          className="h-full bg-brand-blue rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* XP badge */}
      <div className="flex justify-end">
        <span className="px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-xs font-mono text-brand-gold">
          +{STORY_XP} XP on complete
        </span>
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
          <div className="h-32 flex items-end p-4" style={{ background: sceneGradient }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg">
                {speakerIcon}
              </div>
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider"
                style={{ color: node.speakerColor }}
              >
                {node.speaker}
              </span>
            </div>
          </div>

          <div className="bg-bg-secondary border border-border-subtle border-t-0 rounded-b-2xl p-5">
            <p className="text-text-primary text-base font-body leading-relaxed">
              <HighlightedText
                text={node.type === 'choice' ? node.prompt : node.text}
                vocab={vocab}
              />
            </p>
            {node.type === 'panel' && Object.keys(vocab).length > 0 && (
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
              <HighlightedText text={choiceMade.ack} vocab={vocab} />
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
          {isLast ? `✓ Complete Story (+${STORY_XP} XP)` : 'Next →'}
        </Button>
      )}

      <p className="text-center text-xs font-mono text-text-muted">
        Panel {idx + 1} of {story.nodes.length}
      </p>
    </div>
  )
}
