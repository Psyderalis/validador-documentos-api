import { uploadDocumentService } from "../services/uploadDocumentService.js"
import { getDocumentAnalysisService } from "../services/getDocumentAnalysisService.js"
import { setUrl, getUrl } from "../services/urlStorageService.js"

const uploadDocumentController = async (req, res) => {
    try {
        const url = req.body.qrUrl
        const file = req.file

        if (!url) return res.status(400).json({ error: 'Falta URL' })
        if (!file) return res.status(400).json({ error: 'Archivo no subido' })

        setUrl(url)

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
        const url = getUrl()
        
        const result = await getDocumentAnalysisService(documentName, url)
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
