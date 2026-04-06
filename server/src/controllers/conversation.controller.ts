import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'
import { getGemini } from '../lib/gemini'

interface MessageHistoryItem {
  role: 'user' | 'assistant'
  content: string
}

interface ConversationBody {
  module: number
  scenario: string
  messageHistory: MessageHistoryItem[]
}

const SCENARIO_OPENERS: Record<string, string> = {
  default: 'Hello! I am happy to talk with you today. How are you?',
  shop: 'Welcome to the shop! What do you want to buy today?',
  market: 'Welcome to the market! What do you want to buy today?',
  doctor: 'Hello! I am the doctor. How do you feel today?',
  school: 'Good morning! Welcome to class. Are you ready to learn?',
  office: 'Good morning! Welcome to the office. How can I help you?',
  restaurant: 'Welcome! Please sit down. What do you want to eat?',
  hotel: 'Welcome to the hotel! How can I help you today?',
  transport: 'Hello! Where do you want to go today?',
  phone: 'Hello! Who do you want to talk to?',
}

function getOpenerForScenario(scenario: string): string {
  const lower = scenario.toLowerCase()
  for (const [key, opener] of Object.entries(SCENARIO_OPENERS)) {
    if (key !== 'default' && lower.includes(key)) return opener
  }
  return SCENARIO_OPENERS.default
}

// POST /api/v1/conversation/message
export async function sendConversationMessage(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const { module: moduleNum, scenario, messageHistory } = req.body as ConversationBody

  if (!scenario || !Array.isArray(messageHistory)) {
    res.status(400).json({ success: false, error: 'scenario and messageHistory are required' })
    return
  }

  const learner = await prisma.learner.findUnique({
    where: { id: learnerId },
    select: { levelCurrent: true },
  })
  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  const coveredItems = await prisma.contentItem.findMany({
    where: {
      OR: [
        { level: { lt: learner.levelCurrent } },
        { level: learner.levelCurrent, module: { lte: moduleNum ?? 1 } },
      ],
    },
    select: { english: true },
  })
  const allowlist = coveredItems.map((ci) => ci.english).join(', ')

  const systemInstruction = `You are a friendly English conversation partner for a South Asian learner at Level ${learner.levelCurrent}.

STRICT RULES:
- Only use vocabulary from this approved list: ${allowlist}
- Keep all responses under 20 words
- Use only simple present or simple past tense
- Never use idioms, contractions, or complex sentence structures
- Current conversation scenario: ${scenario}
- If the user's input is unclear or off-topic, respond: I did not understand. Can you say that again in simple words?
- Be warm, patient, and encouraging
- Do not correct grammar explicitly — just model correct usage naturally`

  const genAI = getGemini()

  // ── Opening message (empty history) ─────────────────────────────────────────
  if (messageHistory.length === 0) {
    if (!genAI) {
      res.json({ success: true, data: { message: getOpenerForScenario(scenario) } })
      return
    }

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction,
        generationConfig: { maxOutputTokens: 60, temperature: 0.7 },
      })
      const openingPrompt = `Generate a short friendly opening message to start the conversation for scenario: ${scenario}. Under 20 words.`
      const result = await model.generateContent(openingPrompt)
      const message = result.response.text().trim() || getOpenerForScenario(scenario)
      res.json({ success: true, data: { message } })
    } catch {
      res.json({ success: true, data: { message: getOpenerForScenario(scenario) } })
    }
    return
  }

  // ── Continuation (has history) ───────────────────────────────────────────────
  if (!genAI) {
    res.json({ success: true, data: { message: 'I understand. Please tell me more.' } })
    return
  }

  try {
    // Separate history from the latest user message
    const lastItem = messageHistory[messageHistory.length - 1]
    const priorHistory = messageHistory.slice(0, -1)

    // Convert to Gemini format: assistant → model, keep user → user
    const geminiHistory = priorHistory.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction,
      generationConfig: { maxOutputTokens: 80, temperature: 0.7 },
    })

    const chat = model.startChat({ history: geminiHistory })
    const result = await chat.sendMessage(lastItem.content)
    const message = result.response.text().trim()
      || 'I did not understand. Can you say that again in simple words?'

    res.json({ success: true, data: { message } })
  } catch {
    res.json({
      success: true,
      data: { message: 'I did not understand. Can you say that again in simple words?' },
    })
  }
}
