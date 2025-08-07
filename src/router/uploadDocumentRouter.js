const express = require('express')
const router = express.Router()
const uploadDocumentController = require('../controllers/uploadDocumentController')
const uploadMiddleware = require('../middlewares/uploadMiddleware')

router.post('/', uploadMiddleware, uploadDocumentController.uploadDocument)

module.exports = router 