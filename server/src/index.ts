import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'EnglishOS API' })
})

app.listen(PORT, () => {
  console.log(`EnglishOS server running on port ${PORT}`)
})

export default app
