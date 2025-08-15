import { uploadDocumentService } from "../services/uploadDocumentService.js"
import { getDocumentAnalysisService } from "../services/getDocumentAnalysisService.js"

const uploadDocumentController = async (req, res) => {
    try {
        const file = req.file

        if (!file) return res.status(400).json({ error: 'Archivo no subido' })

        const result = await uploadDocumentService(file)
        res.status(201).json(result)
    } catch (err) {
        console.error('Error en controlador:', err)
        res.status(500).json({ error: err.message })
    }
}

const getDocumentAnalysisController = async (req, res) => {
    try {
        const { documentName } = req.params
        
        const result = await getDocumentAnalysisService(documentName)
        res.status(200).json(result)
    } catch (err) {
        console.error('Error en controlador:', err)
        res.status(500).json({ error: err.message })
    }
}

export {
    uploadDocumentController,
    getDocumentAnalysisController
}
