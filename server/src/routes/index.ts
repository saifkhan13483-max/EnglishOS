import { Router } from 'express'
import authRoutes       from './auth.routes'
import learnerRoutes    from './learner.routes'
import progressRoutes   from './progress.routes'
import leaderboardRoutes from './leaderboard.routes'
import missionRoutes    from './mission.routes'
import feynmanRoutes    from './feynman.routes'
import contentRoutes    from './content.routes'

const router = Router()

router.use('/auth',        authRoutes)
router.use('/learner',     learnerRoutes)
router.use('/progress',    progressRoutes)
router.use('/leaderboard', leaderboardRoutes)
router.use('/missions',    missionRoutes)
router.use('/feynman',     feynmanRoutes)
router.use('/content',     contentRoutes)

export default router
