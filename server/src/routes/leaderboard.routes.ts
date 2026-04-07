import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { asyncHandler } from '../middleware/asyncHandler'
import {
  getWeeklyLeaderboard,
  submitFeynman,
  upvoteEntry,
} from '../controllers/leaderboard.controller'

const router = Router()

router.use(authenticate)

router.get('/feynman/weekly', asyncHandler(getWeeklyLeaderboard))
router.post('/feynman/submit', asyncHandler(submitFeynman))
router.post('/feynman/:entryId/upvote', asyncHandler(upvoteEntry))

export default router
