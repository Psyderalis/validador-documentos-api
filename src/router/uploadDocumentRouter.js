const express = require('express')
const router = express.Router()
const uploadDocumentController = require('../controllers/uploadDocumentController')
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const { getDocumentAnalysis } = require('../controllers/getDocumentAnalysisController')

router.post('/', uploadMiddleware, uploadDocumentController.uploadDocument)
router.get('/:documentName', getDocumentAnalysis)

module.exports = router 