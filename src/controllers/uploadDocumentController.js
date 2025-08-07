const uploadDocumentService = require('../services/uploadDocumentService')

const uploadDocument = async (req, res) => {
    try {
        const file = req.file
        if(!file) return res.status(400).json({error: 'Archivo no subido'})
            
        const result = await uploadDocumentService.uploadADocument(file)
        res.status(201).json(result)
    } catch (err) {
        console.error('Error en controlador:', err)
        res.status(500).json({ error: err.message })
    }
}

module.exports = { uploadDocument }