import { getResend } from '../lib/resend'

const APP_URL = process.env.CLIENT_URL || 'https://englishos.app'
const FROM_EMAIL = 'EnglishOS <noreply@englishos.app>'

// ── sendMissedDaysAlert ───────────────────────────────────────────────────────
//
// Sent to the accountability partner when a learner has missed exactly 3
// consecutive days of their missions.
//
export async function sendMissedDaysAlert(
  learnerEmail: string,
  accountabilityEmail: string,
  learnerName: string,
  daysMissed: number,
  whyMotivation?: string,
): Promise<void> {
  const resend = getResend()
  if (!resend) {
    console.warn('[emailService] RESEND_API_KEY not set — skipping missed-days alert')
    return
  }

  const subject = `${learnerName} needs a nudge — they've missed ${daysMissed} days of EnglishOS`

  const whySection = whyMotivation
    ? `
      <p>When ${learnerName} started their journey, they shared their reason for learning English:</p>
      <blockquote style="margin: 16px 0; padding: 12px 18px; border-left: 4px solid #E94560; color: #444; font-style: italic; background: #fafafa;">
        "${whyMotivation}"
      </blockquote>
      <p>That goal is still waiting for them.</p>`
    : ''

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 40px auto; padding: 0 24px; color: #222; line-height: 1.75;">

  <p style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">EnglishOS — Accountability Notice</p>
  <h2 style="color: #E94560; font-size: 22px; margin-top: 0; margin-bottom: 20px;">
    ${learnerName} could use a check-in
  </h2>

  <p>Hi there,</p>

  <p>
    <strong>${learnerName}</strong> has missed <strong>${daysMissed} consecutive days</strong> of their
    English learning and could use a friendly nudge from you.
  </p>

  <p>
    <strong>What is EnglishOS?</strong> It is a structured, science-based platform that helps South Asian
    learners reach fluent English in 300 focused days — just 1 hour a day, split into a 20-minute
    morning mission and a 40-minute evening mission. When learners stay consistent, the results are
    real. When they fall off, it is usually only because nobody noticed.
  </p>

  <p>
    ${learnerName} added you as their <strong>accountability partner</strong> when they signed up.
    That means they trust you enough to ask you to keep them honest.
  </p>

  ${whySection}

  <p>
    You do not need to do anything complicated. A WhatsApp message, a quick call, or even a
    simple "how is your English going?" is enough to bring someone back on track.
  </p>

  <p style="margin-top: 32px; padding: 16px; background: #f9f9f9; border: 1px solid #eee; border-radius: 6px; font-size: 14px;">
    💬 <em>Try saying:</em> "Hey, I heard you've been learning English — how is it going? Have you done your mission today?"
  </p>

  <p style="margin-top: 36px; color: #999; font-size: 13px; line-height: 1.6;">
    This email was sent automatically by EnglishOS on behalf of
    <strong>${learnerName}</strong> (${learnerEmail}).<br>
    You received this because ${learnerName} listed you as their accountability partner.
  </p>

</body>
</html>`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: accountabilityEmail,
    subject,
    html,
  })
}

// ── sendDailyReminder ─────────────────────────────────────────────────────────
//
// Sent directly to the learner as a morning or evening mission reminder.
//
export async function sendDailyReminder(
  learnerEmail: string,
  learnerName: string,
  sessionType: 'MORNING' | 'EVENING',
  sessionTime: string,
  streak?: number,
): Promise<void> {
  const resend = getResend()
  if (!resend) {
    console.warn('[emailService] RESEND_API_KEY not set — skipping daily reminder')
    return
  }

  const isMorning = sessionType === 'MORNING'
  const label = isMorning ? 'Morning' : 'Evening'
  const duration = isMorning ? '20 minutes' : '40 minutes'
  const subject = `Your ${label} English Mission is ready, ${learnerName}`

  const encouragement = isMorning
    ? 'Start your day by doing the one thing most people keep postponing. 20 focused minutes of deliberate practice compounds faster than you think.'
    : 'Close the day with intention. Your evening mission locks in everything you practiced this morning and prepares your brain for overnight retention.'

  const streakSection = streak && streak > 0
    ? `<p style="font-size: 22px; font-weight: bold; color: #E94560; margin: 8px 0;">🔥 ${streak}-day streak — do not break it today.</p>`
    : ''

  const missionPath = isMorning ? 'morning' : 'evening'

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 40px auto; padding: 0 24px; color: #222; line-height: 1.75;">

  <p style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">EnglishOS — ${label} Mission</p>
  <h2 style="color: #E94560; font-size: 22px; margin-top: 0; margin-bottom: 16px;">
    Your ${label} Mission is waiting, ${learnerName}
  </h2>

  ${streakSection}

  <p>${encouragement}</p>

  <p>
    Today's ${label.toLowerCase()} session is scheduled for <strong>${sessionTime}</strong>.
    It takes just <strong>${duration}</strong> — and every session moves you closer to the English
    you have been working toward.
  </p>

  <p style="margin-top: 28px;">
    <a
      href="${APP_URL}/mission/${missionPath}"
      style="display: inline-block; background: #E94560; color: #ffffff; padding: 13px 30px; text-decoration: none; border-radius: 6px; font-family: Arial, sans-serif; font-weight: bold; font-size: 15px;"
    >
      Start ${label} Mission →
    </a>
  </p>

  <p style="margin-top: 40px; color: #999; font-size: 13px; line-height: 1.6;">
    You are receiving this reminder because you enabled daily notifications in EnglishOS.<br>
    You can update your notification preferences in your
    <a href="${APP_URL}/profile" style="color: #999;">profile settings</a>.
  </p>

</body>
</html>`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: learnerEmail,
    subject,
    html,
  })
}
