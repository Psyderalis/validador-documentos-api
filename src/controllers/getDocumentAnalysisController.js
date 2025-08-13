import { getDocumentAnalysisService } from '../services/getDocumentAnalysisService.js'

const getDocumentAnalysis = async (req, res) => {
    try {
        const { documentName } = req.params
        const result = await getDocumentAnalysisService(documentName)
        res.status(200).json(result)
    } catch (err) {
        console.error('Error en controlador:', err)
        res.status(500).json({ error: err.message })
    }
}

export { getDocumentAnalysis }