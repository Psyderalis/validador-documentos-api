import { metadataAnalizer } from '../utils/metadataAnalizer.js';
import { fileTextAnalizer } from '../utils/fileTextAnalizer.js';
import { extractTextOCR } from '../utils/extractTextOCR.js'; import { preprocessImage } from '../utils/preprocessImage.js';
import { textVsQRAnalyzer } from '../utils/textVsQRAnalyzer.js';
import path from "path";
import { pdfToImgConverter } from '../utils/pdfToImgConverter.js';
import { qrReader } from '../utils/qrReader.js';
const getDocumentAnalysisService = async (name) => {

    let filePath = `uploads/${name}`

    const ext = path.extname(filePath)
    const analysisResult = { name, valid: true, signals: [], }

    try {
        const metadataAnalysis = await metadataAnalizer(filePath)

        if (ext === '.pdf') { filePath = await pdfToImgConverter(filePath) }

        filePath = await preprocessImage(filePath)

        const qrUrl = await qrReader(filePath)
        const text = await extractTextOCR(filePath)
        const textAnalysis = fileTextAnalizer(text)
        const qrAnalysis = textVsQRAnalyzer(text, qrUrl)

        const allSignals = [...metadataAnalysis.signals, ...textAnalysis.signals, ...qrAnalysis.signals]

        analysisResult.valid = metadataAnalysis.valid && textAnalysis.valid && qrAnalysis.valid
        analysisResult.signals = allSignals

        console.log(analysisResult)
        return analysisResult

    } catch (error) {
        console.error('Error en el servicio de análisis: ', error)
        throw new Error('Error en el servicio de análisis: ', error);
    }
}
export { getDocumentAnalysisService }