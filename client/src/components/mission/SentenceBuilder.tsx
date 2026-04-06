import { useState, useCallback } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { getSentences } from '@/constants/sentences'
import { useProgressStore } from '@/stores/progressStore'
import { useSRStore } from '@/stores/srStore'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

// ── Draggable tile ─────────────────────────────────────────────────────────
function DraggableTile({
  id,
  label,
  disabled,
  selected,
  onTap,
}: {
  id: string
  label: string
  disabled?: boolean
  selected?: boolean
  onTap?: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled })
  const style = { transform: CSS.Translate.toString(transform) }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(disabled ? {} : attributes)}
      {...(disabled ? {} : listeners)}
      onClick={disabled ? undefined : onTap}
      title={label}
      className={[
        'px-4 py-2.5 rounded-xl border font-mono text-sm font-medium transition-colors select-none max-w-[140px]',
        isDragging
          ? 'opacity-0'
          : disabled
            ? 'bg-bg-tertiary border-border-subtle text-text-muted cursor-not-allowed opacity-50'
            : selected
              ? 'bg-brand-red/15 border-brand-red text-brand-red cursor-pointer ring-2 ring-brand-red/40'
              : 'bg-bg-secondary border-border-strong text-text-primary cursor-grab active:cursor-grabbing hover:border-brand-red/60 hover:text-brand-red',
      ].join(' ')}
    >
      <span className="block truncate">{label}</span>
    </div>
  )
}

// ── Droppable zone ─────────────────────────────────────────────────────────
function DroppableZone({
  zone, filledWith, onClear, onTapPlace, shake, correct, checked, hasSelectedTile,
}: {
  zone: { id: string; label: string }
  filledWith?: string
  onClear: () => void
  onTapPlace?: () => void
  shake?: boolean
  correct?: boolean
  checked?: boolean
  hasSelectedTile?: boolean
}) {
  const { isOver, setNodeRef } = useDroppable({ id: zone.id })
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{zone.label}</span>
      <motion.div
        ref={setNodeRef}
        animate={shake ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.45 }}
        onClick={!filledWith && hasSelectedTile ? onTapPlace : undefined}
        className={[
          'min-h-[48px] w-full rounded-xl border-2 border-dashed flex items-center justify-center px-2 transition-colors duration-150',
          !filledWith && hasSelectedTile && !checked
            ? 'border-brand-red/70 bg-brand-red/5 cursor-pointer'
            : isOver
              ? 'border-brand-red/70 bg-brand-red/5'
              : checked && correct
                ? 'border-brand-green bg-brand-green/5'
                : checked && !correct
                  ? 'border-brand-red/70 bg-brand-red/5'
                  : filledWith
                    ? 'border-border-strong bg-bg-secondary'
                    : 'border-border-subtle bg-bg-tertiary',
        ].join(' ')}
      >
        {filledWith ? (
          <button
            onClick={onClear}
            title={filledWith}
            className="px-3 py-1.5 rounded-lg font-mono text-sm font-bold text-text-primary hover:text-brand-red transition-colors flex items-center gap-1.5 max-w-full"
          >
            <span className="truncate max-w-[80px]">{filledWith}</span>
            {!checked && <span className="text-text-muted text-xs shrink-0">✕</span>}
          </button>
        ) : (
          <span className="text-xs text-text-muted font-mono">
            {hasSelectedTile && !checked ? 'tap to place' : 'drop here'}
          </span>
        )}
      </motion.div>
    </div>
  )
}

