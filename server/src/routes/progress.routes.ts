import { Router } from 'express'
import { authenticate } from '../middleware/auth'
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

router.get('/map', getMasteryMap)
router.get('/dashboard', getDashboard)
router.post('/gate/submit', validate(submitGateSchema), submitGate)
router.post('/module/complete', completeModule)
router.get('/stats', getStats)

export default router
