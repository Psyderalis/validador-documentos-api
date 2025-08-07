const express = require('express')
const router = express.Router()
const { uploadDocument } = require('../controllers/uploadDocumentController')

router.post('/', uploadDocument)

module.exports = router