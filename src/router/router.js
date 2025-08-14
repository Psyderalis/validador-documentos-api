import express from 'express'
const router = express.Router()

import { uploadDocumentController } from '../controllers/documentController.js'
import { getDocumentAnalysisController } from '../controllers/documentController.js'
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js'



router.post('/', uploadMiddleware, uploadDocumentController)
router.get('/:documentName', getDocumentAnalysisController)

export { router }