export interface Scenario {
  icon: string
  title: string
  description: string
  hint: string
  modelResponse: string
  modelNotes: string
}

export interface FeynmanPromptInfo {
  concept: string
  prompt: string
}

// Keyed by module number
export const SCENARIOS: Record<number, Scenario> = {
  1: {
    icon: '🔤',
    title: 'The Spelling Game',
    description:
      'Your younger sibling asks you to help them write the English alphabet for a school project. Spell out the vowels clearly and explain why they matter.',
    hint: 'Use words like: A, E, I, O, U — vowels are the most important letters',
    modelResponse:
      'The vowels are A, E, I, O, and U. Every English word needs at least one vowel. For example: "Apple" has A, "Egg" has E, "Ink" has I, "Orange" has O, and "Umbrella" has U.',
    modelNotes:
      'Notice: naming each vowel clearly, giving a real example for each, and explaining why they matter.',
  },
  2: {
    icon: '🍽️',
    title: 'At the Restaurant',
    description:
      'You are at a dhaba in Lahore. The waiter comes to your table. Order your meal and a drink in English using the words you have learned.',
    hint: 'Use words like: I want, I need, please, thank you',
    modelResponse:
      'I want chicken karahi and one cold water, please. How much is that?',
    modelNotes:
      'Notice: "I want" (chahna), using "please" for politeness, naming items clearly, and asking a follow-up question.',
  },
  3: {
    icon: '🗣️',
    title: 'Introducing Yourself',
    description:
      'You meet a new colleague at your office for the first time. Introduce yourself in English using positive sentences, a negative sentence, and one question.',
    hint: 'Use the SVO formula: Subject + Verb + Object. Try: I am, I work, I do not, Are you?',
    modelResponse:
      'Hello! I am Ali. I work in the accounts department. I do not live far from here. Are you new to this office?',
    modelNotes:
      'Notice: one positive sentence, one negative (do not), and one question — all three sentence types in a natural flow.',
  },
  4: {
    icon: '🙏',
    title: 'Good Morning!',
    description:
      'You arrive at your workplace in the morning. Your manager is standing at the door. Greet your manager politely in English, then ask for something you need using "please" and "thank you".',
    hint: 'Use: Good morning, How are you, I am fine thank you, please, excuse me, thank you very much',
    modelResponse:
      'Good morning! How are you today? I am doing well, thank you. Excuse me — could I please get the key for the meeting room? Thank you very much!',
    modelNotes:
      'Notice: starting with "Good morning", asking how they are, saying "excuse me" before a request, using "please" in the request, and ending with "thank you".',
  },
  5: {
    icon: '🏪',
    title: 'At the Shop',
    description:
      'You want to buy a shirt at a clothing shop. The shopkeeper does not speak Urdu. Ask for the item, negotiate politely, and complete the transaction in English.',
    hint: 'Use: I am looking for, How much does it cost, Can you give me a discount, I would like to pay',
    modelResponse:
      'Excuse me, I am looking for a blue shirt in medium size. How much does it cost? That is a bit expensive — can you give me a small discount? Alright, I would like to pay by cash.',
    modelNotes:
      'Notice: polite openers, asking price, negotiating respectfully, and confirming payment — a complete real-world transaction.',
  },
  6: {
    icon: '💼',
    title: 'The Job Interview',
    description:
      'You have a job interview at an office in Karachi. The interviewer asks you to tell them about yourself, your experience, and why you want this job.',
    hint: 'Use: I have worked, I am skilled at, I would like to, My goal is',
    modelResponse:
      'My name is Ahmed. I have worked in sales for two years and I am skilled at customer communication. I would like to join your company because I admire your reputation. My goal is to grow professionally and contribute to your team.',
    modelNotes:
      'Notice: past experience, current skills, clear motivation, and a forward-looking goal — the four pillars of any strong interview answer.',
  },
}

export const FEYNMAN_PROMPTS: Record<number, FeynmanPromptInfo> = {
  1: {
    concept: 'Alphabets — Module 1',
    prompt:
      "Explain what vowels are and why they are important in English, as if you are teaching a 10-year-old. Use simple words.",
  },
  2: {
    concept: 'Core 100 Words — Module 2',
    prompt:
      "Explain what pronouns are and give three examples of how to use them in sentences, as if you are telling a 10-year-old. Use simple English words.",
  },
  3: {
    concept: 'Basic Sentences — Module 3',
    prompt:
      "Explain the Subject-Verb-Object formula for making English sentences. Give one positive sentence, one negative sentence, and one question as examples.",
  },
  4: {
    concept: 'Daily Speaking Patterns — Module 4',
    prompt:
      'Explain how to greet someone in English and make a polite request. Give real-life examples of "good morning", "please", "thank you", and "excuse me" — and explain when you would use each one.',
  },
  5: {
    concept: 'Daily Conversations — Module 5',
    prompt:
      "Explain how to have a polite conversation in English when shopping. What words and phrases do you use to ask for something, check the price, and say thank you?",
  },
  6: {
    concept: 'Professional English — Module 6',
    prompt:
      "Explain how to introduce yourself professionally in English. What information do you share and how do you say it?",
  },
}

export function getScenario(module: number): Scenario {
  return SCENARIOS[module] ?? SCENARIOS[2]
}

export function getFeynmanPrompt(module: number): FeynmanPromptInfo {
  return FEYNMAN_PROMPTS[module] ?? FEYNMAN_PROMPTS[2]
}
