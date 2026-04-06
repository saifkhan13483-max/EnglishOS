import pino from 'pino'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const logger = pino({
  level: IS_PRODUCTION ? 'info' : 'debug',
  formatters: {
    level(label) {
      return { level: label }
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: { service: 'englishos-api' },
})
