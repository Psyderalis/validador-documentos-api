import express from 'express'
const router = express.Router()
import { uploadDocumentController } from '../controllers/uploadDocumentController.js'
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js'
import { getDocumentAnalysis } from '../controllers/getDocumentAnalysisController.js'


router.post('/', uploadMiddleware, uploadDocumentController)
router.get('/:documentName', getDocumentAnalysis)

export { router }