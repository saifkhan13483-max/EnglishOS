import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

interface Flashcard {
  english: string
  romanUrdu: string
  example: string
}

const CARDS: Flashcard[] = [
  { english: 'want',       romanUrdu: 'chahna',         example: 'I want water.' },
  { english: 'understand', romanUrdu: 'samajhna',       example: 'Do you understand?' },
  { english: 'remember',   romanUrdu: 'yaad karna',     example: 'Remember this rule.' },
  { english: 'try',        romanUrdu: 'koshish karna',  example: 'Try again!' },
  { english: 'feel',       romanUrdu: 'mehsoos karna',  example: 'I feel tired.' },
]

interface WarmupFlashProps {
  onComplete: () => void
  onXpEarned: (xp: number) => void
}

export default function WarmupFlash({ onComplete, onXpEarned }: WarmupFlashProps) {
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped,   setFlipped]   = useState(false)
  const [direction, setDirection] = useState(1)

  const card = CARDS[cardIndex]
  const isLast = cardIndex === CARDS.length - 1

  function handleAnswer() {
    if (!flipped) { setFlipped(true); return }
    setDirection(1)
    setFlipped(false)
    if (isLast) {
      onXpEarned(20)
      setTimeout(onComplete, 400)
    } else {
      setCardIndex((i) => i + 1)
    }
  }

  function handleReview() {
    setFlipped(false)
    setDirection(-1)
    setTimeout(() => {
      setCardIndex((i) => (i + 1 < CARDS.length ? i + 1 : i))
      setFlipped(false)
    }, 100)
  }

  return (
    <div className="flex flex-col items-center gap-8 py-8 px-4 max-w-lg mx-auto w-full">
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 1</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Warm-Up — Quick Review</h2>
        <p className="text-sm text-text-muted mt-1">
          Card {cardIndex + 1} of {CARDS.length}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {CARDS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${i <= cardIndex ? 'bg-brand-red' : 'bg-border-strong'}`}
          />
        ))}
      </div>

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cardIndex}
          initial={{ x: direction * 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -60, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-full"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="relative w-full"
            style={{ transformStyle: 'preserve-3d', minHeight: 220 }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary border border-border-subtle rounded-2xl cursor-pointer select-none p-8"
              style={{ backfaceVisibility: 'hidden' }}
              onClick={() => setFlipped(true)}
            >
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">English</p>
              <p className="font-display text-5xl font-bold text-text-primary mb-3">{card.english}</p>
              <p className="text-sm text-text-muted">Tap to reveal meaning</p>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-bg-tertiary border border-brand-blue/40 rounded-2xl p-8"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Roman Urdu</p>
              <p className="font-display text-3xl font-bold text-brand-blue mb-4">{card.romanUrdu}</p>
              <div className="bg-bg-primary rounded-xl px-4 py-2.5 border border-border-subtle w-full text-center">
                <p className="text-sm text-text-secondary italic">"{card.example}"</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Answer buttons (visible after flip) */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="flex gap-3 w-full"
          >
            <Button
              variant="danger"
              size="md"
              className="flex-1"
              onClick={handleReview}
            >
              Review Again ✗
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1 !bg-brand-green !border-brand-green"
              onClick={handleAnswer}
            >
              Got it ✓
            </Button>
          </motion.div>
        )}
        {!flipped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Button variant="secondary" size="md" className="w-full" onClick={() => setFlipped(true)}>
              Flip Card
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
