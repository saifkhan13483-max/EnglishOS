import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'
import { getOpenAI } from '../lib/openai'

interface MessageHistoryItem {
  role: 'user' | 'assistant'
  content: string
}

interface ConversationBody {
  module: number
  scenario: string
  messageHistory: MessageHistoryItem[]
}

// Opening messages keyed by scenario keywords — used when the history is empty
// and OpenAI is unavailable (or for a faster first-turn cold-start).
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
  phone: 'Hello! This is the phone. Who do you want to talk to?',
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

  // Step 1: Get learner's current level and build vocabulary allowlist
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

  // Step 4: First message — generate the AI's opening line
  if (messageHistory.length === 0) {
    const openaiClient = getOpenAI()
    if (!openaiClient) {
      res.json({ success: true, data: { message: getOpenerForScenario(scenario) } })
      return
    }

    const openingSystemPrompt = `You are a friendly English conversation partner for a South Asian learner at Level ${learner.levelCurrent}.

STRICT RULES:
- Only use vocabulary from this approved list: ${allowlist}
- Keep all responses under 20 words
- Use only simple present or simple past tense
- Never use idioms, contractions, or complex sentence structures
- Current conversation scenario: ${scenario}
- Be warm, patient, and encouraging

Generate a short, friendly opening message to start the conversation based on the scenario. Under 20 words.`

    try {
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'system', content: openingSystemPrompt }],
        temperature: 0.7,
        max_tokens: 60,
      })
      const message = completion.choices[0]?.message?.content?.trim() ?? getOpenerForScenario(scenario)
      res.json({ success: true, data: { message } })
    } catch {
      res.json({ success: true, data: { message: getOpenerForScenario(scenario) } })
    }
    return
  }

  // Step 2 & 3: Continue conversation with full message history
  const systemPrompt = `You are a friendly English conversation partner for a South Asian learner at Level ${learner.levelCurrent}.

STRICT RULES:
- Only use vocabulary from this approved list: ${allowlist}
- Keep all responses under 20 words
- Use only simple present or simple past tense
- Never use idioms, contractions, or complex sentence structures
- Current conversation scenario: ${scenario}
- If the user's input is unclear or off-topic, respond: 'I did not understand. Can you say that again in simple words?'
- Be warm, patient, and encouraging
- Do not correct grammar explicitly — just model correct usage naturally`

  const openaiClient = getOpenAI()

  if (!openaiClient) {
    // Graceful fallback when OPENAI_API_KEY is not configured
    const fallback = 'I understand. Please tell me more.'
    res.json({ success: true, data: { message: fallback } })
    return
  }

  try {
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messageHistory.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 80,
    })

    const message = completion.choices[0]?.message?.content?.trim()
      ?? 'I did not understand. Can you say that again in simple words?'

    res.json({ success: true, data: { message } })
  } catch {
    res.json({
      success: true,
      data: { message: 'I did not understand. Can you say that again in simple words?' },
    })
  }
}
