export const env = {
  API_BASE_URL: (import.meta.env.VITE_API_BASE_URL as string) ?? '',
  POSTHOG_KEY: import.meta.env.VITE_POSTHOG_KEY as string,
  MODE: import.meta.env.MODE as 'development' | 'production',
  DEV: import.meta.env.DEV as boolean,
  PROD: import.meta.env.PROD as boolean,
} as const
