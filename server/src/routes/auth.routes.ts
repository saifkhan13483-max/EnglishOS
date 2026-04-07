import { Router } from 'express'
import { register, login, refresh, logout } from '../controllers/auth.controller'
import { validate } from '../middleware/validator.middleware'
import { asyncHandler } from '../middleware/asyncHandler'
import { registerSchema, loginSchema } from '../schemas'

const router = Router()

router.post('/register', validate(registerSchema), asyncHandler(register))
router.post('/login', validate(loginSchema), asyncHandler(login))
router.post('/refresh', asyncHandler(refresh))
router.post('/logout', asyncHandler(logout))

export default router
