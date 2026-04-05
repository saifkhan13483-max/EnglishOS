import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getWeeklyLeaderboard,
  submitFeynman,
  upvoteEntry,
} from '../controllers/leaderboard.controller'

const router = Router()

router.use(authenticate)

router.get('/feynman/weekly', getWeeklyLeaderboard)
router.post('/feynman/submit', submitFeynman)
router.post('/feynman/:entryId/upvote', upvoteEntry)

export default router
