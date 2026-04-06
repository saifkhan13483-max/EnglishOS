import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { evaluateFeynman, getFeynmanArchive } from '../controllers/feynman.controller'
import { validate } from '../middleware/validator.middleware'
import { evaluateFeynmanSchema } from '../schemas'

const router = Router()

router.use(authenticate)

router.post('/evaluate', validate(evaluateFeynmanSchema), evaluateFeynman)
router.get('/archive', getFeynmanArchive)

export default router
