import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getModule,
  getItem,
  getLevels,
  getTodayQueue,
  getTomorrowQueue,
  getRecentQueue,
  reviewQueueItem,
  bulkReview,
} from '../controllers/content.controller'
import { validate } from '../middleware/validator.middleware'
import { srReviewSchema } from '../schemas'

const router = Router()

router.use(authenticate)

router.get('/levels', getLevels)
router.get('/sr-queue/today', getTodayQueue)
router.get('/sr-queue/tomorrow', getTomorrowQueue)
router.get('/sr-queue/recent', getRecentQueue)
router.patch('/sr-queue/:id', reviewQueueItem)
router.post('/sr-review', validate(srReviewSchema), bulkReview)
router.get('/module/:level/:module', getModule)
router.get('/item/:id', getItem)

export default router
