import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  learnerId?: string
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  const token = authHeader.slice(7)

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET is not set')
    const payload = jwt.verify(token, secret) as { userId: string }
    req.learnerId = payload.userId
    next()
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token' })
  }
}
