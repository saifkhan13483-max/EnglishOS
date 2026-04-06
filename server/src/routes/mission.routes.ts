import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  startMission,
  completeMission,
  getTodayMissions,
} from '../controllers/mission.controller'
import { validate } from '../middleware/validator.middleware'
import { startMissionSchema } from '../schemas'

const router = Router()

router.use(authenticate)

router.get('/today', getTodayMissions)
router.post('/start', validate(startMissionSchema), startMission)
router.put('/:id/complete', completeMission)

export default router
