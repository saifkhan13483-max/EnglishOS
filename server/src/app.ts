import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import { errorHandler } from './middleware/errorHandler'

import authRoutes from './routes/auth.routes'
import learnerRoutes from './routes/learner.routes'
import contentRoutes from './routes/content.routes'
import missionRoutes from './routes/mission.routes'
import feynmanRoutes from './routes/feynman.routes'
import progressRoutes from './routes/progress.routes'
import leaderboardRoutes from './routes/leaderboard.routes'

const app = express()

app.set('trust proxy', 1)

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
)

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

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

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const API = '/api/v1'

app.use(`${API}/auth`, authRoutes)
app.use(`${API}/learner`, learnerRoutes)
app.use(`${API}/content`, contentRoutes)
app.use(`${API}/mission`, missionRoutes)
app.use(`${API}/feynman`, feynmanRoutes)
app.use(`${API}/progress`, progressRoutes)
app.use(`${API}/leaderboard`, leaderboardRoutes)

app.use(errorHandler)

export default app
