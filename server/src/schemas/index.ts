import { z } from 'zod'

// ── Reusable primitives ────────────────────────────────────────────────────────

const uuid = z.string().uuid({ message: 'Must be a valid UUID' })

const HH_MM = z
  .string()
  .regex(/^\d{2}:\d{2}$/, { message: 'Must be in HH:MM format (e.g. 08:00)' })

// ── POST /api/v1/auth/register ─────────────────────────────────────────────────

export const registerSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine((val) => /[a-zA-Z]/.test(val), {
      message: 'Password must contain at least one letter',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one number',
    }),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be at most 50 characters' }),
})

// ── POST /api/v1/auth/login ────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

// ── POST /api/v1/learner/onboarding ───────────────────────────────────────────

export const onboardingSchema = z.object({
  placementLevel: z
    .number({ invalid_type_error: 'placementLevel must be a number' })
    .int()
    .min(1, { message: 'placementLevel must be between 1 and 6' })
    .max(6, { message: 'placementLevel must be between 1 and 6' }),
  whyMotivation: z.string().min(1, { message: 'whyMotivation is required' }),
  stakesStatement: z
    .string()
    .min(20, { message: 'stakesStatement must be at least 20 characters' }),
  morningSessionTime: HH_MM.describe('morningSessionTime'),
  eveningSessionTime: HH_MM.describe('eveningSessionTime'),
})

// ── POST /api/v1/mission/start ─────────────────────────────────────────────────

export const startMissionSchema = z.object({
  type: z.enum(['MORNING', 'EVENING'], {
    errorMap: () => ({ message: 'type must be "MORNING" or "EVENING"' }),
  }),
})

// ── POST /api/v1/feynman/evaluate ─────────────────────────────────────────────

export const evaluateFeynmanSchema = z.object({
  missionId: uuid,
  module: z
    .number({ invalid_type_error: 'module must be a number' })
    .int()
    .min(1, { message: 'module must be between 1 and 13' })
    .max(13, { message: 'module must be between 1 and 13' }),
  prompt: z.string().min(1, { message: 'prompt is required' }),
  responseText: z
    .string()
    .min(10, { message: 'responseText must be at least 10 characters' })
    .max(2000, { message: 'responseText must be at most 2000 characters' }),
})

// ── POST /api/v1/conversation/message ─────────────────────────────────────────

const messageHistoryItem = z.object({
  role: z.enum(['user', 'assistant'], {
    errorMap: () => ({ message: 'role must be "user" or "assistant"' }),
  }),
  content: z.string().min(1, { message: 'message content must not be empty' }),
})

export const conversationMessageSchema = z.object({
  module: z
    .number({ invalid_type_error: 'module must be a number' })
    .int()
    .min(1, { message: 'module must be between 1 and 13' })
    .max(13, { message: 'module must be between 1 and 13' }),
  scenario: z.string().min(1, { message: 'scenario is required' }),
  messageHistory: z
    .array(messageHistoryItem, { invalid_type_error: 'messageHistory must be an array' })
    .max(20, { message: 'messageHistory may not exceed 20 messages' }),
})

// ── POST /api/v1/content/sr-review ────────────────────────────────────────────

const srReviewItem = z.object({
  itemId: uuid,
  wasCorrect: z.boolean({ invalid_type_error: 'wasCorrect must be a boolean' }),
})

export const srReviewSchema = z.object({
  reviews: z
    .array(srReviewItem, { invalid_type_error: 'reviews must be an array' })
    .min(1, { message: 'reviews must contain at least 1 item' })
    .max(20, { message: 'reviews may not exceed 20 items' }),
})

// ── POST /api/v1/progress/gate/submit ─────────────────────────────────────────

const gateAnswer = z.object({
  itemId: z.string().min(1, { message: 'itemId is required' }),
  learnerAnswer: z.string(),
  isCorrect: z.boolean({ invalid_type_error: 'isCorrect must be a boolean' }),
})

export const submitGateSchema = z.object({
  level: z
    .number({ invalid_type_error: 'level must be a number' })
    .int()
    .min(1, { message: 'level must be between 1 and 6' })
    .max(6, { message: 'level must be between 1 and 6' }),
  answers: z
    .array(gateAnswer, { invalid_type_error: 'answers must be an array' })
    .min(1, { message: 'answers must contain at least 1 item' }),
})
