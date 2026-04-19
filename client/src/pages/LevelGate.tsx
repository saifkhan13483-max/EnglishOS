import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import LevelWrapCeremony from '@/components/mission/LevelWrapCeremony'
import { useProgressStore } from '@/stores/progressStore'
import { trackEvent } from '@/utils/analytics'

// ── Question types & data ─────────────────────────────────────────────────────

type QuestionType = 'vocab' | 'grammar' | 'sentence'

interface Question {
  id: number
  type: QuestionType
  prompt: string
  hint: string
  answer?: string
  options?: string[]
  correct?: number
  sentence?: string
  isCorrect?: boolean
}

// ── Level-specific question banks ─────────────────────────────────────────────

const QUESTIONS_LEVEL_1: Question[] = [
  {
    id: 1, type: 'vocab',
    prompt: 'Type the English meaning of: "yaad karna"',
    hint: 'Think about when you try to recall something from the past.',
    answer: 'remember',
  },
  {
    id: 2, type: 'grammar',
    prompt: 'Which sentence is grammatically correct?',
    hint: 'Remember the SVO formula and the negative rule.',
    options: [
      'She do not go to school.',
      'She does not go to school.',
      'She not does go to school.',
      'She is not go to school.',
    ],
    correct: 1,
  },
  {
    id: 3, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'Check the subject-verb agreement rule.',
    sentence: 'He are my friend.',
    isCorrect: false,
  },
  {
    id: 4, type: 'vocab',
    prompt: 'Type the English meaning of: "samajhna"',
    hint: 'Think about when something becomes clear in your mind.',
    answer: 'understand',
  },
  {
    id: 5, type: 'grammar',
    prompt: 'Which word completes the sentence correctly? "I ___ very happy today."',
    hint: 'Remember: "am" goes with "I".',
    options: ['is', 'are', 'am', 'be'],
    correct: 2,
  },
  {
    id: 6, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'Check: does "They" need "do not" or "does not"?',
    sentence: 'They do not like cold weather.',
    isCorrect: true,
  },
  {
    id: 7, type: 'vocab',
    prompt: 'Type the English meaning of: "koshish karna"',
    hint: 'Think about making effort toward a goal.',
    answer: 'try',
  },
  {
    id: 8, type: 'grammar',
    prompt: 'Which sentence asks a correct question?',
    hint: 'Questions start with Do/Does/Is/Are.',
    options: [
      'You do like tea?',
      'Like you tea?',
      'Do you like tea?',
      'You like tea do?',
    ],
    correct: 2,
  },
  {
    id: 9, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'Think about the SVO formula. Is the word order right?',
    sentence: 'Eats she rice every day.',
    isCorrect: false,
  },
  {
    id: 10, type: 'vocab',
    prompt: 'Type the English meaning of: "seekhna"',
    hint: 'Think about gaining new knowledge or skill.',
    answer: 'learn',
  },
  {
    id: 11, type: 'grammar',
    prompt: 'What is the English word for the number "Paanch"?',
    hint: 'Think about counting: one, two, three, four, ___',
    options: ['Four', 'Five', 'Six', 'Seven'],
    correct: 1,
  },
  {
    id: 12, type: 'grammar',
    prompt: 'Which is the correct English name for "Juma" (the holy day)?',
    hint: 'Days of the week: Monday, Tuesday, Wednesday, Thursday, ___, Saturday, Sunday',
    options: ['Thursday', 'Saturday', 'Friday', 'Sunday'],
    correct: 2,
  },
  {
    id: 13, type: 'vocab',
    prompt: 'Complete the self-introduction: "My ___ is Ali."',
    hint: 'This is the first thing you say when you introduce yourself.',
    answer: 'name',
  },
  {
    id: 14, type: 'sentence',
    prompt: 'Is this self-introduction correct?',
    hint: 'Check if the sentence structure is right for introducing yourself.',
    sentence: 'My name is Sara. I am from Karachi.',
    isCorrect: true,
  },
]

