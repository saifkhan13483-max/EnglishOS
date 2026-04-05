import OpenAI from 'openai'

// Lazily create the client so the server can start without OPENAI_API_KEY set.
// Calling code should check `process.env.OPENAI_API_KEY` before invoking.
let _openai: OpenAI | null = null

export function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return _openai
}

// Keep the named export for backwards compatibility
export const openai = {
  get chat() {
    const client = getOpenAI()
    if (!client) throw new Error('OPENAI_API_KEY is not configured')
    return client.chat
  },
}
