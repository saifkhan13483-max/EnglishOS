import { GoogleGenerativeAI } from '@google/generative-ai'

let _genAI: GoogleGenerativeAI | null = null

export function getGemini(): GoogleGenerativeAI | null {
  if (!process.env.GEMINI_API_KEY) return null
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }
  return _genAI
}
