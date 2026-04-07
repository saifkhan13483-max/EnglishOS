import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { asyncHandler } from '../middleware/asyncHandler'
import {
  startMission,
  completeMission,
  getTodayMissions,
} from '../controllers/mission.controller'
import { validate } from '../middleware/validator.middleware'
import { startMissionSchema } from '../schemas'

const router = Router()

router.use(authenticate)

router.get('/today', asyncHandler(getTodayMissions))
router.post('/start', validate(startMissionSchema), asyncHandler(startMission))
router.put('/:id/complete', asyncHandler(completeMission))

export default router
