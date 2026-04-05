import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { sendConversationMessage } from '../controllers/conversation.controller'

const router = Router()

router.use(authenticate)

router.post('/message', sendConversationMessage)

export default router
