import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getMasteryMap,
  getDashboard,
  submitGate,
  getStats,
  completeModule,
} from '../controllers/progress.controller'

const router = Router()

router.use(authenticate)

router.get('/map', getMasteryMap)
router.get('/dashboard', getDashboard)
router.post('/gate/submit', submitGate)
router.post('/module/complete', completeModule)
router.get('/stats', getStats)

export default router
