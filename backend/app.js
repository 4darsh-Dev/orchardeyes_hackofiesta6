import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import userRoutes from './src/routes/user.js'
import imagePredictionRoutes from './src/routes/imagePrediction.js'
import weatherRoutes from './src/routes/weather.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : 'http://localhost:5173'
app.use(express.json())
app.use(
  cors({
    origin: corsOrigins
  })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRoutes)
app.use('/predict', imagePredictionRoutes)
app.use('/', weatherRoutes)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
