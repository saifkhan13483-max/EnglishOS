import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Toggle from '@/components/ui/Toggle'
import AudioPlayer from '@/components/ui/AudioPlayer'
import PowerPackBadge from '@/components/ui/PowerPackBadge'
import { useMissionStore, ContentItem } from '@/stores/missionStore'
import { useProgressStore } from '@/stores/progressStore'
import { useUIStore } from '@/stores/uiStore'

interface CoreDropProps {
  onComplete: () => void
}

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; emoji: string; tip: string }> = {
  ALPHABET: {
    label: 'Letter',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10 border-brand-blue/30',
    emoji: '🔤',
    tip: 'Say it out loud 3 times! Pronunciation practice builds muscle memory.',
  },
  VOCAB: {
    label: 'Word',
    color: 'text-brand-green',
    bg: 'bg-brand-green/10 border-brand-green/30',
    emoji: '📖',
    tip: 'Try using this word in one sentence today. That is all it takes to remember it!',
  },
  GRAMMAR: {
    label: 'Grammar Rule',
    color: 'text-brand-red',
    bg: 'bg-brand-red/10 border-brand-red/30',
    emoji: '📐',
    tip: 'Grammar rules are like recipes. Learn the formula once — use it forever.',
  },
  SENTENCE: {
    label: 'Sentence',
    color: 'text-brand-gold',
    bg: 'bg-brand-gold/10 border-brand-gold/30',
    emoji: '💬',
    tip: 'Read this sentence out loud slowly. Then try saying it from memory.',
  },
  PHRASE: {
    label: 'Phrase',
    color: '#A855F7',
    bg: 'border-purple-500/30',
    emoji: '🗣️',
    tip: 'This is a phrase used in real conversations. Practice it until it feels natural!',
  },
}

function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] ?? TYPE_CONFIG.VOCAB
}

function BeginnerProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current) / total) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-mono text-text-muted">{current} of {total} cards</span>
        <span className="text-xs font-mono text-text-muted">{pct}% done</span>
      </div>
      <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-red rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function CoreDrop({ onComplete }: CoreDropProps) {
  const moduleContent = useMissionStore((s) => s.moduleContent)
  const loadModuleContent = useMissionStore((s) => s.loadModuleContent)
  const isLoading = useMissionStore((s) => s.isLoading)
  const romanUrduEnabled = useUIStore((s) => s.romanUrduEnabled)
  const setRomanUrduEnabled = useUIStore((s) => s.setRomanUrduEnabled)
  const learnerProfile = useProgressStore((s) => s.learnerProfile)

  const [cards, setCards] = useState<ContentItem[]>([])
  const [idx, setIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showTip, setShowTip] = useState(true)

  const loadedKeyRef = useRef<string>('')

  useEffect(() => {
    const level = learnerProfile?.currentLevel ?? 1
    const module = learnerProfile?.currentModule ?? 1
    const key = `${level}_${module}`
    if (key !== loadedKeyRef.current) {
      loadedKeyRef.current = key
      loadModuleContent(level, module)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learnerProfile?.currentLevel, learnerProfile?.currentModule])

  useEffect(() => {
    if (moduleContent.length > 0 && cards.length === 0) {
      setCards(moduleContent)
    }
  }, [moduleContent, cards.length])

  const card = cards[idx]
  const isLast = idx === cards.length - 1
  const typeConfig = card ? getTypeConfig(card.type) : null

  function goNext() {
    setDirection(1)
    setShowTip(true)
    if (isLast) onComplete()
    else setIdx((i) => i + 1)
  }

  function goPrev() {
    setDirection(-1)
    setShowTip(true)
    setIdx((i) => Math.max(0, i - 1))
  }

  if (isLoading && cards.length === 0) {
    return (
      <div className="flex flex-col gap-6 py-8 px-4 max-w-lg mx-auto w-full">
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 2</p>
          <h2 className="font-display text-2xl font-bold text-text-primary">Today's Lesson</h2>
        </div>
        <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-12 flex items-center justify-center">
          <p className="text-text-muted text-sm font-mono animate-pulse">Loading today's content…</p>
        </div>
      </div>
    )
  }

  if (!isLoading && cards.length === 0) {
    return (
      <div className="flex flex-col gap-6 py-8 px-4 max-w-lg mx-auto w-full">
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 2</p>
          <h2 className="font-display text-2xl font-bold text-text-primary">Today's Lesson</h2>
        </div>
        <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-10 flex flex-col items-center gap-4">
          <span className="text-4xl">📚</span>
          <p className="text-text-muted text-sm text-center">No content found for this module.</p>
        </div>
        <Button variant="primary" size="lg" className="w-full" onClick={onComplete}>Continue →</Button>
      </div>
    )
  }

  if (!card || !typeConfig) return null

  return (
    <div className="flex flex-col gap-5 py-8 px-4 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 2 · Today's Lesson</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">{card.groupName}</h2>
      </div>

      {/* Progress bar */}
      <BeginnerProgressBar current={idx + 1} total={cards.length} />

      {/* Roman Urdu toggle */}
      <div className="flex justify-end">
        <Toggle
          checked={romanUrduEnabled}
          onChange={setRomanUrduEnabled}
          label="Roman Urdu"
        />
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ x: direction * 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -60, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden"
        >
          {/* Card top bar with type + power pack */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border-subtle">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-semibold ${typeConfig.bg} ${typeConfig.color}`}>
              <span>{typeConfig.emoji}</span>
              {typeConfig.label}
            </span>
            {card.isPowerPack && <PowerPackBadge />}
          </div>

          <div className="p-5 flex flex-col gap-4">
            {/* English word/text */}
            <div>
              <p className="text-xs font-mono text-text-muted mb-1.5 uppercase tracking-wider">English</p>
              <p className="font-display text-4xl font-bold text-text-primary leading-tight">{card.english}</p>
            </div>

            {/* Audio */}
            {card.audioUrl && (
              <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">🔊 Pronunciation</span>
                <AudioPlayer src={card.audioUrl} />
              </div>
            )}

            {/* Roman Urdu translation */}
            <AnimatePresence mode="wait">
              {romanUrduEnabled && (
                <motion.div
                  key="ru"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-xl px-4 py-3">
                    <p className="text-xs font-mono text-brand-blue mb-1 uppercase tracking-wider">Urdu Meaning</p>
                    <p className="text-text-secondary text-base font-medium">{card.urduRoman}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Example sentence */}
            <div className="bg-bg-tertiary rounded-xl px-4 py-3 border border-border-subtle">
              <p className="text-xs font-mono text-text-muted mb-1.5 uppercase tracking-wider">Example Sentence</p>
              <p className="text-text-secondary text-sm italic leading-relaxed">"{card.exampleSentence}"</p>
            </div>
          </div>

          {/* Beginner tip */}
          <AnimatePresence>
            {showTip && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mx-5 mb-5 bg-brand-gold/8 border border-brand-gold/25 rounded-xl px-4 py-3 flex items-start gap-2.5">
                  <span className="text-base shrink-0 mt-0.5">💡</span>
                  <p className="text-xs text-brand-gold leading-relaxed">{typeConfig.tip}</p>
                  <button
                    onClick={() => setShowTip(false)}
                    className="shrink-0 text-brand-gold/50 hover:text-brand-gold ml-auto text-xs font-mono transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="md"
          onClick={goPrev}
          disabled={idx === 0}
          className="flex-1"
        >
          ← Previous
        </Button>

        <Button
          variant={isLast ? 'primary' : 'secondary'}
          size="md"
          onClick={goNext}
          className="flex-1"
        >
          {isLast ? 'Finish Lesson →' : 'Next →'}
        </Button>
      </div>

      {/* Dot indicators (up to 10) */}
      <div className="flex justify-center gap-1.5 flex-wrap">
        {cards.slice(0, Math.min(cards.length, 10)).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === idx ? 'bg-brand-red scale-125' : i < idx ? 'bg-brand-green' : 'bg-border-strong'
            }`}
          />
        ))}
        {cards.length > 10 && (
          <span className="text-xs text-text-muted font-mono">+{cards.length - 10}</span>
        )}
      </div>
    </div>
  )
}
