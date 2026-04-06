import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import path from 'path'

import { errorHandler } from './middleware/errorHandler'
import { prisma } from './lib/prisma'

import authRoutes from './routes/auth.routes'
import learnerRoutes from './routes/learner.routes'
import contentRoutes from './routes/content.routes'
import missionRoutes from './routes/mission.routes'
import feynmanRoutes from './routes/feynman.routes'
import conversationRoutes from './routes/conversation.routes'
import progressRoutes from './routes/progress.routes'
import leaderboardRoutes from './routes/leaderboard.routes'

const app = express()
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

app.set('trust proxy', 1)

app.use(compression())

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: IS_PRODUCTION
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https://app.posthog.com'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:', 'blob:'],
            connectSrc: ["'self'", 'https://app.posthog.com'],
          },
        }
      : false,
  })
)

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5000',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean) as string[]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (
        allowedOrigins.some((o) => origin === o) ||
        origin.endsWith('.replit.dev') ||
        origin.endsWith('.replit.app') ||
        origin.endsWith('.repl.co')
      ) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

if (!IS_PRODUCTION) {
  app.use(morgan('dev'))
}

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ── Static audio file serving with long-lived cache headers ──────────────────
app.use(
  '/audio',
  (_req: Request, _res: Response, next: NextFunction) => {
    _res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    next()
  },
  express.static(path.join(__dirname, '../public/audio'))
)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many requests. Please try again later.',
  },
})

app.use(limiter)

app.get('/health', async (_req: Request, res: Response) => {
  let database: 'connected' | 'error' = 'error'
  try {
    await prisma.$queryRaw`SELECT 1`
    database = 'connected'
  } catch {
    database = 'error'
  }
  res.json({ status: 'ok', database, timestamp: new Date().toISOString() })
})

const API = '/api/v1'

app.use(`${API}/auth`, authRoutes)
app.use(`${API}/learner`, learnerRoutes)
app.use(`${API}/content`, contentRoutes)
app.use(`${API}/mission`, missionRoutes)
app.use(`${API}/feynman`, feynmanRoutes)
app.use(`${API}/conversation`, conversationRoutes)
app.use(`${API}/progress`, progressRoutes)
app.use(`${API}/leaderboard`, leaderboardRoutes)

// ── Production: serve React client build and enable client-side routing ───────
if (IS_PRODUCTION) {
  const clientDist = path.join(__dirname, '../../client/dist')

  app.use(
    express.static(clientDist, {
      maxAge: '1y',
      etag: true,
      index: false,
    })
  )

  // Serve index.html for all non-API routes so React Router handles routing
  app.get(/^(?!\/(api|health))/, (_req: Request, res: Response) => {
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.use(errorHandler)

export default app
