import { Router, Request, Response } from 'express'
import { logger } from '../lib/logger'

const router = Router()

router.post('/client-error', (req: Request, res: Response): void => {
  const { message, componentStack, url, userAgent } = req.body as {
    message?: string
    componentStack?: string
    url?: string
    userAgent?: string
  }

  logger.error(
    {
      type: 'client_error',
      message,
      componentStack,
      url,
      userAgent,
    },
    'Client-side error reported'
  )

  res.status(200).json({ success: true })
})

export default router