const QUESTIONS_LEVEL_2: Question[] = [
  {
    id: 1, type: 'vocab',
    prompt: 'Type the past tense of the verb: "go"',
    hint: 'This is an irregular verb — it does not just add -ed.',
    answer: 'went',
  },
  {
    id: 2, type: 'grammar',
    prompt: 'Which sentence uses Present Continuous correctly?',
    hint: 'Present Continuous = Subject + is/am/are + verb-ing.',
    options: ['She is eat rice.', 'She eats rice now.', 'She is eating rice.', 'She eating rice.'],
    correct: 2,
  },
  {
    id: 3, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: '"am went" mixes two tenses — only one verb form needed.',
    sentence: 'I am went to the market.',
    isCorrect: false,
  },
  {
    id: 4, type: 'vocab',
    prompt: 'Type the past tense of the verb: "eat"',
    hint: 'Another irregular verb — think about what you "ate" yesterday.',
    answer: 'ate',
  },
  {
    id: 5, type: 'grammar',
    prompt: 'Which Past Simple question is correct?',
    hint: 'Past Simple questions use "Did" + base verb (not past form).',
    options: ['Did you went?', 'Did you go?', 'You did go?', 'Went you?'],
    correct: 1,
  },
  {
    id: 6, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'With "does not", the verb stays in base form (no -s, no -es).',
    sentence: 'She doesn\'t likes tea.',
    isCorrect: false,
  },
  {
    id: 7, type: 'vocab',
    prompt: 'Type the English meaning of: "kal" (aane wala)',
    hint: 'This refers to the day after today.',
    answer: 'tomorrow',
  },
  {
    id: 8, type: 'grammar',
    prompt: 'Which sentence correctly shows the Future tense (Going To)?',
    hint: 'Going To = Subject + am/is/are + going to + base verb.',
    options: [
      'I go to the market later.',
      'I went to the market tomorrow.',
      'I am going to study tomorrow.',
      'I will going study tomorrow.',
    ],
    correct: 2,
  },
  {
    id: 9, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: '"They" is plural — use "were", not "was".',
    sentence: 'They was playing cricket.',
    isCorrect: false,
  },
  {
    id: 10, type: 'vocab',
    prompt: 'Type the English meaning of: "maafi maangna"',
    hint: 'You say this when you have done something wrong.',
    answer: 'apologize',
  },
  {
    id: 11, type: 'grammar',
    prompt: 'Which sentence is Past Simple tense?',
    hint: 'Past Simple uses the past form of the verb without any helper.',
    options: ['He runs fast yesterday.', 'He runned fast.', 'He ran fast.', 'He was run fast.'],
    correct: 2,
  },
  {
    id: 12, type: 'grammar',
    prompt: 'Complete: "I ___ to the market yesterday."',
    hint: 'Yesterday tells us this is past tense.',
    options: ['go', 'went', 'gone', 'going'],
    correct: 1,
  },
  {
    id: 13, type: 'vocab',
    prompt: 'Type the English meaning of: "roz"',
    hint: 'This word describes how often something happens — daily.',
    answer: 'every day',
  },
  {
    id: 14, type: 'sentence',
    prompt: 'Is this polite phrase correct?',
    hint: 'This is a natural everyday expression for not understanding.',
    sentence: 'Can you please repeat that? I didn\'t understand.',
    isCorrect: true,
  },
]

const QUESTIONS_LEVEL_3: Question[] = [
  {
    id: 1, type: 'vocab',
    prompt: 'Type the English meaning of: "mushkil"',
    hint: 'When something is not easy to do, it is ___.',
    answer: 'difficult',
  },
  {
    id: 2, type: 'grammar',
    prompt: 'Which sentence is Present Perfect tense?',
    hint: 'Present Perfect = Subject + have/has + past participle.',
    options: ['I eat already.', 'I have eaten.', 'I was eating.', 'I am eating now.'],
    correct: 1,
  },
  {
    id: 3, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'Present Perfect Continuous uses "have/has been + verb-ing".',
    sentence: 'She has been studied for two hours.',
    isCorrect: false,
  },
  {
    id: 4, type: 'vocab',
    prompt: 'Type the English meaning of: "udaas"',
    hint: 'This is the opposite of happy.',
    answer: 'sad',
  },
  {
    id: 5, type: 'grammar',
    prompt: 'Which sentence uses Past Perfect correctly?',
    hint: 'Past Perfect = had + past participle.',
    options: ['He had went home.', 'He have gone home.', 'He had gone home.', 'He gone home.'],
    correct: 2,
  },
  {
    id: 6, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: 'Past Perfect is used when one past event happened before another.',
    sentence: 'By the time she arrived, they had already left.',
    isCorrect: true,
  },
  {
    id: 7, type: 'vocab',
    prompt: 'Type the English meaning of: "mukhtalif"',
    hint: 'When two things are not the same, they are ___.',
    answer: 'different',
  },
  {
    id: 8, type: 'grammar',
    prompt: 'Which sentence is in Passive Voice?',
    hint: 'Passive voice = Object + was/were + past participle.',
    options: ['They ate the food.', 'The food was eaten.', 'She was eating the food.', 'He did eat food.'],
    correct: 1,
  },
  {
    id: 9, type: 'sentence',
    prompt: 'Is this Passive Voice sentence correct or incorrect?',
    hint: 'The past participle of "write" is "written", not "wrote".',
    sentence: 'The book was wrote by the author.',
    isCorrect: false,
  },
  {
    id: 10, type: 'vocab',
    prompt: 'Type the English meaning of: "alag"',
    hint: 'When things are not together or not the same.',
    answer: 'separate',
  },
  {
    id: 11, type: 'grammar',
    prompt: 'Which Type 1 Conditional sentence is correct?',
    hint: 'Type 1: If + Present Simple, will + base verb.',
    options: [
      'If he study, he pass.',
      'If he studies, he will pass.',
      'If he will study, he passes.',
      'If he studied, he passes.',
    ],
    correct: 1,
  },
  {
    id: 12, type: 'grammar',
    prompt: 'Complete: "The report ___ submitted by next week."',
    hint: 'Future Passive uses "will be + past participle".',
    options: ['has been', 'will have been', 'will be', 'had been'],
    correct: 2,
  },
  {
    id: 13, type: 'vocab',
    prompt: 'Type the English meaning of: "shukriya"',
    hint: 'What you say when someone helps you or does something kind.',
    answer: 'thank you',
  },
  {
    id: 14, type: 'sentence',
    prompt: 'Is this Present Perfect Continuous sentence correct?',
    hint: 'For time duration we use "for" — not "since".',
    sentence: 'She has been living in London for three years.',
    isCorrect: true,
  },
]

