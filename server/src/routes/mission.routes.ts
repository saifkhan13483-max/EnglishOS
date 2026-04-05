import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  startMission,
  completeMission,
  getTodayMissions,
} from '../controllers/mission.controller'

const router = Router()

router.use(authenticate)

router.get('/today', getTodayMissions)
router.post('/start', startMission)
router.put('/:id/complete', completeMission)

export default router
