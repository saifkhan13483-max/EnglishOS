import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId?: string
  learnerId?: string
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.slice(7)

  try {
    const secret = process.env.JWT_SECRET as string
    const payload = jwt.verify(token, secret) as { userId: string }
    req.userId = payload.userId
    req.learnerId = payload.userId
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
