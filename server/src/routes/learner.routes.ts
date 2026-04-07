import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { asyncHandler } from '../middleware/asyncHandler'
import {
  getProfile,
  updateProfile,
  completeOnboarding,
  updateStakes,
  useBatmanSkip,
  deleteAccount,
} from '../controllers/learner.controller'
import { validate } from '../middleware/validator.middleware'
import { onboardingSchema } from '../schemas'

const router = Router()

router.use(authenticate)

router.get('/profile', asyncHandler(getProfile))
router.put('/profile', asyncHandler(updateProfile))
router.post('/onboarding', validate(onboardingSchema), asyncHandler(completeOnboarding))
router.put('/stakes', asyncHandler(updateStakes))
router.post('/batman-skip', asyncHandler(useBatmanSkip))
router.delete('/account', asyncHandler(deleteAccount))

export default router
