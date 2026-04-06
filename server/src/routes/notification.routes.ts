import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getNotificationPreferences,
  updateNotificationPreferences,
  sendTestReminder,
} from '../controllers/notification.controller'

const router = Router()

router.use(authenticate)

router.get('/preferences', getNotificationPreferences)
router.patch('/preferences', updateNotificationPreferences)
router.post('/test', sendTestReminder)

export default router
