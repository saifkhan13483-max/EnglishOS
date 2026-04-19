export interface Scenario {
  icon: string
  title: string
  description: string
  hint: string
  descriptionUrdu: string
  hintUrdu: string
  modelResponse: string
  modelNotes: string
}

export interface FeynmanPromptInfo {
  concept: string
  prompt: string
}

const ALL_SCENARIOS: Record<number, Record<number, Scenario>> = {}

const ALL_FEYNMAN: Record<number, Record<number, FeynmanPromptInfo>> = {}

export function getScenario(_module: number, _level = 1): Scenario {
  return {
    icon: '💬',
    title: '',
    description: '',
    hint: '',
    descriptionUrdu: '',
    hintUrdu: '',
    modelResponse: '',
    modelNotes: '',
  }
}

export function getFeynmanPrompt(_module: number, _level = 1): FeynmanPromptInfo {
  return { concept: '', prompt: '' }
}
