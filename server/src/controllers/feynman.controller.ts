import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'
import { getOpenAI } from '../lib/openai'

interface EvaluateBody {
  missionId: string
  module: number
  prompt: string
  responseText: string
}

interface OpenAIEvaluation {
  vocabulary_score: number
  simplicity_score: number
  relevance_score: number
  overall_score: number
  knowledge_gaps: string[]
  feedback: string
  suggestion: string
}

// POST /api/v1/feynman/evaluate
export async function evaluateFeynman(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string
  const { missionId, module: moduleNum, prompt, responseText } = req.body as EvaluateBody

  if (!missionId || !prompt || !responseText) {
    res.status(400).json({ success: false, error: 'missionId, prompt, and responseText are required' })
    return
  }

  const [mission, learner] = await Promise.all([
    prisma.missionSession.findUnique({ where: { id: missionId } }),
    prisma.learner.findUnique({ where: { id: learnerId } }),
  ])

  if (!mission || mission.learnerId !== learnerId) {
    res.status(404).json({ success: false, error: 'Mission not found' })
    return
  }
  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  // Step 1: Get vocabulary words covered up to learner's current level + module
  const coveredItems = await prisma.contentItem.findMany({
    where: {
      OR: [
        { level: { lt: learner.levelCurrent } },
        { level: learner.levelCurrent, module: { lte: moduleNum ?? 1 } },
      ],
    },
    select: { english: true },
  })
  const wordList = coveredItems.map((ci) => ci.english).join(', ')

  let evaluation: OpenAIEvaluation

  // Step 2: Call OpenAI GPT-4o with the PRD-specified prompt
  const openaiClient = getOpenAI()
  if (!openaiClient) {
    // Graceful fallback when OPENAI_API_KEY is not configured
    evaluation = {
      vocabulary_score: 65,
      simplicity_score: 70,
      relevance_score: 75,
      overall_score: Math.round(65 * 0.4 + 70 * 0.35 + 75 * 0.25),
      knowledge_gaps: [],
      feedback: 'Good attempt! Keep practicing explaining concepts in your own words — this is the most powerful learning technique.',
      suggestion: 'Try to use the vocabulary words you have learned in your explanation next time.',
    }
  } else {
    const systemPrompt = `You are evaluating an English learner's explanation for clarity and vocabulary usage.
The learner has covered these vocabulary words: ${wordList}.
The learner was asked to explain: ${prompt}.
Their response: ${responseText}.

Evaluate on three dimensions (score each 0-100):
1. Vocabulary Usage (40%): How many of their learned vocabulary words appear in the response?
2. Simplicity (35%): Is the explanation simple enough for a 10-year-old? Target Flesch-Kincaid grade level 3-5.
3. Relevance (25%): Does the response address the concept asked about?

Return ONLY valid JSON with no markdown:
{ "vocabulary_score": number, "simplicity_score": number, "relevance_score": number, "overall_score": number, "knowledge_gaps": string[], "feedback": string, "suggestion": string }`

    try {
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'system', content: systemPrompt }],
        temperature: 0.3,
        max_tokens: 500,
        response_format: { type: 'json_object' },
      })

      const raw = completion.choices[0]?.message?.content ?? '{}'
      const parsed = JSON.parse(raw) as Partial<OpenAIEvaluation>

      const vocabScore     = Math.min(100, Math.max(0, Number(parsed.vocabulary_score) || 0))
      const simplicityScore = Math.min(100, Math.max(0, Number(parsed.simplicity_score) || 0))
      const relevanceScore  = Math.min(100, Math.max(0, Number(parsed.relevance_score)  || 0))

      // Step 3: Calculate overall_score with the PRD weighting
      const overallScore = Math.round(vocabScore * 0.4 + simplicityScore * 0.35 + relevanceScore * 0.25)

      evaluation = {
        vocabulary_score: vocabScore,
        simplicity_score: simplicityScore,
        relevance_score:  relevanceScore,
        overall_score:    overallScore,
        knowledge_gaps:   Array.isArray(parsed.knowledge_gaps) ? parsed.knowledge_gaps : [],
        feedback:   typeof parsed.feedback   === 'string' ? parsed.feedback   : '',
        suggestion: typeof parsed.suggestion === 'string' ? parsed.suggestion : '',
      }
    } catch {
      evaluation = {
        vocabulary_score: 65,
        simplicity_score: 70,
        relevance_score: 75,
        overall_score: Math.round(65 * 0.4 + 70 * 0.35 + 75 * 0.25),
        knowledge_gaps: [],
        feedback: 'Good attempt! Keep practicing explaining concepts in your own words.',
        suggestion: 'Try to use the vocabulary words you have learned in your explanation next time.',
      }
    }
  }

  // Step 4: Save FeynmanResponse record
  const saved = await prisma.feynmanResponse.create({
    data: {
      learnerId,
      missionId,
      module:           moduleNum ?? 1,
      prompt,
      responseText,
      vocabScore:       evaluation.vocabulary_score,
      simplicityScore:  evaluation.simplicity_score,
      relevanceScore:   evaluation.relevance_score,
      overallScore:     evaluation.overall_score,
      clarityScore:     evaluation.simplicity_score,
      suggestion:       evaluation.suggestion,
      knowledgeGapItems: evaluation.knowledge_gaps,
    },
  })

  // Update mission feynman score
  await prisma.missionSession.update({
    where: { id: missionId },
    data: { feynmanScore: evaluation.overall_score, feynmanText: responseText },
  })

  // Step 5: For each knowledge gap word, find ContentItem → update SRQueueItem
  if (evaluation.knowledge_gaps.length > 0) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const gapItems = await prisma.contentItem.findMany({
      where: { english: { in: evaluation.knowledge_gaps, mode: 'insensitive' } },
    })

    await Promise.all(
      gapItems.map((ci) =>
        prisma.sRQueueItem.upsert({
          where: { learnerId_itemId: { learnerId, itemId: ci.id } },
          update: {
            isKnowledgeGap:  true,
            intervalDays:    1,
            nextReviewDate:  tomorrow,
          },
          create: {
            learnerId,
            itemId:         ci.id,
            intervalDays:   1,
            nextReviewDate: tomorrow,
            isKnowledgeGap: true,
          },
        })
      )
    )
  }

  // Step 6: Update Brain Compound Meter — increment by (overallScore / 100) * 2, capped at 100
  const increment = (evaluation.overall_score / 100) * 2
  const newBrainPct = Math.min(100, learner.brainCompoundPct + increment)
  await prisma.learner.update({
    where: { id: learnerId },
    data: { brainCompoundPct: newBrainPct },
  })

  res.json({
    success: true,
    data: {
      scores: {
        vocabulary:  evaluation.vocabulary_score,
        simplicity:  evaluation.simplicity_score,
        relevance:   evaluation.relevance_score,
        overall:     evaluation.overall_score,
      },
      feedback:      evaluation.feedback,
      suggestion:    evaluation.suggestion,
      knowledgeGaps: evaluation.knowledge_gaps,
      feynmanResponseId: saved.id,
    },
  })
}

// GET /api/v1/feynman/archive
export async function getFeynmanArchive(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.learnerId as string

  const responses = await prisma.feynmanResponse.findMany({
    where: { learnerId },
    orderBy: { createdAt: 'desc' },
    include: {
      mission: {
        select: {
          sessionDate: true,
          type: true,
          status: true,
        },
      },
    },
  })

  res.json({ success: true, data: responses })
}
