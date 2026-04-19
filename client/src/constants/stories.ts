export type PanelNode = {
  type: 'panel'
  scene: string
  speaker: string
  speakerColor: string
  text: string
}

export type ChoiceNode = {
  type: 'choice'
  scene: string
  speaker: string
  speakerColor: string
  prompt: string
  options: [string, string]
  acks: [string, string]
}

export type StoryNode = PanelNode | ChoiceNode

export interface Story {
  title: string
  subtitle: string
  nodes: StoryNode[]
}

export const SCENE_GRADIENTS: Record<string, string> = {}

export function getStory(_level: number, _module: number): Story {
  return { title: '', subtitle: '', nodes: [] }
}
