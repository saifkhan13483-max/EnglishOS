import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { asyncHandler } from '../middleware/asyncHandler'
import {
  getNotificationPreferences,
  updateNotificationPreferences,
  sendTestReminder,
} from '../controllers/notification.controller'

const router = Router()

router.use(authenticate)

router.get('/preferences', asyncHandler(getNotificationPreferences))
router.patch('/preferences', asyncHandler(updateNotificationPreferences))
router.post('/test', asyncHandler(sendTestReminder))

export default router
