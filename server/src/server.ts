import dotenv from 'dotenv'

dotenv.config()

import app from './app'

const PORT = parseInt(process.env.PORT || '3000', 10)

app.listen(PORT, () => {
  console.log(`EnglishOS API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
})
