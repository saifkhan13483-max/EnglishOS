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

export function getSentences(_module: number, _level = 1): SentenceExercise[] {
  return []
}