const QUESTIONS_LEVEL_4: Question[] = [
  {
    id: 1, type: 'vocab',
    prompt: 'Type the English meaning of: "zaroor"',
    hint: 'When something is absolutely needed or certain to happen.',
    answer: 'definitely',
  },
  {
    id: 2, type: 'grammar',
    prompt: 'Which linking word shows contrast (opposite idea)?',
    hint: 'This word connects two ideas that go against each other.',
    options: ['Furthermore', 'However', 'Therefore', 'Moreover'],
    correct: 1,
  },
  {
    id: 3, type: 'sentence',
    prompt: 'Is this sentence correct or incorrect?',
    hint: '"Despite" is never followed by "of" — use "Despite" directly.',
    sentence: 'Despite of the rain, we went outside.',
    isCorrect: false,
  },
  {
    id: 4, type: 'vocab',
    prompt: 'Type the English meaning of: "baghair"',
    hint: 'This word means "not having" something.',
    answer: 'without',
  },
  {
    id: 5, type: 'grammar',
    prompt: 'Which is the correct formal letter opening?',
    hint: 'Formal letters use respectful titles and proper punctuation.',
    options: ['Hey you!', 'Dear Sir/Madam,', 'Hello friend,', 'Hi there,'],
    correct: 1,
  },
  {
    id: 6, type: 'sentence',
    prompt: 'Is this formal email sentence correct?',
    hint: 'This is a standard phrase used in professional writing.',
    sentence: 'I am writing to inform you about the schedule.',
    isCorrect: true,
  },
  {
    id: 7, type: 'vocab',
    prompt: 'Type the English meaning of: "jaldi"',
    hint: 'When you move fast or do something fast.',
    answer: 'quickly',
  },
  {
    id: 8, type: 'grammar',
    prompt: 'Which sentence uses a relative clause correctly?',
    hint: 'Use "who" for people, "which" for things.',
    options: [
      'The man who works here is my uncle.',
      'The man which works here is my uncle.',
      'The man that he works here is my uncle.',
      'The man who he works is my uncle.',
    ],
    correct: 0,
  },
  {
    id: 9, type: 'sentence',
    prompt: 'Is this relative clause sentence correct?',
    hint: '"which" can be used for things — like a report.',
    sentence: 'The report which I submitted yesterday was approved.',
    isCorrect: true,
  },
  {
    id: 10, type: 'vocab',
    prompt: 'Type the English meaning of: "muqabla"',
    hint: 'When two people or teams compete against each other.',
    answer: 'competition',
  },
  {
    id: 11, type: 'grammar',
    prompt: 'What does the idiom "once in a blue moon" mean?',
    hint: 'Think about something that almost never happens.',
    options: ['Very often', 'Very rarely', 'Once a month', 'At midnight'],
    correct: 1,
  },
  {
    id: 12, type: 'grammar',
    prompt: 'Which sentence sounds most formal and professional?',
    hint: 'Formal writing avoids slang and contractions.',
    options: ["We wanna talk.", "I'm gonna go.", 'I wish to discuss this matter.', "Let's chat about it."],
    correct: 2,
  },
  {
    id: 13, type: 'vocab',
    prompt: 'Type the English meaning of: "bahas"',
    hint: 'When people talk and disagree about a topic.',
    answer: 'argument',
  },
  {
    id: 14, type: 'sentence',
    prompt: 'Is this complex sentence correct?',
    hint: '"Not only... but also" is a standard advanced sentence structure.',
    sentence: 'Not only did she win the prize, but she also set a new record.',
    isCorrect: true,
  },
]

