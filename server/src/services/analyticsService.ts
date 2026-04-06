import { logger } from '../lib/logger'

export type ServerAnalyticsEvent =
  | 'user_registered'
  | 'onboarding_completed'
  | 'mission_started'
  | 'mission_completed'
  | 'feynman_evaluated'
  | 'feynman_skipped'
  | 'level_gate_attempted'
  | 'level_gate_passed'
  | 'level_gate_failed'
  | 'leaderboard_entry_submitted'
  | 'badge_earned'
  | 'streak_extended'
  | 'streak_broken'
  | 'batman_mode_activated'
  | 'sr_review_completed'
  | 'conversation_message_sent'

interface AnalyticsProperties {
  learnerId?: string
  level?: number
  module?: number
  score?: number
  xpEarned?: number
  streak?: number
  badgeType?: string
  missionType?: string
  sessionType?: string
  [key: string]: unknown
}

export function trackServerEvent(
  event: ServerAnalyticsEvent,
  properties: AnalyticsProperties = {},
): void {
  logger.info(
    {
      analytics: true,
      event,
      ...properties,
    },
    `[analytics] ${event}`,
  )
}

export function trackError(
  context: string,
  error: unknown,
  properties: AnalyticsProperties = {},
): void {
  const message = error instanceof Error ? error.message : String(error)
  logger.error(
    {
      analytics: true,
      event: 'server_error',
      context,
      errorMessage: message,
      ...properties,
    },
    `[analytics] server_error in ${context}: ${message}`,
  )
}
