import { useEffect, useState } from 'react'
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

  // Load module content on mount
  useEffect(() => {
    const level = learnerProfile?.currentLevel ?? 1
    const module = learnerProfile?.currentModule ?? 1

    if (moduleContent.length === 0) {
      loadModuleContent(level, module)
    } else {
      setCards(moduleContent)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync cards when moduleContent arrives (already sorted: Power Pack first, then sortOrder)
  useEffect(() => {
    if (moduleContent.length > 0 && cards.length === 0) {
      setCards(moduleContent)
    }
  }, [moduleContent, cards.length])

  const card = cards[idx]
  const isLast = idx === cards.length - 1

  function goNext() {
    setDirection(1)
    if (isLast) onComplete()
    else setIdx((i) => i + 1)
  }

  function goPrev() {
    setDirection(-1)
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

  if (!card) return null

  return (
    <div className="flex flex-col gap-6 py-8 px-4 max-w-lg mx-auto w-full">
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 2</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Today's Lesson</h2>
        <p className="text-xs text-text-muted mt-1 font-mono">
          {card.groupName} · {idx + 1} / {cards.length}
        </p>
      </div>

      <div className="flex justify-end">
        <Toggle
          checked={romanUrduEnabled}
          onChange={setRomanUrduEnabled}
          label="Roman Urdu"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ x: direction * 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -60, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 flex flex-col gap-4"
        >
          {card.isPowerPack && (
            <div className="flex justify-end">
              <PowerPackBadge />
            </div>
          )}

          <div>
            <p className="text-xs font-mono text-text-muted mb-1">English</p>
            <p className="font-display text-3xl font-bold text-text-primary">{card.english}</p>
          </div>

          {card.audioUrl && (
            <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted">Audio</span>
              <AudioPlayer src={card.audioUrl} />
            </div>
          )}

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
                  <p className="text-xs font-mono text-brand-blue mb-1">Roman Urdu</p>
                  <p className="text-text-secondary text-sm font-medium">{card.urduRoman}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <p className="text-xs font-mono text-text-muted mb-2">Example</p>
            <p className="text-text-secondary text-sm italic leading-relaxed">"{card.exampleSentence}"</p>
          </div>
        </motion.div>
      </AnimatePresence>

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

        <div className="flex gap-1.5">
          {cards.slice(0, Math.min(cards.length, 10)).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === idx ? 'bg-brand-red' : i < idx ? 'bg-brand-green' : 'bg-border-strong'
              }`}
            />
          ))}
          {cards.length > 10 && (
            <span className="text-xs text-text-muted font-mono">+{cards.length - 10}</span>
          )}
        </div>

        <Button
          variant={isLast ? 'primary' : 'secondary'}
          size="md"
          onClick={goNext}
          className="flex-1"
        >
          {isLast ? 'Continue →' : 'Next →'}
        </Button>
      </div>
    </div>
  )
}