const QUESTIONS_LEVEL_5: Question[] = [
  {
    id: 1, type: 'vocab',
    prompt: 'Type the English meaning of: "ummid"',
    hint: 'When you believe something good will happen in the future.',
    answer: 'hope',
  },
  {
    id: 2, type: 'grammar',
    prompt: 'Which is a Type 2 Conditional sentence?',
    hint: 'Type 2: If + Past Simple, would + base verb (imaginary situation).',
    options: [
      'If it rains, I stay home.',
      'If it rained, I would stay home.',
      'If it had rained, I would have stayed.',
      'If it rains, I will stay home.',
    ],
    correct: 1,
  },
  {
    id: 3, type: 'sentence',
    prompt: 'Is this Type 3 Conditional sentence correct?',
    hint: 'Type 3: If + Past Perfect, would have + past participle.',
    sentence: 'If I would have studied harder, I had passed the exam.',
    isCorrect: false,
  },
  {
    id: 4, type: 'vocab',
    prompt: 'Type the English meaning of: "tawajjuh"',
    hint: 'What a teacher asks students to give during a lesson.',
    answer: 'attention',
  },
  {
    id: 5, type: 'grammar',
    prompt: 'What does the phrasal verb "give up" mean?',
    hint: 'Think about someone who stops trying because it is too hard.',
    options: ['give a gift', 'surrender/stop trying', 'increase an amount', 'call off a meeting'],
    correct: 1,
  },
  {
    id: 6, type: 'sentence',
    prompt: 'Is this Passive Voice sentence correct?',
    hint: '"was been" is not correct — passive uses was/were + past participle directly.',
    sentence: 'The project was been completed by our team.',
    isCorrect: false,
  },
  {
    id: 7, type: 'vocab',
    prompt: 'Type the English meaning of: "faisla"',
    hint: 'When you choose between options and make up your mind.',
    answer: 'decision',
  },
  {
    id: 8, type: 'grammar',
    prompt: 'Which phrasal verb means "to cancel"?',
    hint: 'Think about calling something off before it happens.',
    options: ['call up', 'call on', 'call off', 'call in'],
    correct: 2,
  },
  {
    id: 9, type: 'sentence',
    prompt: 'Is this Present Perfect Continuous sentence correct?',
    hint: 'For duration (a period of time), use "for" — not "since".',
    sentence: 'She has been working on this project since six months.',
    isCorrect: false,
  },
  {
    id: 10, type: 'vocab',
    prompt: 'Type the English meaning of: "mustaqqil"',
    hint: 'When you do not need others to help you.',
    answer: 'independent',
  },
  {
    id: 11, type: 'grammar',
    prompt: 'Which is the correct way to begin a formal business request?',
    hint: 'Business English is polite, professional, and clear.',
    options: [
      'Gimme the report.',
      'I would like to request...',
      'Send me the report asap.',
      'Hey, can you send?',
    ],
    correct: 1,
  },
  {
    id: 12, type: 'grammar',
    prompt: 'What does "raining cats and dogs" mean?',
    hint: 'This idiom has nothing to do with actual animals.',
    options: ['Cats and dogs are outside.', 'It is raining very heavily.', 'The weather is mild.', 'Animals are in the rain.'],
    correct: 1,
  },
  {
    id: 13, type: 'vocab',
    prompt: 'Type the English meaning of: "taraqqi"',
    hint: 'When someone improves and moves forward in life or work.',
    answer: 'progress',
  },
  {
    id: 14, type: 'sentence',
    prompt: 'Is this Passive Voice sentence correct?',
    hint: 'Passive voice: Subject + was/were + past participle + by + agent.',
    sentence: 'He was made the project manager by the CEO last quarter.',
    isCorrect: true,
  },
]

