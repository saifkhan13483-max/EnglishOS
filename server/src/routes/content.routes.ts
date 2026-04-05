import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getModule,
  getItem,
  getLevels,
  getTodayQueue,
  getTomorrowQueue,
  reviewQueueItem,
} from '../controllers/content.controller'

const router = Router()

router.use(authenticate)

router.get('/levels', getLevels)
router.get('/sr-queue/today', getTodayQueue)
router.get('/sr-queue/tomorrow', getTomorrowQueue)
router.patch('/sr-queue/:id', reviewQueueItem)
router.get('/module/:level/:module', getModule)
router.get('/item/:id', getItem)

export default router
