import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { evaluateFeynman } from '../controllers/feynman.controller'

const router = Router()

router.use(authenticate)

router.post('/evaluate', evaluateFeynman)

export default router
