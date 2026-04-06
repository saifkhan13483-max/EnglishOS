import { GoogleGenerativeAI } from '@google/generative-ai'
import { logger } from '../lib/logger'

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

interface SimResponse {
  message: string
  isNotUnderstood: boolean
}

const SCENARIO_OPENERS: Record<string, string> = {
  default:    'Hello! I am happy to talk with you today. How are you?',
  shop:       'Welcome to the shop! What do you want to buy today?',
  market:     'Welcome to the market! What do you want to buy today?',
  doctor:     'Hello! I am the doctor. How do you feel today?',
  school:     'Good morning! Welcome to class. Are you ready to learn?',
  office:     'Good morning! Welcome to the office. How can I help you?',
  restaurant: 'Welcome! Please sit down. What do you want to eat?',
  hotel:      'Welcome to the hotel! How can I help you today?',
  transport:  'Hello! Where do you want to go today?',
  phone:      'Hello! Who do you want to talk to?',
}

const FALLBACK_REPLIES = [
  'I understand. Please tell me more.',
  'That is good. What else do you want to say?',
  'I see. Can you tell me more about that?',
]

function getOpener(scenario: string): string {
  const lower = scenario.toLowerCase()
  for (const [key, opener] of Object.entries(SCENARIO_OPENERS)) {
    if (key !== 'default' && lower.includes(key)) return opener
  }
  return SCENARIO_OPENERS.default
}

function getFallback(): string {
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)]
}

export async function getConversationOpener(
  genAI: GoogleGenerativeAI | null,
  scenario: string,
  systemInstruction: string,
): Promise<SimResponse> {
  if (!genAI) {
    return { message: getOpener(scenario), isNotUnderstood: false }
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction,
      generationConfig: { maxOutputTokens: 60, temperature: 0.7 },
    })
    const result = await model.generateContent(
      `Generate a short friendly opening message to start the conversation for scenario: ${scenario}. Under 20 words.`,
    )
    const message = result.response.text().trim() || getOpener(scenario)
    return { message, isNotUnderstood: false }
  } catch (err) {
    logger.warn({ err }, '[conversationSim] opener generation failed, using fallback')
    return { message: getOpener(scenario), isNotUnderstood: false }
  }
}

export async function sendMessage(
  genAI: GoogleGenerativeAI | null,
  messageHistory: ConversationMessage[],
  systemInstruction: string,
): Promise<SimResponse> {
  if (messageHistory.length === 0) {
    return { message: getFallback(), isNotUnderstood: false }
  }

  if (!genAI) {
    return { message: getFallback(), isNotUnderstood: false }
  }

  try {
    const lastItem = messageHistory[messageHistory.length - 1]
    const priorHistory = messageHistory.slice(0, -1)

    const geminiHistory = priorHistory.map((m) => ({
      role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
      parts: [{ text: m.content }],
    }))

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction,
      generationConfig: { maxOutputTokens: 80, temperature: 0.7 },
    })

    const chat = model.startChat({ history: geminiHistory })
    const result = await chat.sendMessage(lastItem.content)
    const message =
      result.response.text().trim() ||
      'I did not understand. Can you say that again in simple words?'

    const isNotUnderstood = message.toLowerCase().includes('did not understand')

    return { message, isNotUnderstood }
  } catch (err) {
    logger.warn({ err }, '[conversationSim] message generation failed, using fallback')
    return {
      message: 'I did not understand. Can you say that again in simple words?',
      isNotUnderstood: true,
    }
  }
}

export function buildSystemInstruction(
  level: number,
  moduleNum: number,
  scenario: string,
  allowedVocab: string,
): string {
  return `You are a friendly English conversation partner for a South Asian learner at Level ${level}.

STRICT RULES:
- Only use vocabulary from this approved list: ${allowedVocab}
- Keep all responses under 20 words
- Use only simple present or simple past tense at levels 1-2
- Never use idioms, contractions, or complex sentence structures at early levels
- Current conversation scenario: ${scenario}
- Module context: Module ${moduleNum}
- If the user's input is unclear or off-topic, respond: I did not understand. Can you say that again in simple words?
- Be warm, patient, and encouraging
- Do not correct grammar explicitly — just model correct usage naturally`
}
