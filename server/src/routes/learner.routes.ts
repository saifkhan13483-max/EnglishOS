import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getProfile,
  updateProfile,
  completeOnboarding,
  updateStakes,
  useBatmanSkip,
  deleteAccount,
} from '../controllers/learner.controller'

const router = Router()

router.use(authenticate)

router.get('/profile', getProfile)
router.put('/profile', updateProfile)
router.post('/onboarding', completeOnboarding)
router.put('/stakes', updateStakes)
router.post('/batman-skip', useBatmanSkip)
router.delete('/account', deleteAccount)

export default router
