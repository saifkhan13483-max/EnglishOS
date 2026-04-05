import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'

interface EvaluateBody {
  missionId: string
  module: number
  prompt: string
  responseText: string
}

interface EvaluationResult {
  clarityScore: number
  vocabScore: number
  relevanceScore: number
  feedback: string
  knowledgeGapItems: string[]
}

// POST /api/v1/feynman/evaluate
export async function evaluateFeynman(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const { missionId, module: moduleNum, prompt, responseText } = req.body as EvaluateBody

  if (!missionId || !prompt || !responseText) {
    res.status(400).json({ success: false, error: 'missionId, prompt, and responseText are required' })
    return
  }

  const mission = await prisma.missionSession.findUnique({ where: { id: missionId } })
  if (!mission || mission.learnerId !== learnerId) {
    res.status(404).json({ success: false, error: 'Mission not found' })
    return
  }

  let result: EvaluationResult

  if (!process.env.OPENAI_API_KEY) {
    result = {
      clarityScore: 70,
      vocabScore: 65,
      relevanceScore: 75,
      feedback: 'Good attempt! Keep practicing explaining concepts in your own words — this is the most powerful learning technique.',
      knowledgeGapItems: [],
    }
  } else {
    const systemPrompt = `You are an English learning evaluator for South Asian beginners (Urdu/Hindi speakers).
Evaluate the learner's explanation on three dimensions (0–100):
1. Clarity: Is the explanation easy to understand?
2. Vocabulary: Did they use the target words correctly?
3. Relevance: Did they stay on topic?

Also identify any target vocabulary words from the prompt that the learner failed to use or used incorrectly — these are "knowledge gaps".

Respond ONLY with valid JSON in this exact shape:
{
  "clarityScore": <number 0-100>,
  "vocabScore": <number 0-100>,
  "relevanceScore": <number 0-100>,
  "feedback": "<one to two sentences of encouraging, constructive feedback>",
  "knowledgeGapItems": ["<word>", ...]
}`

    const userMessage = `Prompt given to learner: "${prompt}"

Learner's response: "${responseText}"`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 400,
        response_format: { type: 'json_object' },
      })

      const raw = completion.choices[0]?.message?.content ?? '{}'
      const parsed = JSON.parse(raw) as EvaluationResult
      result = {
        clarityScore:   Math.min(100, Math.max(0, Number(parsed.clarityScore)   || 0)),
        vocabScore:     Math.min(100, Math.max(0, Number(parsed.vocabScore)     || 0)),
        relevanceScore: Math.min(100, Math.max(0, Number(parsed.relevanceScore) || 0)),
        feedback:       typeof parsed.feedback === 'string' ? parsed.feedback : '',
        knowledgeGapItems: Array.isArray(parsed.knowledgeGapItems) ? parsed.knowledgeGapItems : [],
      }
    } catch {
      result = {
        clarityScore: 70,
        vocabScore: 65,
        relevanceScore: 75,
        feedback: 'Good attempt! Keep practicing explaining concepts in your own words — this is the most powerful learning technique.',
        knowledgeGapItems: [],
      }
    }
  }

  const avgScore = (result.clarityScore + result.vocabScore + result.relevanceScore) / 3

  // Save Feynman response to DB
  const saved = await prisma.feynmanResponse.create({
    data: {
      learnerId,
      missionId,
      module: moduleNum ?? 1,
      prompt,
      responseText,
      clarityScore: result.clarityScore,
      vocabScore: result.vocabScore,
      relevanceScore: result.relevanceScore,
      knowledgeGapItems: result.knowledgeGapItems,
    },
  })

  // Update mission with feynman score
  await prisma.missionSession.update({
    where: { id: missionId },
    data: { feynmanScore: avgScore, feynmanText: responseText },
  })

  // Schedule knowledge gap items for immediate review (interval = 1 day)
  if (result.knowledgeGapItems.length > 0) {
    const gapContentItems = await prisma.contentItem.findMany({
      where: {
        english: { in: result.knowledgeGapItems },
      },
    })

    for (const ci of gapContentItems) {
      await prisma.sRQueueItem.upsert({
        where: { learnerId_itemId: { learnerId, itemId: ci.id } },
        update: {
          isKnowledgeGap: true,
          intervalDays: 1,
          nextReviewDate: new Date(),
        },
        create: {
          learnerId,
          itemId: ci.id,
          intervalDays: 1,
          nextReviewDate: new Date(),
          isKnowledgeGap: true,
        },
      })
    }
  }

  res.json({
    success: true,
    data: {
      ...result,
      averageScore: avgScore,
      feynmanResponseId: saved.id,
    },
  })
}
