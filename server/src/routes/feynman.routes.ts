import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { evaluateFeynman, getFeynmanArchive } from '../controllers/feynman.controller'

const router = Router()

router.use(authenticate)

router.post('/evaluate', evaluateFeynman)
router.get('/archive', getFeynmanArchive)

export default router
