import { metadataAnalizer } from '../utils/metadataAnalizer.js';
import { fileTextAnalizer } from '../utils/fileTextAnalizer.js';
import { extractTextOCR } from '../utils/extractTextOCR.js';
import { preprocessImage } from '../utils/processImage.js';
import { textVsQRAnalyzer } from '../utils/textVsQRAnalyzer.js';

const getDocumentAnalysisService = async (name, url) => {
    const path = `uploads/${name}`
    const analysisResult = {
        valid: true,
        signals: [],
    }

    try {
        const metadataAnalysis = await metadataAnalizer(path)
        const proImgPath = await preprocessImage(path)
        const text = await extractTextOCR(proImgPath)
        const textAnalysis = fileTextAnalizer(text)
        const qrAnalysis = textVsQRAnalyzer(text, url)

        const signals = metadataAnalysis.signals.concat(textAnalysis.signals.concat(qrAnalysis.signals))

        analysisResult.valid = metadataAnalysis.valid && textAnalysis.valid && qrAnalysis.valid
        analysisResult.signals = signals

        return analysisResult

    } catch (error) {
        console.error(error)
    }
}

export { getDocumentAnalysisService }