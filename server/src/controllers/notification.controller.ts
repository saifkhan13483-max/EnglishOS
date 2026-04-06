import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { logger } from '../lib/logger'

interface AuthRequest extends Request {
  userId?: string
}

export async function getNotificationPreferences(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId!
  try {
    const learner = await prisma.learner.findUnique({
      where: { id: learnerId },
      select: {
        morningSessionTime: true,
        eveningSessionTime: true,
        accountabilityEmail: true,
      },
    })
    if (!learner) {
      res.status(404).json({ success: false, error: 'Learner not found' })
      return
    }
    res.json({ success: true, data: learner })
  } catch (err) {
    logger.error({ err }, '[notification] getNotificationPreferences error')
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

export async function updateNotificationPreferences(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId!
  const { morningSessionTime, eveningSessionTime, accountabilityEmail } = req.body as {
    morningSessionTime?: string
    eveningSessionTime?: string
    accountabilityEmail?: string
  }

  try {
    const updated = await prisma.learner.update({
      where: { id: learnerId },
      data: {
        ...(morningSessionTime !== undefined && { morningSessionTime }),
        ...(eveningSessionTime !== undefined && { eveningSessionTime }),
        ...(accountabilityEmail !== undefined && { accountabilityEmail: accountabilityEmail || null }),
      },
      select: {
        morningSessionTime: true,
        eveningSessionTime: true,
        accountabilityEmail: true,
      },
    })
    res.json({ success: true, data: updated })
  } catch (err) {
    logger.error({ err }, '[notification] updateNotificationPreferences error')
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

export async function sendTestReminder(req: AuthRequest, res: Response): Promise<void> {
  const learnerId = req.userId!
  try {
    const learner = await prisma.learner.findUnique({
      where: { id: learnerId },
      select: { email: true, name: true, accountabilityEmail: true },
    })
    if (!learner) {
      res.status(404).json({ success: false, error: 'Learner not found' })
      return
    }

    logger.info({ learnerId, email: learner.email }, '[notification] Test reminder triggered')
    res.json({
      success: true,
      data: {
        message: 'Test reminder logged successfully. Email sending requires RESEND_API_KEY to be configured.',
        learner: { email: learner.email, name: learner.name },
      },
    })
  } catch (err) {
    logger.error({ err }, '[notification] sendTestReminder error')
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}
