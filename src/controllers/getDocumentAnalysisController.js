const getDocumentAnalysisService = require('../services/getDocumentAnalysisService')

const getDocumentAnalysis = async (req, res) => {
    try {
        const { documentName } = req.params
        const result = await getDocumentAnalysisService.getDocumentAnalysis(documentName)
        res.status(200).json(result)
    } catch (err) {
        console.error('Error en controlador:', err)
        res.status(500).json({ error: err.message })
    }
}

module.exports = { getDocumentAnalysis }