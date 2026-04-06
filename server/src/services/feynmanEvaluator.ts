import { getGemini } from '../lib/gemini'

export interface FeynmanEvaluation {
  vocabulary_score: number
  simplicity_score: number
  relevance_score: number
  overall_score: number
  knowledge_gaps: string[]
  feedback: string
  suggestion: string
}

export const FALLBACK_EVALUATION: FeynmanEvaluation = {
  vocabulary_score: 65,
  simplicity_score: 70,
  relevance_score: 75,
  overall_score: Math.round(65 * 0.4 + 70 * 0.35 + 75 * 0.25),
  knowledge_gaps: [],
  feedback:
    'Good attempt! Keep practicing explaining concepts in your own words — this is the most powerful learning technique.',
  suggestion:
    'Try to use the vocabulary words you have learned in your explanation next time.',
}

/**
 * Evaluates a Feynman Moment response using Gemini AI.
 *
 * Scores across three dimensions:
 *   - Vocabulary Usage (40%): how many learned words appear in the response
 *   - Simplicity     (35%): how understandable the explanation is (target grade 3-5)
 *   - Relevance      (25%): whether the response addresses the concept
 *
 * Falls back to FALLBACK_EVALUATION if Gemini is unavailable or returns invalid JSON.
 */
export async function evaluateFeynmanResponse(
  wordList: string,
  prompt: string,
  responseText: string,
): Promise<FeynmanEvaluation> {
  const genAI = getGemini()

  if (!genAI) {
    return { ...FALLBACK_EVALUATION }
  }

  const evaluationPrompt = `You are evaluating an English learner's explanation for clarity and vocabulary usage.
The learner has covered these vocabulary words: ${wordList}.
The learner was asked to explain: ${prompt}
Their response: ${responseText}

Evaluate on three dimensions (score each 0-100):
1. Vocabulary Usage (40%): How many of their learned vocabulary words appear in the response?
2. Simplicity (35%): Is the explanation simple enough for a 10-year-old? Target Flesch-Kincaid grade level 3-5.
3. Relevance (25%): Does the response address the concept asked about?

Return ONLY valid JSON with no markdown, no explanation, nothing else:
{ "vocabulary_score": number, "simplicity_score": number, "relevance_score": number, "overall_score": number, "knowledge_gaps": string[], "feedback": string, "suggestion": string }`

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 512,
        temperature: 0.3,
      },
    })

    const result = await model.generateContent(evaluationPrompt)
    const raw = result.response.text()
    const parsed = JSON.parse(raw) as Partial<FeynmanEvaluation>

    const vocabularyScore = Math.min(100, Math.max(0, Number(parsed.vocabulary_score) || 0))
    const simplicityScore = Math.min(100, Math.max(0, Number(parsed.simplicity_score) || 0))
    const relevanceScore  = Math.min(100, Math.max(0, Number(parsed.relevance_score)  || 0))
    const overallScore    = Math.round(
      vocabularyScore * 0.4 + simplicityScore * 0.35 + relevanceScore * 0.25,
    )

    return {
      vocabulary_score: vocabularyScore,
      simplicity_score: simplicityScore,
      relevance_score:  relevanceScore,
      overall_score:    overallScore,
      knowledge_gaps:   Array.isArray(parsed.knowledge_gaps) ? parsed.knowledge_gaps : [],
      feedback:   typeof parsed.feedback   === 'string' ? parsed.feedback   : '',
      suggestion: typeof parsed.suggestion === 'string' ? parsed.suggestion : '',
    }
  } catch {
    return { ...FALLBACK_EVALUATION }
  }
}

/**
 * Calculates how much the Brain Compound Meter should increase
 * based on a Feynman evaluation score.
 *
 * Formula: (overallScore / 100) * 2  — capped by the caller at 100.
 */
export function calculateBrainCompoundIncrement(overallScore: number): number {
  return (overallScore / 100) * 2
}
