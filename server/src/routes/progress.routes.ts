import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { asyncHandler } from '../middleware/asyncHandler'
import {
  getMasteryMap,
  getDashboard,
  submitGate,
  getStats,
  completeModule,
} from '../controllers/progress.controller'
import { validate } from '../middleware/validator.middleware'
import { submitGateSchema } from '../schemas'

const router = Router()

router.use(authenticate)

router.get('/map', asyncHandler(getMasteryMap))
router.get('/dashboard', asyncHandler(getDashboard))
router.post('/gate/submit', validate(submitGateSchema), asyncHandler(submitGate))
router.post('/module/complete', asyncHandler(completeModule))
router.get('/stats', asyncHandler(getStats))

export default router
