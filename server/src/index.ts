import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5000'

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'EnglishOS API' })
})

app.use('/api/v1', routes)

app.listen(PORT, () => {
  console.log(`EnglishOS server running on port ${PORT}`)
})

export default app