const QUESTIONS_LEVEL_6: Question[] = [
  {
    id: 1, type: 'vocab',
    prompt: 'Type the English meaning of: "mahir"',
    hint: 'Someone who is very skilled and experienced in a field.',
    answer: 'expert',
  },
  {
    id: 2, type: 'grammar',
    prompt: 'Which is a professional email sign-off?',
    hint: 'Professional emails end with a formal closing phrase.',
    options: ['Cya!', 'Yours sincerely,', 'Bye bye,', 'See you!'],
    correct: 1,
  },
  {
    id: 3, type: 'sentence',
    prompt: 'Is this email closing sentence correct?',
    hint: '"look forward to" must be followed by a gerund (verb+ing), not base verb.',
    sentence: 'I look forward to hear from you.',
    isCorrect: false,
  },
  {
    id: 4, type: 'vocab',
    prompt: 'Type the English meaning of: "qaabil"',
    hint: 'When someone has the ability or talent to do something.',
    answer: 'capable',
  },
  {
    id: 5, type: 'grammar',
    prompt: 'Which phrase correctly introduces an opinion in an IELTS essay?',
    hint: 'IELTS essays use formal, structured language for opinions.',
    options: ['In my opinion,', 'I think so.', 'Opinion:', 'What I believe:'],
    correct: 0,
  },
  {
    id: 6, type: 'sentence',
    prompt: 'Is this interview sentence correct?',
    hint: '"My greatest strength" is singular — which "be" verb goes with a singular subject?',
    sentence: 'My greatest strength are my communication skills.',
    isCorrect: false,
  },
  {
    id: 7, type: 'vocab',
    prompt: 'Type the English meaning of: "musalsal"',
    hint: 'When something happens without stopping, one after another.',
    answer: 'continuous',
  },
  {
    id: 8, type: 'grammar',
    prompt: 'Which sentence demonstrates advanced professional vocabulary?',
    hint: 'Professional English uses precise and formal words.',
    options: [
      'The policy caused big problems.',
      'The policy precipitated significant challenges.',
      'The policy made big issues.',
      'The policy gave problems.',
    ],
    correct: 1,
  },
  {
    id: 9, type: 'sentence',
    prompt: 'Is this advanced sentence correct?',
    hint: '"Despite" + noun/gerund phrase + comma + main clause is correct.',
    sentence: 'Despite facing numerous obstacles, she persevered and achieved her goals.',
    isCorrect: true,
  },
  {
    id: 10, type: 'vocab',
    prompt: 'Type the English meaning of: "nawkari"',
    hint: 'What you apply for when you want to earn money.',
    answer: 'job',
  },
  {
    id: 11, type: 'grammar',
    prompt: 'Which phrase correctly describes a graph trend for IELTS?',
    hint: 'IELTS graph descriptions use formal language for trends.',
    options: [
      'The graph go up in 2020.',
      'There was a sharp increase in 2020.',
      '2020 had much increase.',
      'In 2020 it increased much.',
    ],
    correct: 1,
  },
  {
    id: 12, type: 'grammar',
    prompt: 'Which sentence is most appropriate for a job cover letter?',
    hint: 'Cover letters are formal — avoid casual language.',
    options: [
      'I am good at my job.',
      'I possess extensive experience in project management.',
      'I worked before in this field.',
      'Please hire me, I am good.',
    ],
    correct: 1,
  },
  {
    id: 13, type: 'vocab',
    prompt: 'Type the English meaning of: "tafseel"',
    hint: 'When you give more information about something.',
    answer: 'detail',
  },
  {
    id: 14, type: 'sentence',
    prompt: 'Is this IELTS-style academic sentence correct?',
    hint: 'Academic English uses formal vocabulary like "acknowledged" and "pivotal".',
    sentence: 'It is widely acknowledged that education plays a pivotal role in societal development.',
    isCorrect: true,
  },
]

const QUESTIONS_BY_LEVEL: Record<number, Question[]> = {
  1: QUESTIONS_LEVEL_1,
  2: QUESTIONS_LEVEL_2,
  3: QUESTIONS_LEVEL_3,
  4: QUESTIONS_LEVEL_4,
  5: QUESTIONS_LEVEL_5,
  6: QUESTIONS_LEVEL_6,
}

// ── Level-specific wrap stats ─────────────────────────────────────────────────

const LEVEL_WRAP_STATS: Record<number, { vocabWords: number; grammarRules: number; feynmanImprovement: number }> = {
  1: { vocabWords: 100,  grammarRules: 8,  feynmanImprovement: 34 },
  2: { vocabWords: 250,  grammarRules: 15, feynmanImprovement: 28 },
  3: { vocabWords: 500,  grammarRules: 20, feynmanImprovement: 25 },
  4: { vocabWords: 750,  grammarRules: 28, feynmanImprovement: 30 },
  5: { vocabWords: 1000, grammarRules: 35, feynmanImprovement: 22 },
  6: { vocabWords: 1500, grammarRules: 42, feynmanImprovement: 20 },
}

const PASS_THRESHOLD    = 70
const GATE_COOLDOWN_KEY = 'eos_gate_failed_at'
const COOLDOWN_MS       = 24 * 60 * 60 * 1000

// ── Cooldown helpers ──────────────────────────────────────────────────────────
function saveCooldown() {
  localStorage.setItem(GATE_COOLDOWN_KEY, String(Date.now()))
}

function getCooldownRemaining(): number {
  try {
    const raw = localStorage.getItem(GATE_COOLDOWN_KEY)
    if (!raw) return 0
    const failedAt = parseInt(raw, 10)
    const elapsed  = Date.now() - failedAt
    const remaining = Math.max(0, Math.ceil((COOLDOWN_MS - elapsed) / 1000))
    if (remaining === 0) localStorage.removeItem(GATE_COOLDOWN_KEY)
    return remaining
  } catch {
    return 0
  }
}