// ── Overlay tile (while dragging) ─────────────────────────────────────────
function OverlayTile({ label }: { label: string }) {
  return (
    <div
      title={label}
      className="px-4 py-2.5 rounded-xl border border-brand-red bg-bg-secondary font-mono text-sm font-medium text-brand-red shadow-2xl cursor-grabbing max-w-[140px]"
    >
      <span className="block truncate">{label}</span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────
interface SentenceBuilderProps {
  onComplete: () => void
  onXpEarned?: (xp: number) => void
}

export default function SentenceBuilder({ onComplete, onXpEarned }: SentenceBuilderProps) {
  const learnerProfile = useProgressStore(s => s.learnerProfile)
  const currentModule = learnerProfile?.currentModule ?? 2
  const { dailyQueue, markReviewed } = useSRStore()

  const exercises = getSentences(currentModule)

  const [exIdx, setExIdx] = useState(0)
  const [slots, setSlots] = useState<Record<string, string>>({})
  const [pool, setPool] = useState<string[]>(() => shuffle(exercises[0].tiles))
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [shake, setShake] = useState(false)
  const [dragging, setDragging] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)
  // Tap-to-select state for touch fallback (Edge Case 10)
  const [selectedTile, setSelectedTile] = useState<string | null>(null)

  const ex = exercises[exIdx]

  // dnd-kit sensors: mouse + touch with activation constraints
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 500, tolerance: 5 },
    }),
  )

  // Mark vocabulary words from this exercise in the SR queue
  const markVocabWords = useCallback(
    (correct: boolean) => {
      for (const word of ex.vocabWords) {
        const card = dailyQueue.find(
          c => c.english.toLowerCase() === word.toLowerCase()
        )
        if (card) {
          markReviewed(card.id, correct)
        }
      }
    },
    [ex.vocabWords, dailyQueue, markReviewed]
  )

  function handleDragStart(e: DragStartEvent) {
    setDragging(e.active.id as string)
    setSelectedTile(null)
  }

  function handleDragEnd(e: DragEndEvent) {
    setDragging(null)
    const { active, over } = e
    if (!over) return

    const tile = active.id as string
    const zoneId = over.id as string
    const validZone = ex.zones.some(z => z.id === zoneId)
    if (!validZone) return

    setSlots(prev => {
      const next = { ...prev }
      const displaced = next[zoneId]
      next[zoneId] = tile
      setPool(p => {
        const filtered = p.filter(t => t !== tile)
        return displaced ? [...filtered, displaced] : filtered
      })
      return next
    })
  }

  function clearSlot(zoneId: string) {
    if (checked) return
    setSlots(prev => {
      const tile = prev[zoneId]
      if (!tile) return prev
      setPool(p => [...p, tile])
      const next = { ...prev }
      delete next[zoneId]
      return next
    })
  }

  // Tap-to-select: select a tile from the pool, then tap a zone to place it
  function handleTileTap(label: string) {
    if (checked) return
    setSelectedTile(prev => (prev === label ? null : label))
  }

  function handleZoneTapPlace(zoneId: string) {
    if (!selectedTile || checked) return
    setSlots(prev => {
      const next = { ...prev }
      const displaced = next[zoneId]
      next[zoneId] = selectedTile
      setPool(p => {
        const filtered = p.filter(t => t !== selectedTile)
        return displaced ? [...filtered, displaced] : filtered
      })
      return next
    })
    setSelectedTile(null)
  }

  function handleCheck() {
    const allFilled = ex.zones.every(z => slots[z.id])
    if (!allFilled) return

    let correct = true
    for (const zone of ex.zones) {
      if (slots[zone.id]?.toLowerCase() !== ex.correct[zone.id]?.toLowerCase()) {
        correct = false
        break
      }
    }

    setChecked(true)
    setIsCorrect(correct)
    setSelectedTile(null)

    // Wire to SR store
    markVocabWords(correct)

    if (correct) {
      setScore(s => s + 1)
      if (onXpEarned) onXpEarned(15)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  function handleNext() {
    const next = exIdx + 1
    if (next >= exercises.length) {
      setDone(true)
      return
    }
    setExIdx(next)
    setSlots({})
    setPool(shuffle(exercises[next].tiles))
    setChecked(false)
    setIsCorrect(false)
    setShake(false)
    setSelectedTile(null)
  }

  const allFilled = ex.zones.every(z => slots[z.id])

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-12 px-4 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          className="text-6xl"
        >
          🏆
        </motion.div>
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Sentences Complete!</h2>
          <p className="text-text-secondary font-body">
            You got{' '}
            <span className="text-brand-green font-bold">{score}</span> of{' '}
            <span className="font-bold">{exercises.length}</span> sentences correct
          </p>
        </div>
        <Button variant="primary" size="lg" className="w-full" onClick={onComplete}>
          Continue to Conversation →
        </Button>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-5 py-8 px-4 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 2</p>
          <h2 className="font-display text-2xl font-bold text-text-primary">Build a Sentence</h2>
        </div>

        {/* SVO formula bar */}
        <div className="flex items-center gap-1.5 bg-bg-tertiary border border-border-subtle rounded-xl px-4 py-2.5 overflow-x-auto">
          <span className="text-xs font-mono text-text-muted uppercase tracking-wider shrink-0">Formula:</span>
          {ex.zones.map((z, i) => (
            <div key={z.id} className="flex items-center gap-1.5 shrink-0">
              {i > 0 && <span className="text-text-muted font-mono text-xs">+</span>}
              <span className="px-2 py-0.5 rounded-md bg-bg-secondary border border-border-strong text-xs font-mono text-text-secondary">
                [{z.label}]
              </span>
            </div>
          ))}
          {ex.mode === 'Question' && (
            <span className="text-xs font-mono text-brand-gold shrink-0 ml-1">+ ?</span>
          )}
        </div>

        {/* Mode badge + progress */}
        <div className="flex items-center justify-between">
          <span className={[
            'px-3 py-1 rounded-full text-xs font-mono font-bold border',
            ex.mode === 'Positive'
              ? 'bg-brand-green/10 border-brand-green/40 text-brand-green'
              : ex.mode === 'Negative'
                ? 'bg-brand-red/10 border-brand-red/40 text-brand-red'
                : 'bg-brand-blue/10 border-brand-blue/40 text-brand-blue',
          ].join(' ')}>
            {ex.mode}
          </span>
          <div className="flex gap-1.5">
            {exercises.map((_, i) => (
              <div
                key={i}
                className={[
                  'w-2 h-2 rounded-full transition-colors',
                  i < exIdx ? 'bg-brand-green' : i === exIdx ? 'bg-brand-red' : 'bg-border-strong',
                ].join(' ')}
              />
            ))}
          </div>
        </div>

        {/* Drop zones */}
        <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-4">
          <div className="flex gap-2 justify-center flex-wrap">
            {ex.zones.map(zone => (
              <DroppableZone
                key={zone.id}
                zone={zone}
                filledWith={slots[zone.id]}
                onClear={() => clearSlot(zone.id)}
                onTapPlace={() => handleZoneTapPlace(zone.id)}
                shake={shake && !isCorrect}
                correct={slots[zone.id]?.toLowerCase() === ex.correct[zone.id]?.toLowerCase()}
                checked={checked}
                hasSelectedTile={!!selectedTile}
              />
            ))}
          </div>

          <AnimatePresence>
            {checked && !isCorrect && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 overflow-hidden"
              >
                <div className="bg-brand-green/5 border border-brand-green/30 rounded-xl px-4 py-2.5">
                  <p className="text-xs font-mono text-brand-green mb-1">Correct answer:</p>
                  <p className="text-sm font-mono text-text-primary">
                    {ex.zones.map(z => ex.correct[z.id]).join(' ')}
                    {ex.mode === 'Question' ? '?' : '.'}
                  </p>
                </div>
              </motion.div>
            )}
            {checked && isCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 flex items-center justify-center gap-2"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="text-2xl"
                >
                  ✅
                </motion.span>
                <p className="text-sm font-mono text-brand-green font-bold">+15 XP — Correct!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Word tile pool */}
        <div className="bg-bg-tertiary border border-border-subtle rounded-2xl p-4">
          <p className="text-xs font-mono text-text-muted mb-3 uppercase tracking-wider">
            Word Pool — drag or tap to select, then tap a slot
          </p>
          <div className="flex flex-wrap gap-2 min-h-[48px]">
            <AnimatePresence>
              {pool.map(label => (
                <motion.div
                  key={label}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                >
                  <DraggableTile
                    id={label}
                    label={label}
                    disabled={checked}
                    selected={selectedTile === label}
                    onTap={() => handleTileTap(label)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {pool.length === 0 && !checked && (
              <p className="text-xs text-text-muted font-mono self-center">All tiles placed above</p>
            )}
          </div>
        </div>

        <p className="text-center text-xs font-mono text-text-muted">{ex.hint}</p>

        {!checked ? (
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!allFilled}
            onClick={handleCheck}
          >
            Check Sentence
          </Button>
        ) : (
          <Button variant={isCorrect ? 'primary' : 'secondary'} size="lg" className="w-full" onClick={handleNext}>
            {exIdx < exercises.length - 1 ? 'Next Sentence →' : 'See Results →'}
          </Button>
        )}
      </div>

      <DragOverlay>
        {dragging ? <OverlayTile label={dragging} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
