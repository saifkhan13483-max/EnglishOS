import { Resend } from 'resend'

// Lazily create the client so the server can start without RESEND_API_KEY set.
// Callers should use getResend() and skip sending when it returns null.
let _resend: Resend | null = null

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}
