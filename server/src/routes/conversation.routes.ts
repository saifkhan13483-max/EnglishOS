import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { sendConversationMessage } from '../controllers/conversation.controller'
import { validate } from '../middleware/validator.middleware'
import { conversationMessageSchema } from '../schemas'

const router = Router()

router.use(authenticate)

router.post('/message', validate(conversationMessageSchema), sendConversationMessage)

export default router