// ── Utility ───────────────────────────────────────────────────────────────────
function useCountdown(initialSeconds: number) {
  const [remaining, setRemaining] = useState(initialSeconds)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (initialSeconds <= 0) return
    ref.current = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000)
    return () => { if (ref.current) clearInterval(ref.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  const formatted = `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
  return { remaining, formatted }
}

// ── Question card ─────────────────────────────────────────────────────────────
function VocabQuestion({ question, onAnswer }: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')

  function check() {
    const userAnswer = input.trim().toLowerCase()
    const correctAnswer = question.answer!.toLowerCase()
    const correct = userAnswer === correctAnswer || correctAnswer.split('/').map(s => s.trim()).includes(userAnswer)
    setStatus(correct ? 'correct' : 'wrong')
    setTimeout(() => { setStatus('idle'); setInput(''); onAnswer(correct) }, 1100)
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        autoFocus
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && input.trim() && status === 'idle' && check()}
        placeholder="Type your answer…"
        disabled={status !== 'idle'}
        className={[
          'w-full bg-bg-tertiary border rounded-xl px-4 py-3 text-base font-body text-text-primary placeholder:text-text-muted focus:outline-none transition-all',
          status === 'correct' ? 'border-brand-green bg-brand-green/5' :
          status === 'wrong'   ? 'border-brand-red bg-brand-red/5' :
          'border-border-subtle focus:border-brand-blue',
        ].join(' ')}
      />
      {status !== 'idle' && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm font-body text-center ${status === 'correct' ? 'text-brand-green' : 'text-brand-red'}`}
        >
          {status === 'correct' ? `✓ Correct! "${question.answer}"` : `✗ The answer is "${question.answer}"`}
        </motion.p>
      )}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!input.trim() || status !== 'idle'}
        onClick={check}
      >
        Check Answer
      </Button>
    </div>
  )
}

