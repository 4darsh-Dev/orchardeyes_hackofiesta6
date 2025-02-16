import express from 'express'
import multer from 'multer'
import { partsClassification } from '../controllers/imagePredictionController.js'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post('/part-classification', upload.single('file'), partsClassification)

export default router
