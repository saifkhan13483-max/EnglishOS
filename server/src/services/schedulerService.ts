import cron from 'node-cron'
import { prisma } from '../lib/prisma'
import { sendMissedDaysAlert, sendDailyReminder } from './emailService'
import { logger } from '../lib/logger'

// ── Date helpers ──────────────────────────────────────────────────────────────

function todayUTCRange(): { gte: Date; lt: Date } {
  const now = new Date()
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  return { gte: start, lt: new Date(start.getTime() + 24 * 60 * 60 * 1000) }
}

function nDaysAgoRange(n: number): { gte: Date; lt: Date } {
  const MS_PER_DAY = 24 * 60 * 60 * 1000
  const { gte: todayStart } = todayUTCRange()
  return {
    gte: new Date(todayStart.getTime() - n * MS_PER_DAY),
    lt:  new Date(todayStart.getTime() - (n - 1) * MS_PER_DAY),
  }
}

// ── Job 1: Missed-day accountability check ────────────────────────────────────
async function runMissedDayCheck(): Promise<void> {
  logger.info('[scheduler] Running missed-day accountability check…')

  const threeDaysAgo = nDaysAgoRange(3)

  const learners = await prisma.learner.findMany({
    where: {
      onboardingComplete: true,
      accountabilityEmail: { not: null },
      lastActiveDt: { gte: threeDaysAgo.gte, lt: threeDaysAgo.lt },
    },
    select: {
      email: true,
      name: true,
      accountabilityEmail: true,
      whyMotivation: true,
    },
  })

  logger.info({ count: learners.length }, '[scheduler] Missed-day check: learner(s) to notify')

  await Promise.allSettled(
    learners.map((learner) =>
      sendMissedDaysAlert(
        learner.email,
        learner.accountabilityEmail!,
        learner.name,
        3,
        learner.whyMotivation ?? undefined,
      ).catch((err: unknown) =>
        logger.error(
          { err, accountabilityEmail: learner.accountabilityEmail },
          '[scheduler] Failed to send missed-day alert'
        )
      )
    )
  )

  logger.info('[scheduler] Missed-day check complete')
}

// ── Job 2: Morning session reminder ──────────────────────────────────────────
async function runMorningReminders(): Promise<void> {
  logger.info('[scheduler] Running morning reminder job…')

  const today = todayUTCRange()

  const completedSessions = await prisma.missionSession.findMany({
    where: { sessionDate: today, type: 'MORNING', status: 'COMPLETE' },
    select: { learnerId: true },
  })
  const completedIds = new Set(completedSessions.map((s) => s.learnerId))

  const learners = await prisma.learner.findMany({
    where: { onboardingComplete: true },
    select: { id: true, email: true, name: true, morningSessionTime: true, streak: true },
  })

  const toNotify = learners.filter((l) => !completedIds.has(l.id))
  logger.info({ count: toNotify.length }, '[scheduler] Morning reminders: learner(s) to notify')

  await Promise.allSettled(
    toNotify.map((learner) =>
      sendDailyReminder(
        learner.email,
        learner.name,
        'MORNING',
        learner.morningSessionTime ?? '8:00 AM',
        learner.streak,
      ).catch((err: unknown) =>
        logger.error({ err, email: learner.email }, '[scheduler] Failed to send morning reminder')
      )
    )
  )

  logger.info('[scheduler] Morning reminder job complete')
}

// ── Job 3: Evening session reminder ──────────────────────────────────────────
async function runEveningReminders(): Promise<void> {
  logger.info('[scheduler] Running evening reminder job…')

  const today = todayUTCRange()

  const completedSessions = await prisma.missionSession.findMany({
    where: { sessionDate: today, type: 'EVENING', status: 'COMPLETE' },
    select: { learnerId: true },
  })
  const completedIds = new Set(completedSessions.map((s) => s.learnerId))

  const learners = await prisma.learner.findMany({
    where: { onboardingComplete: true },
    select: { id: true, email: true, name: true, eveningSessionTime: true, streak: true },
  })

  const toNotify = learners.filter((l) => !completedIds.has(l.id))
  logger.info({ count: toNotify.length }, '[scheduler] Evening reminders: learner(s) to notify')

  await Promise.allSettled(
    toNotify.map((learner) =>
      sendDailyReminder(
        learner.email,
        learner.name,
        'EVENING',
        learner.eveningSessionTime ?? '8:00 PM',
        learner.streak,
      ).catch((err: unknown) =>
        logger.error({ err, email: learner.email }, '[scheduler] Failed to send evening reminder')
      )
    )
  )

  logger.info('[scheduler] Evening reminder job complete')
}

// ── Mount all cron jobs ───────────────────────────────────────────────────────
export function startScheduler(): void {
  cron.schedule('59 18 * * *', () => {
    runMissedDayCheck().catch((err: unknown) =>
      logger.error({ err }, '[scheduler] Unhandled error in missed-day check')
    )
  })

  cron.schedule('0 3 * * *', () => {
    runMorningReminders().catch((err: unknown) =>
      logger.error({ err }, '[scheduler] Unhandled error in morning reminders')
    )
  })

  cron.schedule('0 15 * * *', () => {
    runEveningReminders().catch((err: unknown) =>
      logger.error({ err }, '[scheduler] Unhandled error in evening reminders')
    )
  })

  logger.info(
    '[scheduler] Cron jobs registered: 11:59 PM PKT (missed-day), 8:00 AM PKT (morning reminder), 8:00 PM PKT (evening reminder)'
  )
}
