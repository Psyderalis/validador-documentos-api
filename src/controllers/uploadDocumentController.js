const uploadDocumentService = require('../services/uploadDocumentService')

const uploadDocument = async (req, res) => {
    try {
        const result = uploadDocumentService.uploadADocument()
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { uploadDocument }