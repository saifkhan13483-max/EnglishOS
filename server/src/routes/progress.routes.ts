import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getMasteryMap,
  getDashboard,
  submitGate,
  getStats,
} from '../controllers/progress.controller'

const router = Router()

router.use(authenticate)

router.get('/map', getMasteryMap)
router.get('/dashboard', getDashboard)
router.post('/gate/submit', submitGate)
router.get('/stats', getStats)

export default router
