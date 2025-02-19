import express from 'express'
import { sendWeatherData } from '../controllers/weatherController.js'

const router = express.Router()

router.get('/get-weather-data', sendWeatherData)
export default router
