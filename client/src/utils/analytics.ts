import posthog from 'posthog-js'

const PRODUCTION_DOMAIN = 'englishos'

function isProduction(): boolean {
  const base = import.meta.env.VITE_API_BASE_URL as string | undefined
  return !!(base && base.includes(PRODUCTION_DOMAIN))
}

let initialised = false

function init(): void {
  if (initialised || !isProduction()) return
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined
  if (!key) return
  posthog.init(key, {
    api_host: 'https://app.posthog.com',
    capture_pageview: true,
    persistence: 'localStorage',
  })
  initialised = true
}

export type AnalyticsEvent =
  | 'mission_started'
  | 'mission_completed'
  | 'feynman_evaluated'
  | 'feynman_skipped'
  | 'level_gate_attempted'
  | 'level_gate_passed'
  | 'level_gate_failed'
  | 'leaderboard_submitted'
  | 'phase_entered'
  | 'time_to_first_mission'

export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: Record<string, unknown>,
): void {
  if (!isProduction()) return
  init()
  if (!initialised) return
  posthog.capture(eventName, properties)
}
