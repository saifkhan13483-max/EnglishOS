import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useSRStore, SRCard } from '@/stores/srStore'
import { api } from '@/services/api'

interface RawQueueItem {
  id: string
  itemId: string
  intervalDays: number
  easeFactor: number
  item: {
    english: string
    urduRoman: string
    exampleSentence: string
    isPowerPack: boolean
  }
}

interface WarmupFlashProps {
  onComplete: () => void
  onXpEarned: (xp: number) => void
}

export default function WarmupFlash({ onComplete, onXpEarned }: WarmupFlashProps) {
  const { dailyQueue, loadDailyQueue, markReviewed, syncReviews } = useSRStore()
  const [cards, setCards] = useState<SRCard[]>([])
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [direction, setDirection] = useState(1)
  const [initialised, setInitialised] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isRefresherMode, setIsRefresherMode] = useState(false)
  const [showHowTo, setShowHowTo] = useState(true)

  useEffect(() => {
    async function init() {
      if (useSRStore.getState().dailyQueue.length === 0) {
        setLoading(true)
        await loadDailyQueue()
        setLoading(false)
      }
      setInitialised(true)
    }
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!initialised || cards.length > 0) return

    const snapshot = useSRStore.getState().dailyQueue.slice(0, 5)
    if (snapshot.length > 0) {
      setCards(snapshot)
      return
    }

    async function loadRecent() {
      setLoading(true)
      try {
        const res = await api.get<{ success: boolean; data: RawQueueItem[] }>(
          '/api/v1/content/sr-queue/recent'
        )
        const recent: SRCard[] = res.data.map((raw) => ({
          id: raw.id,
          itemId: raw.itemId,
          english: raw.item.english,
          romanUrdu: raw.item.urduRoman,
          example: raw.item.exampleSentence,
          isPowerPack: raw.item.isPowerPack,
          intervalDays: raw.intervalDays,
          easeFactor: raw.easeFactor,
        }))
        if (recent.length > 0) {
          setCards(recent)
          setIsRefresherMode(true)
        }
      } catch {
        // proceed with no cards
      } finally {
        setLoading(false)
      }
    }
    loadRecent()
  }, [initialised, dailyQueue, cards.length])

  const card = cards[cardIndex]
  const isLast = cardIndex === cards.length - 1

  async function finishAndSync() {
    onXpEarned(20)
    if (!isRefresherMode) await syncReviews()
    setTimeout(onComplete, 400)
  }

  function handleGotIt() {
    if (!flipped) { setFlipped(true); return }
    if (card && !isRefresherMode) markReviewed(card.itemId, true)
    setDirection(1)
    setFlipped(false)
    setShowHowTo(false)
    if (isLast || cardIndex >= cards.length - 1) finishAndSync()
    else setCardIndex((i) => i + 1)
  }

  function handleReviewAgain() {
    if (card && !isRefresherMode) markReviewed(card.itemId, false)
    setDirection(-1)
    setFlipped(false)
    setShowHowTo(false)
    setTimeout(() => setCardIndex((i) => (i + 1 < cards.length ? i + 1 : i)), 100)
  }

  // Loading states
  if (loading && !initialised) {
    return (
      <div className="flex flex-col items-center gap-8 py-16 px-4 max-w-lg mx-auto w-full">
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 1</p>
          <h2 className="font-display text-2xl font-bold text-text-primary">Warm-Up — Quick Review</h2>
        </div>
        <div className="w-full bg-bg-secondary border border-border-subtle rounded-2xl p-12 flex items-center justify-center">
          <p className="text-text-muted text-sm font-mono animate-pulse">Loading your review queue…</p>
        </div>
      </div>
    )
  }

  if (initialised && !loading && cards.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8 py-16 px-4 max-w-lg mx-auto w-full">
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 1</p>
          <h2 className="font-display text-2xl font-bold text-text-primary">Warm-Up — Quick Review</h2>
        </div>
        <div className="w-full bg-bg-secondary border border-border-subtle rounded-2xl p-10 flex flex-col items-center gap-4">
          <span className="text-4xl">✅</span>
          <p className="text-text-primary font-body font-medium text-center">No items due for review today!</p>
          <p className="text-text-muted text-sm text-center">Your spaced repetition queue is all caught up. Keep going!</p>
        </div>
        <Button variant="primary" size="lg" className="w-full" onClick={() => { onXpEarned(10); onComplete() }}>
          Continue to Today's Lesson →
        </Button>
      </div>
    )
  }

  if (loading && initialised) {
    return (
      <div className="flex flex-col items-center gap-8 py-16 px-4 max-w-lg mx-auto w-full">
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 1</p>
          <h2 className="font-display text-2xl font-bold text-text-primary">Warm-Up — Quick Review</h2>
        </div>
        <div className="w-full bg-bg-secondary border border-border-subtle rounded-2xl p-12 flex items-center justify-center">
          <p className="text-text-muted text-sm font-mono animate-pulse">Preparing refresher cards…</p>
        </div>
      </div>
    )
  }

  if (!card) return null

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 1</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Warm-Up — Quick Review</h2>
        <p className="text-sm text-text-muted mt-1">
          Card {cardIndex + 1} of {cards.length}
        </p>
      </div>

      {/* How-to guide for beginners */}
      <AnimatePresence>
        {showHowTo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden w-full"
          >
            <div className="w-full bg-brand-blue/8 border border-brand-blue/25 rounded-xl px-4 py-3 flex items-start gap-2.5">
              <span className="text-base shrink-0">💡</span>
              <div className="flex-1">
                <p className="text-xs font-mono text-brand-blue font-semibold mb-1">How to use flashcards</p>
                <p className="text-xs text-text-muted leading-relaxed">
                  See the English word → try to remember its Urdu meaning → tap to flip and check. Be honest with yourself!
                </p>
              </div>
              <button onClick={() => setShowHowTo(false)} className="text-text-muted hover:text-text-secondary text-xs ml-1 shrink-0">✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refresher mode badge */}
      {isRefresherMode && (
        <div className="w-full bg-brand-gold/10 border border-brand-gold/30 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <span className="text-base">🔄</span>
          <p className="text-xs font-mono text-brand-gold">
            Refresher Mode — reviewing recent words. Not scored.
          </p>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex gap-2">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i < cardIndex ? 'bg-brand-green' : i === cardIndex ? 'bg-brand-red' : 'bg-border-strong'
            }`}
          />
        ))}
      </div>

      {/* Flip card */}
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
            style={{ transformStyle: 'preserve-3d', minHeight: 240 }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary border border-border-subtle rounded-2xl cursor-pointer select-none p-8 gap-3"
              style={{ backfaceVisibility: 'hidden' }}
              onClick={() => setFlipped(true)}
            >
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest">English</p>
              <p className="font-display text-5xl font-bold text-text-primary text-center">{card.english}</p>
              <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-tertiary">
                <span className="text-xs text-text-muted font-mono">Tap to see Urdu meaning</span>
                <span className="text-xs">👆</span>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-bg-tertiary border border-brand-blue/40 rounded-2xl p-8 gap-3"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Urdu Meaning</p>
              <p className="font-display text-3xl font-bold text-brand-blue text-center" lang="ur">{card.romanUrdu}</p>
              <div className="bg-bg-primary rounded-xl px-4 py-2.5 border border-border-subtle w-full text-center mt-1">
                <p className="text-xs font-mono text-text-muted mb-1">Example</p>
                <p className="text-sm text-text-secondary italic">"{card.example}"</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 w-full"
          >
            <p className="text-xs font-mono text-text-muted text-center">Did you remember the meaning?</p>
            <div className="flex gap-3 w-full">
              {isRefresherMode ? (
                <>
                  <Button variant="secondary" size="md" className="flex-1" onClick={handleReviewAgain}>
                    Next Card →
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1 !bg-brand-green !border-brand-green"
                    onClick={handleGotIt}
                  >
                    Got it ✓
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="danger" size="md" className="flex-1" onClick={handleReviewAgain}>
                    ✗ Forgot it
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1 !bg-brand-green !border-brand-green"
                    onClick={handleGotIt}
                  >
                    ✓ Got it!
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
        {!flipped && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
            <Button variant="secondary" size="md" className="w-full" onClick={() => setFlipped(true)}>
              Flip Card — See Meaning
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