function GrammarQuestion({ question, onAnswer }: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)

  function choose(i: number) {
    if (locked) return
    setSelected(i)
    setLocked(true)
    const correct = i === question.correct
    setTimeout(() => { setSelected(null); setLocked(false); onAnswer(correct) }, 1200)
  }

  return (
    <div className="flex flex-col gap-3">
      {question.options!.map((opt, i) => {
        const isSelected = selected === i
        const isCorrect  = i === question.correct
        const style =
          !locked || !isSelected ? 'border-border-subtle hover:border-brand-blue hover:bg-brand-blue/5' :
          isCorrect ? 'border-brand-green bg-brand-green/5 text-brand-green' :
                      'border-brand-red bg-brand-red/5 text-brand-red'

        return (
          <motion.button
            key={i}
            whileTap={locked ? {} : { scale: 0.98 }}
            onClick={() => choose(i)}
            disabled={locked}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-body transition-all ${style} ${locked && !isSelected ? 'opacity-40' : ''}`}
          >
            <span className="font-mono text-text-muted mr-3">{String.fromCharCode(65 + i)}.</span>
            {opt}
          </motion.button>
        )
      })}
    </div>
  )
}

function SentenceQuestion({ question, onAnswer }: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const [status, setStatus] = useState<'idle' | 'done'>('idle')

  function choose(userSaysCorrect: boolean) {
    if (status !== 'idle') return
    setStatus('done')
    const correct = userSaysCorrect === question.isCorrect
    setTimeout(() => { setStatus('idle'); onAnswer(correct) }, 1000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-bg-tertiary border border-border-subtle rounded-xl px-4 py-4 text-center">
        <p className="font-display font-bold text-text-primary text-lg leading-snug">
          "{question.sentence}"
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant={status === 'done' && !question.isCorrect ? 'primary' : 'secondary'}
          size="lg"
          className="flex-1"
          disabled={status !== 'idle'}
          onClick={() => choose(false)}
        >
          ✗ Incorrect
        </Button>
        <Button
          variant={status === 'done' && question.isCorrect ? 'primary' : 'secondary'}
          size="lg"
          className="flex-1"
          disabled={status !== 'idle'}
          onClick={() => choose(true)}
        >
          ✓ Correct
        </Button>
      </div>
    </div>
  )
}

// ── Badge for question type ───────────────────────────────────────────────────
const TYPE_LABELS: Record<QuestionType, { label: string; color: string }> = {
  vocab:    { label: 'Vocabulary Recall',   color: '#4A9EFF' },
  grammar:  { label: 'Grammar Rule',        color: '#F5B014' },
  sentence: { label: 'Sentence Check',      color: '#2ECC71' },
}

// ── Score reveal ──────────────────────────────────────────────────────────────
function ScoreReveal({ correct, total, wrongIds, questions, levelName, onRetry, onPass }: {
  correct: number
  total: number
  wrongIds: number[]
  questions: Question[]
  levelName: string
  onRetry: () => void
  onPass: () => void
}) {
  const pct = Math.round((correct / total) * 100)
  const passed = pct >= PASS_THRESHOLD

  useEffect(() => {
    if (!passed) saveCooldown()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { formatted } = useCountdown(getCooldownRemaining())

  const wrongAreas = [
    ...new Set(wrongIds.map(id => {
      const q = questions.find(q => q.id === id)
      if (!q) return null
      if (q.type === 'vocab')    return 'Vocabulary'
      if (q.type === 'grammar')  return 'Grammar Rules'
      if (q.type === 'sentence') return 'Sentence Identification'
      return null
    }).filter(Boolean))
  ] as string[]

  return (
    <motion.div
      key="score-reveal"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="flex flex-col items-center gap-6 py-4"
    >
      {/* Score circle */}
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="#2A2A3E" strokeWidth="12" />
          <motion.circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke={passed ? '#2ECC71' : '#E94560'}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 70}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - pct / 100) }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            transform="rotate(-90 80 80)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-4xl" style={{ color: passed ? '#2ECC71' : '#E94560' }}>
            {pct}%
          </span>
          <span className="text-xs font-mono text-text-muted mt-0.5">{correct}/{total} correct</span>
        </div>
      </div>

      {passed ? (
        <>
          <div className="text-center">
            <p className="font-display font-bold text-text-primary text-2xl mb-1">Level Gate Passed! 🎉</p>
            <p className="text-sm text-text-secondary font-body">
              You have proven your mastery of {levelName}.
            </p>
          </div>
          <Button variant="primary" size="lg" className="w-full max-w-sm" onClick={onPass}>
            Begin Level Wrap →
          </Button>
        </>
      ) : (
        <>
          <div className="text-center">
            <p className="font-display font-bold text-text-primary text-2xl mb-1">Not Quite Yet</p>
            <p className="text-sm text-text-secondary font-body">
              You need {PASS_THRESHOLD}% to pass. Review the areas below and try again.
            </p>
          </div>

          {wrongAreas.length > 0 && (
            <div className="w-full max-w-sm bg-bg-secondary border border-border-subtle rounded-2xl p-4">
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Areas to Review</p>
              <div className="flex flex-col gap-2">
                {wrongAreas.map(m => (
                  <div key={m} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                    <span className="text-sm font-body text-text-secondary">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-brand-red/10 border border-brand-red/30 rounded-2xl px-4 py-3 w-full max-w-sm text-center">
            <p className="text-xs font-mono text-brand-red uppercase tracking-wider mb-1">24-Hour Cooldown</p>
            <p className="font-display font-bold text-text-primary text-xl">{formatted}</p>
            <p className="text-xs text-text-muted mt-1 font-body">until next attempt</p>
          </div>

          <Button variant="secondary" size="lg" className="w-full max-w-sm" onClick={onRetry}>
            ← Go Back and Review
          </Button>
        </>
      )}
    </motion.div>
  )
}

// ── Level metadata ─────────────────────────────────────────────────────────────

const LEVEL_NAMES: Record<number, string> = {
  1: 'Base Camp',
  2: 'Village',
  3: 'Town',
  4: 'City',
  5: 'Capital',
  6: 'World Stage',
}

// ── Cooldown blocked screen ───────────────────────────────────────────────────
function CooldownBlocked({ onBack }: { onBack: () => void }) {
  const { formatted } = useCountdown(getCooldownRemaining())
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4 gap-6">
      <div className="text-center">
        <p className="text-5xl mb-4">🔒</p>
        <p className="font-display font-bold text-text-primary text-2xl mb-2">Gate Locked</p>
        <p className="text-sm text-text-secondary font-body max-w-xs">
          You need to review and come back after the cooldown. Use this time to practice your weak modules.
        </p>
      </div>
      <div className="bg-brand-red/10 border border-brand-red/30 rounded-2xl px-6 py-4 text-center">
        <p className="text-xs font-mono text-brand-red uppercase tracking-wider mb-1">Next Attempt In</p>
        <p className="font-display font-bold text-text-primary text-3xl">{formatted}</p>
      </div>
      <Button variant="secondary" size="lg" onClick={onBack}>← Back to Map</Button>
    </div>
  )
}

// ── Inner page (shown only when no active cooldown) ───────────────────────────
function LevelGateInner() {
  const navigate = useNavigate()
  const learnerProfile = useProgressStore(s => s.learnerProfile)

  const level = learnerProfile?.currentLevel ?? 1
  const levelName = LEVEL_NAMES[level] ?? `Level ${level}`
  const questions = QUESTIONS_BY_LEVEL[level] ?? QUESTIONS_LEVEL_1

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showHint, setShowHint] = useState(false)
  const [done, setDone] = useState(false)
  const [wrongIds, setWrongIds] = useState<number[]>([])
  const [showCeremony, setShowCeremony] = useState(false)

  const current = questions[currentIdx]
  const total   = questions.length
  const pct     = Math.round((currentIdx / total) * 100)

  function handleAnswer(correct: boolean) {
    const newAnswers = [...answers, correct]
    setAnswers(newAnswers)
    setShowHint(false)

    if (!correct) setWrongIds(prev => [...prev, current.id])

    if (currentIdx + 1 >= total) {
      const finalCorrect = newAnswers.filter(Boolean).length
      const pctFinal = Math.round((finalCorrect / total) * 100)
      const passed = pctFinal >= PASS_THRESHOLD

      trackEvent('level_gate_attempted', { level, score_pct: pctFinal, correct: finalCorrect, total })
      if (passed) {
        trackEvent('level_gate_passed', { level, score_pct: pctFinal })
      } else {
        trackEvent('level_gate_failed', { level, score_pct: pctFinal, wrong_count: total - finalCorrect })
      }

      setDone(true)
    } else {
      setCurrentIdx(i => i + 1)
    }
  }

  const correctCount = answers.filter(Boolean).length

  // Show the ceremony overlay when the gate is passed
  if (showCeremony) {
    const wrapStats = LEVEL_WRAP_STATS[level] ?? LEVEL_WRAP_STATS[1]
    return (
      <LevelWrapCeremony
        level={level}
        locationName={levelName}
        stats={{
          vocabWords: wrapStats.vocabWords,
          grammarRules: wrapStats.grammarRules,
          daysCompleted: learnerProfile?.dayNumber ?? 30,
          feynmanImprovement: wrapStats.feynmanImprovement,
        }}
        myWhy={learnerProfile?.why ?? 'Career Growth'}
        nextLevelName={LEVEL_NAMES[level + 1] ?? `Level ${level + 1}`}
        onBegin={() => navigate('/map')}
        onReturnToMap={() => navigate('/map')}
      />
    )
  }

  if (done) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <div className="w-full h-1 bg-bg-tertiary">
          <div className="h-full bg-brand-green transition-all duration-700" style={{ width: '100%' }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <ScoreReveal
            correct={correctCount}
            total={total}
            wrongIds={wrongIds}
            questions={questions}
            levelName={levelName}
            onRetry={() => navigate('/map')}
            onPass={() => setShowCeremony(true)}
          />
        </div>
      </div>
    )
  }

  const typeInfo = TYPE_LABELS[current.type]

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col font-body">
      {/* Progress bar */}
      <div className="w-full h-1 bg-bg-tertiary">
        <motion.div
          className="h-full bg-brand-blue"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => navigate('/map')}
          className="text-text-muted hover:text-text-primary transition-colors p-1"
          aria-label="Exit gate"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest">Level {level} Gate — {levelName}</p>
          <p className="text-xs font-mono text-text-secondary">Prove Your Mastery</p>
        </div>
        <span className="text-xs font-mono text-text-muted">{currentIdx + 1}/{total}</span>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Type badge */}
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: typeInfo.color }}
              />
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: typeInfo.color }}>
                {typeInfo.label}
              </span>
            </div>

            {/* Prompt */}
            <h2 className="font-display font-bold text-text-primary text-xl leading-snug">
              {current.prompt}
            </h2>

            {/* Question input */}
            {current.type === 'vocab'    && <VocabQuestion    question={current} onAnswer={handleAnswer} />}
            {current.type === 'grammar'  && <GrammarQuestion  question={current} onAnswer={handleAnswer} />}
            {current.type === 'sentence' && <SentenceQuestion question={current} onAnswer={handleAnswer} />}

            {/* Hint toggle */}
            <div>
              <button
                className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono underline underline-offset-2"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-text-muted font-body mt-2 leading-relaxed"
                  >
                    💡 {current.hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom progress indicator */}
      <div className="px-4 pb-6 pt-2 flex justify-center gap-1.5 max-w-lg mx-auto w-full">
        {questions.map((_, i) => (
          <div
            key={i}
            className={[
              'h-1 flex-1 rounded-full transition-all duration-300',
              i < currentIdx ? 'bg-brand-blue' :
              i === currentIdx ? 'bg-brand-blue/40' :
              'bg-bg-tertiary',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}

// ── Page (default export) ─────────────────────────────────────────────────────
export default function LevelGate() {
  const navigate  = useNavigate()
  const [blocked] = useState(() => getCooldownRemaining() > 0)

  if (blocked) {
    return <CooldownBlocked onBack={() => navigate('/map')} />
  }
  return <LevelGateInner />
}
