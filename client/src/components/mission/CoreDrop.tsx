import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Toggle from '@/components/ui/Toggle'
import AudioPlayer from '@/components/ui/AudioPlayer'
import PowerPackBadge from '@/components/ui/PowerPackBadge'

interface ContentCard {
  english: string
  pronunciation: string
  romanUrdu: string
  example: string
  exampleRomanUrdu: string
  isPowerPack: boolean
  audioSrc: string
}

const CARDS: ContentCard[] = [
  {
    english: 'I / You / He / She / We / They',
    pronunciation: 'ai · yoo · hee · shee · wee · dhey',
    romanUrdu: 'Mein / Tum / Woh (mard) / Woh (aurat) / Hum / Woh sab',
    example: 'I am here. You are good. He is tall.',
    exampleRomanUrdu: 'Mein yahan hoon. Tum acha ho. Woh lamba hai.',
    isPowerPack: true,
    audioSrc: '',
  },
  {
    english: 'am / is / are',
    pronunciation: 'am · iz · aar',
    romanUrdu: 'hoon / hai / hain-ho',
    example: 'I am happy. She is kind. We are ready.',
    exampleRomanUrdu: 'Mein khush hoon. Woh mehrbaan hai. Hum tayyar hain.',
    isPowerPack: true,
    audioSrc: '',
  },
  {
    english: 'want',
    pronunciation: 'wont',
    romanUrdu: 'chahna',
    example: 'I want water. She wants tea.',
    exampleRomanUrdu: 'Mein paani chahta hoon. Woh chai chahti hai.',
    isPowerPack: false,
    audioSrc: '',
  },
  {
    english: 'need',
    pronunciation: 'need',
    romanUrdu: 'zaroorat hona',
    example: 'I need help. He needs more time.',
    exampleRomanUrdu: 'Mujhe madad chahiye. Use aur waqt chahiye.',
    isPowerPack: false,
    audioSrc: '',
  },
  {
    english: 'have',
    pronunciation: 'hav',
    romanUrdu: 'rakhna / hona',
    example: 'I have a pen. She has a book.',
    exampleRomanUrdu: 'Mere paas qalam hai. Uske paas kitaab hai.',
    isPowerPack: false,
    audioSrc: '',
  },
]

interface CoreDropProps {
  onComplete: () => void
}

export default function CoreDrop({ onComplete }: CoreDropProps) {
  const [idx,        setIdx]        = useState(0)
  const [romanUrdu,  setRomanUrdu]  = useState(false)
  const [direction,  setDirection]  = useState(1)

  const card   = CARDS[idx]
  const isLast = idx === CARDS.length - 1

  function goNext() {
    setDirection(1)
    if (isLast) onComplete()
    else setIdx((i) => i + 1)
  }

  function goPrev() {
    setDirection(-1)
    setIdx((i) => Math.max(0, i - 1))
  }

  return (
    <div className="flex flex-col gap-6 py-8 px-4 max-w-lg mx-auto w-full">
      <div className="text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">Phase 2</p>
        <h2 className="font-display text-2xl font-bold text-text-primary">Today's Lesson</h2>
      </div>

      {/* Roman Urdu toggle — persists across cards */}
      <div className="flex justify-end">
        <Toggle
          checked={romanUrdu}
          onChange={setRomanUrdu}
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
          className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 flex flex-col gap-4"
        >
          {/* Power Pack badge */}
          {card.isPowerPack && (
            <div className="flex justify-end">
              <PowerPackBadge />
            </div>
          )}

          {/* English word */}
          <div>
            <p className="text-xs font-mono text-text-muted mb-1">English</p>
            <p className="font-display text-3xl font-bold text-text-primary">{card.english}</p>
          </div>

          {/* Pronunciation */}
          <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">Pronunciation</span>
            <span className="text-sm font-mono text-brand-blue">{card.pronunciation}</span>
            <AudioPlayer src={card.audioSrc} />
          </div>

          {/* Roman Urdu meaning */}
          <AnimatePresence mode="wait">
            {romanUrdu && (
              <motion.div
                key="ru"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-xl px-4 py-3">
                  <p className="text-xs font-mono text-brand-blue mb-1">Roman Urdu</p>
                  <p className="text-text-secondary text-sm font-medium">{card.romanUrdu}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Example sentence */}
          <div>
            <p className="text-xs font-mono text-text-muted mb-2">Example</p>
            <p className="text-text-secondary text-sm italic leading-relaxed">"{card.example}"</p>
            <AnimatePresence>
              {romanUrdu && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-text-muted text-xs mt-1 italic"
                >
                  "{card.exampleRomanUrdu}"
                </motion.p>
              )}
            </AnimatePresence>
          </div>
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

        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {CARDS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? 'bg-brand-red' : i < idx ? 'bg-brand-green' : 'bg-border-strong'}`}
            />
          ))}
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
