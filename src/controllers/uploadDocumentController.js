import { uploadDocumentService } from '../services/uploadDocumentService.js'

const uploadDocumentController = async (req, res) => {
    try {
        const url = req.body.qrUrl
        const file = req.file

        if (!file) return res.status(400).json({ error: 'Archivo no subido' })

        const result = await uploadDocumentService(file)
        res.status(201).json(result)
    } catch (err) {
        console.error('Error en controlador:', err)
        res.status(500).json({ error: err.message })
    }
}

export { uploadDocumentController }