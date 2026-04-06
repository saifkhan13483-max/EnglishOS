import { Router, Request, Response } from 'express'
import { logger } from '../lib/logger'
import { prisma } from '../lib/prisma'
import {
  runMissedDayCheck,
  runMorningReminders,
  runEveningReminders,
} from '../services/schedulerService'

const router = Router()

function checkDebugSecret(req: Request, res: Response): boolean {
  const secret = process.env.SCHEDULER_DEBUG_SECRET
  if (!secret) {
    res.status(503).json({ success: false, error: 'Debug endpoints are not enabled (SCHEDULER_DEBUG_SECRET not set)' })
    return false
  }
  const provided = req.headers['x-debug-secret'] as string | undefined
  if (!provided || provided !== secret) {
    res.status(401).json({ success: false, error: 'Invalid debug secret' })
    return false
  }
  return true
}

// POST /api/v1/debug/scheduler/missed-day-check
// Manually trigger the accountability missed-day checker.
// Requires header: X-Debug-Secret: <SCHEDULER_DEBUG_SECRET>
// To test: set a learner's lastActiveDt to 3 days ago and their accountabilityEmail to a real address.
router.post('/scheduler/missed-day-check', async (req: Request, res: Response): Promise<void> => {
  if (!checkDebugSecret(req, res)) return
  logger.info('[debug] Manual trigger: missed-day-check')
  try {
    await runMissedDayCheck()
    res.json({ success: true, message: 'Missed-day check completed. Check server logs for results.' })
  } catch (err) {
    logger.error({ err }, '[debug] Error in manual missed-day check')
    res.status(500).json({ success: false, error: 'Missed-day check failed' })
  }
})

// POST /api/v1/debug/scheduler/morning-reminders
router.post('/scheduler/morning-reminders', async (req: Request, res: Response): Promise<void> => {
  if (!checkDebugSecret(req, res)) return
  logger.info('[debug] Manual trigger: morning-reminders')
  try {
    await runMorningReminders()
    res.json({ success: true, message: 'Morning reminders job completed. Check server logs for results.' })
  } catch (err) {
    logger.error({ err }, '[debug] Error in manual morning reminders')
    res.status(500).json({ success: false, error: 'Morning reminders failed' })
  }
})

// POST /api/v1/debug/scheduler/evening-reminders
router.post('/scheduler/evening-reminders', async (req: Request, res: Response): Promise<void> => {
  if (!checkDebugSecret(req, res)) return
  logger.info('[debug] Manual trigger: evening-reminders')
  try {
    await runEveningReminders()
    res.json({ success: true, message: 'Evening reminders job completed. Check server logs for results.' })
  } catch (err) {
    logger.error({ err }, '[debug] Error in manual evening reminders')
    res.status(500).json({ success: false, error: 'Evening reminders failed' })
  }
})

// POST /api/v1/debug/set-last-active
// Set a learner's lastActiveDt to N days ago for testing accountability notifications.
// Body: { email: string, daysAgo: number }
router.post('/set-last-active', async (req: Request, res: Response): Promise<void> => {
  if (!checkDebugSecret(req, res)) return
  const { email, daysAgo } = req.body as { email?: string; daysAgo?: number }

  if (!email || typeof daysAgo !== 'number' || daysAgo < 0) {
    res.status(400).json({ success: false, error: 'email (string) and daysAgo (number >= 0) are required' })
    return
  }

  const targetDate = new Date()
  targetDate.setUTCDate(targetDate.getUTCDate() - daysAgo)
  targetDate.setUTCHours(12, 0, 0, 0)

  const updated = await prisma.learner.updateMany({
    where: { email },
    data: { lastActiveDt: targetDate },
  })

  if (updated.count === 0) {
    res.status(404).json({ success: false, error: `No learner found with email: ${email}` })
    return
  }

  logger.info({ email, daysAgo, targetDate }, '[debug] Set lastActiveDt for learner')
  res.json({ success: true, data: { email, lastActiveDt: targetDate.toISOString(), daysAgo } })
})

// POST /api/v1/debug/set-streak
// Set a learner's streak to a specific value for testing Batman Mode.
// Body: { email: string, streak: number }
router.post('/set-streak', async (req: Request, res: Response): Promise<void> => {
  if (!checkDebugSecret(req, res)) return
  const { email, streak } = req.body as { email?: string; streak?: number }

  if (!email || typeof streak !== 'number' || streak < 0) {
    res.status(400).json({ success: false, error: 'email (string) and streak (number >= 0) are required' })
    return
  }

  const updated = await prisma.learner.updateMany({
    where: { email },
    data: { streak },
  })

  if (updated.count === 0) {
    res.status(404).json({ success: false, error: `No learner found with email: ${email}` })
    return
  }

  logger.info({ email, streak }, '[debug] Set streak for learner')
  res.json({ success: true, data: { email, streak } })
})

export default router
