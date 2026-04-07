import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { asyncHandler } from '../middleware/asyncHandler'
import { evaluateFeynman, getFeynmanArchive } from '../controllers/feynman.controller'
import { validate } from '../middleware/validator.middleware'
import { evaluateFeynmanSchema } from '../schemas'

const router = Router()

router.use(authenticate)

router.post('/evaluate', validate(evaluateFeynmanSchema), asyncHandler(evaluateFeynman))
router.get('/archive', asyncHandler(getFeynmanArchive))

export default router
