import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { api } from '@/services/api'
import { useProgressStore } from '@/stores/progressStore'
import { getScenario } from '@/constants/scenarios'

interface Message {
  id: number
  role: 'ai' | 'user'
  text: string
  isNotUnderstood?: boolean
}

interface ApiHistoryItem {
  role: 'user' | 'assistant'
  content: string
}

const TOTAL_SECONDS = 15 * 60

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-bg-secondary border border-border-subtle rounded-2xl rounded-tl-none w-fit">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-text-muted rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function isNotUnderstoodResponse(text: string): boolean {
  const lower = text.toLowerCase()
  return (
    lower.includes('did not understand') ||
    lower.includes("didn't understand") ||
    lower.includes('say that again') ||
    lower.includes('can you try') ||
    lower.includes('not quite understand')
  )
}

interface ConversationSimProps {
  onComplete: () => void
  onXpEarned?: (xp: number) => void
}

export default function ConversationSim({ onComplete, onXpEarned }: ConversationSimProps) {
  const learnerProfile = useProgressStore(s => s.learnerProfile)
  const currentModule = learnerProfile?.currentModule ?? 2

  const scenario = getScenario(currentModule)

  const [messages, setMessages] = useState<Message[]>([])
  const [apiHistory, setApiHistory] = useState<ApiHistoryItem[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS)

  const nextId = useRef(1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasFetchedOpener = useRef(false)

  const pushAi = useCallback((text: string) => {
    setMessages(m => [
      ...m,
      { id: nextId.current++, role: 'ai', text, isNotUnderstood: isNotUnderstoodResponse(text) },
    ])
  }, [])

  // Fetch AI opening message on mount
  useEffect(() => {
    if (hasFetchedOpener.current) return
    hasFetchedOpener.current = true

    setTyping(true)
    api
      .post<{ success: boolean; data: { message: string } }>('/api/v1/conversation/message', {
        module: currentModule,
        scenario: scenario.title,
        messageHistory: [],
      })
      .then(res => {
        setTyping(false)
        const text = res.data.message
        pushAi(text)
        setApiHistory([{ role: 'assistant', content: text }])
      })
      .catch(() => {
        setTyping(false)
        const fallback = scenario.hint
          ? `Hello! Let's practice: ${scenario.description}`
          : 'Hello! How are you today? Let us practice speaking English together.'
        pushAi(fallback)
        setApiHistory([{ role: 'assistant', content: fallback }])
      })
  }, [currentModule, scenario, pushAi])

  // Countdown timer
  useEffect(() => {
    if (completed) return
    const id = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) {
          clearInterval(id)
          setCompleted(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [completed])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function sendMessage() {
    const text = input.trim()
    if (!text || typing || completed) return
    setInput('')

    const userMsg: Message = { id: nextId.current++, role: 'user', text }
    setMessages(m => [...m, userMsg])

    const newHistory: ApiHistoryItem[] = [...apiHistory, { role: 'user', content: text }]
    setApiHistory(newHistory)

    setTyping(true)
    try {
      const res = await api.post<{ success: boolean; data: { message: string } }>(
        '/api/v1/conversation/message',
        {
          module: currentModule,
          scenario: scenario.title,
          messageHistory: newHistory,
        }
      )
      setTyping(false)
      const reply = res.data.message
      pushAi(reply)
      setApiHistory(prev => [...prev, { role: 'assistant', content: reply }])
      if (onXpEarned) onXpEarned(10)
    } catch {
      setTyping(false)
      const fallback = 'I understand. Please tell me more.'
      pushAi(fallback)
      setApiHistory(prev => [...prev, { role: 'assistant', content: fallback }])
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function handleComplete() {
    setCompleted(true)
    onComplete()
  }

  const timerWarning = timeLeft < 60
  const msgCount = messages.filter(m => m.role === 'user').length

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto w-full">
      {/* Header bar */}
      <div className="shrink-0 px-4 py-3 border-b border-border-subtle bg-bg-primary">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Phase 3</p>
            <p className="text-sm font-display font-semibold text-text-primary">Conversation Practice</p>
          </div>
          <div className={[
            'px-3 py-1.5 rounded-lg border font-mono text-sm font-bold',
            timerWarning
              ? 'bg-brand-red/10 border-brand-red/40 text-brand-red'
              : 'bg-bg-secondary border-border-subtle text-text-secondary',
          ].join(' ')}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Scenario pill */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30">
          <span className="text-xs font-mono text-brand-gold">{scenario.icon} Scenario:</span>
          <span className="text-xs font-body text-brand-gold font-medium">{scenario.title}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-[320px]">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="flex items-end gap-2 max-w-[80%]">
                  <div className="w-7 h-7 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-sm shrink-0 mb-1">
                    🤖
                  </div>
                  <div className={[
                    'rounded-2xl rounded-tl-none px-4 py-3',
                    msg.isNotUnderstood
                      ? 'bg-bg-secondary/60 border border-border-subtle/50'
                      : 'bg-bg-secondary border border-border-subtle',
                  ].join(' ')}>
                    <p className={[
                      'text-sm font-body leading-relaxed',
                      msg.isNotUnderstood ? 'text-text-muted' : 'text-text-primary',
                    ].join(' ')}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              )}
              {msg.role === 'user' && (
                <div className="max-w-[80%]">
                  <div className="bg-brand-red/15 border border-brand-red/30 rounded-2xl rounded-tr-none px-4 py-3">
                    <p className="text-sm text-text-primary font-body leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-sm shrink-0">
                🤖
              </div>
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Stats + input */}
      <div className="shrink-0 border-t border-border-subtle bg-bg-primary px-4 py-3 flex flex-col gap-3">
        {msgCount >= 3 && !completed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-brand-green border border-brand-green/30"
              onClick={handleComplete}
            >
              ✓ End Conversation ({msgCount} exchanges)
            </Button>
          </motion.div>
        )}

        {!completed ? (
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your reply in English…"
              disabled={typing}
              className="flex-1 bg-bg-secondary border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-secondary outline-none focus:border-brand-red transition-colors placeholder:text-text-muted font-body disabled:opacity-50"
            />
            <Button
              variant="primary"
              size="md"
              onClick={sendMessage}
              disabled={!input.trim() || typing}
            >
              Send
            </Button>
          </div>
        ) : (
          <Button variant="primary" size="lg" className="w-full" onClick={onComplete}>
            Continue →
          </Button>
        )}
      </div>
    </div>
  )
}
