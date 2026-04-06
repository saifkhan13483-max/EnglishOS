export interface Zone {
  id: string
  label: string
}

export interface SentenceExercise {
  mode: 'Positive' | 'Negative' | 'Question'
  hint: string
  zones: Zone[]
  tiles: string[]
  correct: Record<string, string>
  vocabWords: string[]
}

export const SENTENCES_BY_MODULE: Record<number, SentenceExercise[]> = {
  1: [
    {
      mode: 'Positive',
      hint: 'Each letter stands for a word — "A is for Apple"',
      zones: [{ id: 'letter', label: 'LETTER' }, { id: 'verb', label: 'IS FOR' }, { id: 'word', label: 'WORD' }],
      tiles: ['A', 'is for', 'Apple', 'E', 'stands for', 'Egg'],
      correct: { letter: 'A', verb: 'is for', word: 'Apple' },
      vocabWords: ['apple'],
    },
    {
      mode: 'Positive',
      hint: 'Which word starts with this vowel?',
      zones: [{ id: 'letter', label: 'LETTER' }, { id: 'verb', label: 'IS FOR' }, { id: 'word', label: 'WORD' }],
      tiles: ['I', 'is for', 'Ink', 'O', 'stands for', 'Orange'],
      correct: { letter: 'I', verb: 'is for', word: 'Ink' },
      vocabWords: ['ink'],
    },
    {
      mode: 'Positive',
      hint: 'Which letter does this word start with?',
      zones: [{ id: 'word', label: 'WORD' }, { id: 'verb', label: 'STARTS WITH' }, { id: 'letter', label: 'LETTER' }],
      tiles: ['Ball', 'starts with', 'B', 'Cat', 'begins with', 'C'],
      correct: { word: 'Ball', verb: 'starts with', letter: 'B' },
      vocabWords: ['ball'],
    },
    {
      mode: 'Negative',
      hint: '"B is NOT a vowel" — use "is not"',
      zones: [{ id: 'letter', label: 'LETTER' }, { id: 'negative', label: 'IS NOT' }, { id: 'category', label: 'CATEGORY' }],
      tiles: ['B', 'is not', 'a vowel', 'U', 'is not', 'a consonant'],
      correct: { letter: 'B', negative: 'is not', category: 'a vowel' },
      vocabWords: ['vowel'],
    },
    {
      mode: 'Question',
      hint: '"Is A a vowel?" — use "Is" to ask a question',
      zones: [{ id: 'helper', label: 'IS' }, { id: 'letter', label: 'LETTER' }, { id: 'category', label: 'CATEGORY' }],
      tiles: ['Is', 'A', 'a vowel', 'Is', 'D', 'a consonant'],
      correct: { helper: 'Is', letter: 'A', category: 'a vowel' },
      vocabWords: ['vowel'],
    },
  ],

  2: [
    {
      mode: 'Positive',
      hint: 'Subject + Verb + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['I', 'eat', 'food', 'She', 'drink', 'water'],
      correct: { subject: 'I', verb: 'eat', object: 'food' },
      vocabWords: ['eat', 'food'],
    },
    {
      mode: 'Positive',
      hint: 'Subject + Verb + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['She', 'reads', 'books', 'He', 'writes', 'letters'],
      correct: { subject: 'She', verb: 'reads', object: 'books' },
      vocabWords: ['read'],
    },
    {
      mode: 'Positive',
      hint: 'Subject + Verb + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['We', 'need', 'water', 'They', 'want', 'food'],
      correct: { subject: 'We', verb: 'need', object: 'water' },
      vocabWords: ['need', 'water'],
    },
    {
      mode: 'Negative',
      hint: 'Subject + NOT + Verb + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'negative', label: 'NEGATIVE' }, { id: 'verb', label: 'VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['He', 'does not', 'eat', 'meat', 'She', 'do not', 'drink', 'milk'],
      correct: { subject: 'He', negative: 'does not', verb: 'eat', object: 'meat' },
      vocabWords: ['eat'],
    },
    {
      mode: 'Question',
      hint: 'Helper + Subject + Verb + Object + ?',
      zones: [{ id: 'helper', label: '? HELPER' }, { id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['Do', 'you', 'like', 'tea', 'Does', 'he', 'want', 'food'],
      correct: { helper: 'Do', subject: 'you', verb: 'like', object: 'tea' },
      vocabWords: ['like'],
    },
  ],

  3: [
    {
      mode: 'Positive',
      hint: 'Subject + Verb + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['I', 'am', 'happy', 'She', 'is', 'good'],
      correct: { subject: 'I', verb: 'am', object: 'happy' },
      vocabWords: ['happy', 'good'],
    },
    {
      mode: 'Positive',
      hint: 'Subject + Verb + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['He', 'works', 'hard', 'They', 'play', 'outside'],
      correct: { subject: 'He', verb: 'works', object: 'hard' },
      vocabWords: ['work'],
    },
    {
      mode: 'Negative',
      hint: 'Subject + NOT + Verb',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'negative', label: 'NEGATIVE' }, { id: 'verb', label: 'VERB' }],
      tiles: ['We', 'are not', 'ready', 'They', 'is not', 'happy'],
      correct: { subject: 'We', negative: 'are not', verb: 'ready' },
      vocabWords: ['ready'],
    },
    {
      mode: 'Negative',
      hint: 'Subject + NOT + Verb + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'negative', label: 'NEGATIVE' }, { id: 'verb', label: 'VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['I', 'do not', 'eat', 'meat', 'She', 'does not', 'drink', 'water'],
      correct: { subject: 'I', negative: 'do not', verb: 'eat', object: 'meat' },
      vocabWords: ['eat'],
    },
    {
      mode: 'Question',
      hint: 'Helper + Subject + Verb + ?',
      zones: [{ id: 'helper', label: '? HELPER' }, { id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }],
      tiles: ['Is', 'he', 'ready', 'Are', 'they', 'happy'],
      correct: { helper: 'Is', subject: 'he', verb: 'ready' },
      vocabWords: ['ready'],
    },
  ],

  4: [
    {
      mode: 'Positive',
      hint: 'Use a greeting + how are you?',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }, { id: 'greeting', label: 'GREETING' }],
      tiles: ['I', 'say', 'good morning', 'She', 'says', 'good evening'],
      correct: { subject: 'I', verb: 'say', greeting: 'good morning' },
      vocabWords: ['say', 'morning'],
    },
    {
      mode: 'Positive',
      hint: 'Subject + Verb + Number + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB' }, { id: 'number', label: 'NUMBER' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['I', 'have', 'three', 'books', 'She', 'has', 'five', 'pens'],
      correct: { subject: 'I', verb: 'have', number: 'three', object: 'books' },
      vocabWords: ['have', 'three', 'book'],
    },
    {
      mode: 'Positive',
      hint: 'My name is ___ — use this for self-introduction',
      zones: [{ id: 'starter', label: 'MY NAME' }, { id: 'verb', label: 'IS' }, { id: 'name', label: 'NAME' }],
      tiles: ['My name', 'is', 'Ali', 'Her name', 'is', 'Sara'],
      correct: { starter: 'My name', verb: 'is', name: 'Ali' },
      vocabWords: ['name'],
    },
    {
      mode: 'Question',
      hint: 'What day is today? — asking about the day of the week',
      zones: [{ id: 'helper', label: 'WHAT' }, { id: 'verb', label: 'DAY IS' }, { id: 'subject', label: 'SUBJECT' }],
      tiles: ['What', 'day is', 'today', 'Which', 'month is', 'this'],
      correct: { helper: 'What', verb: 'day is', subject: 'today' },
      vocabWords: ['day', 'today'],
    },
    {
      mode: 'Positive',
      hint: 'Today is ___ — tell someone what day it is',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'IS' }, { id: 'day', label: 'DAY' }],
      tiles: ['Today', 'is', 'Friday', 'Tomorrow', 'is', 'Saturday'],
      correct: { subject: 'Today', verb: 'is', day: 'Friday' },
      vocabWords: ['Friday', 'today'],
    },
    {
      mode: 'Positive',
      hint: 'Saying the time: It is ___ o\'clock',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'IS' }, { id: 'time', label: 'TIME' }],
      tiles: ['It', 'is', 'three o\'clock', 'It', 'is', 'half past four'],
      correct: { subject: 'It', verb: 'is', time: 'three o\'clock' },
      vocabWords: ['time', 'clock'],
    },
    {
      mode: 'Negative',
      hint: 'Subject + NOT + Verb + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'negative', label: 'NEGATIVE' }, { id: 'verb', label: 'VERB' }, { id: 'phrase', label: 'PHRASE' }],
      tiles: ['I', 'do not', 'forget', 'to say please', 'She', 'does not', 'skip', 'thank you'],
      correct: { subject: 'I', negative: 'do not', verb: 'forget', phrase: 'to say please' },
      vocabWords: ['please', 'forget'],
    },
    {
      mode: 'Question',
      hint: '"Can you please...?" is a very polite way to ask for help',
      zones: [{ id: 'helper', label: 'CAN' }, { id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB PHRASE' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['Can', 'you', 'please help', 'me', 'Could', 'they', 'please show', 'us'],
      correct: { helper: 'Can', subject: 'you', verb: 'please help', object: 'me' },
      vocabWords: ['please', 'help'],
    },
  ],

  5: [
    {
      mode: 'Positive',
      hint: 'Subject + am looking for + Object',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB PHRASE' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['I', 'am looking for', 'a shirt', 'She', 'is looking for', 'a bag'],
      correct: { subject: 'I', verb: 'am looking for', object: 'a shirt' },
      vocabWords: ['shirt', 'bag'],
    },
    {
      mode: 'Question',
      hint: 'How much + does + Object + cost + ?',
      zones: [{ id: 'starter', label: 'HOW MUCH' }, { id: 'helper', label: 'DOES' }, { id: 'object', label: 'OBJECT' }, { id: 'verb', label: 'VERB' }],
      tiles: ['How much', 'does', 'it', 'cost', 'How much', 'does', 'this', 'cost'],
      correct: { starter: 'How much', helper: 'does', object: 'it', verb: 'cost' },
      vocabWords: ['cost'],
    },
    {
      mode: 'Positive',
      hint: 'I would like + to + verb',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'helper', label: 'WOULD LIKE' }, { id: 'verb', label: 'TO + VERB' }],
      tiles: ['I', 'would like', 'to pay', 'She', 'would like', 'to buy'],
      correct: { subject: 'I', helper: 'would like', verb: 'to pay' },
      vocabWords: ['pay', 'buy'],
    },
    {
      mode: 'Question',
      hint: 'Can + you + give me + Object + ?',
      zones: [{ id: 'helper', label: 'CAN' }, { id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB PHRASE' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['Can', 'you', 'give me', 'a discount', 'Can', 'they', 'show me', 'the price'],
      correct: { helper: 'Can', subject: 'you', verb: 'give me', object: 'a discount' },
      vocabWords: ['give', 'discount'],
    },
    {
      mode: 'Positive',
      hint: 'Subject + will + pay + by + method',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'WILL PAY' }, { id: 'method', label: 'METHOD' }],
      tiles: ['I', 'will pay', 'by cash', 'She', 'will pay', 'by card'],
      correct: { subject: 'I', verb: 'will pay', method: 'by cash' },
      vocabWords: ['pay'],
    },
  ],

  6: [
    {
      mode: 'Positive',
      hint: 'I have worked in + place + for + time',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB PHRASE' }, { id: 'place', label: 'FIELD' }],
      tiles: ['I', 'have worked in', 'sales', 'She', 'has worked in', 'finance'],
      correct: { subject: 'I', verb: 'have worked in', place: 'sales' },
      vocabWords: ['work', 'sales'],
    },
    {
      mode: 'Positive',
      hint: 'I am skilled at + skill',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'AM SKILLED AT' }, { id: 'skill', label: 'SKILL' }],
      tiles: ['I', 'am skilled at', 'communication', 'She', 'is skilled at', 'management'],
      correct: { subject: 'I', verb: 'am skilled at', skill: 'communication' },
      vocabWords: ['communication', 'skill'],
    },
    {
      mode: 'Positive',
      hint: 'My goal is to + verb',
      zones: [{ id: 'starter', label: 'MY GOAL' }, { id: 'verb', label: 'IS TO + VERB' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['My goal', 'is to grow', 'professionally', 'My goal', 'is to lead', 'a team'],
      correct: { starter: 'My goal', verb: 'is to grow', object: 'professionally' },
      vocabWords: ['grow', 'goal'],
    },
    {
      mode: 'Positive',
      hint: 'I would like to join + company',
      zones: [{ id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'WOULD LIKE TO JOIN' }, { id: 'object', label: 'COMPANY' }],
      tiles: ['I', 'would like to join', 'your company', 'She', 'would like to join', 'this team'],
      correct: { subject: 'I', verb: 'would like to join', object: 'your company' },
      vocabWords: ['join', 'company'],
    },
    {
      mode: 'Question',
      hint: 'Could + you + tell me + about + Object + ?',
      zones: [{ id: 'helper', label: 'COULD' }, { id: 'subject', label: 'SUBJECT' }, { id: 'verb', label: 'VERB PHRASE' }, { id: 'object', label: 'OBJECT' }],
      tiles: ['Could', 'you', 'tell me about', 'the role', 'Could', 'they', 'show me', 'the office'],
      correct: { helper: 'Could', subject: 'you', verb: 'tell me about', object: 'the role' },
      vocabWords: ['role'],
    },
  ],
}

export function getSentences(module: number): SentenceExercise[] {
  return SENTENCES_BY_MODULE[module] ?? SENTENCES_BY_MODULE[2]
}
