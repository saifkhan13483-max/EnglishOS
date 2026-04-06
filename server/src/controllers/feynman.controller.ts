import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'
import { checkAndAwardBadges } from '../services/badgeService'
import {
  evaluateFeynmanResponse,
  calculateBrainCompoundIncrement,
} from '../services/feynmanEvaluator'

interface EvaluateBody {
  missionId: string
  module: number
  prompt: string
  responseText: string
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
    prisma.learner.findUnique({
      where: { id: learnerId },
      select: { levelCurrent: true, brainCompoundPct: true },
    }),
  ])

  if (!mission || mission.learnerId !== learnerId) {
    res.status(404).json({ success: false, error: 'Mission not found' })
    return
  }
  if (!learner) {
    res.status(404).json({ success: false, error: 'Learner not found' })
    return
  }

  // Build vocabulary word list for evaluation context
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

  // Evaluate using the Feynman evaluator service
  const evaluation = await evaluateFeynmanResponse(wordList, prompt, responseText)

  // Persist Feynman response record
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

  // Update mission session with Feynman data
  await prisma.missionSession.update({
    where: { id: missionId },
    data: { feynmanScore: evaluation.overall_score, feynmanText: responseText },
  })

  // Schedule knowledge gap items for next-day review
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

  // Update Brain Compound Meter
  const increment = calculateBrainCompoundIncrement(evaluation.overall_score)
  const newBrainPct = Math.min(100, learner.brainCompoundPct + increment)
  await prisma.learner.update({
    where: { id: learnerId },
    data: { brainCompoundPct: newBrainPct },
  })

  // Check and award relevant badges
  const newBadges = await checkAndAwardBadges(learnerId, {
    type: 'FEYNMAN_COMPLETE',
    score: evaluation.overall_score,
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
      ...(newBadges.length && { badges: newBadges }),
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
