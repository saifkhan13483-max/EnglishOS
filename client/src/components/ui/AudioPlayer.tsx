import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AudioPlayerProps {
  src: string
  className?: string
}

const BAR_COUNT = 5

function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audioRef.current = audio
    audio.onended = () => setPlaying(false)
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
    } else {
      audio.play().catch(() => setPlaying(false))
      setPlaying(true)
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      aria-label={playing ? 'Stop audio' : 'Play audio'}
      className={[
        'inline-flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-colors duration-150',
        playing
          ? 'bg-brand-blue/15 border-brand-blue text-brand-blue'
          : 'bg-bg-tertiary border-border-subtle text-text-muted hover:text-text-secondary hover:border-border-strong',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <AnimatePresence mode="wait" initial={false}>
        {playing ? (
          <motion.div
            key="bars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-0.5 h-4"
          >
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <motion.span
                key={i}
                className="w-0.5 bg-brand-blue rounded-full"
                animate={{ height: ['4px', '14px', '6px', '12px', '4px'] }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.svg
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5,3 19,12 5,21" />
          </motion.svg>
        )}
      </AnimatePresence>

      <span className="text-xs font-body font-medium">
        {playing ? 'Playing…' : 'Play'}
      </span>
    </motion.button>
  )
}

export default AudioPlayer
