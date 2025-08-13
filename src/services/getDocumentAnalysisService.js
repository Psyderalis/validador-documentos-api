import { metadataAnalizer } from '../utils/metadataAnalizer.js';
import { fileTextAnalizer } from '../utils/fileTextAnalizer.js';

const getDocumentAnalysisService = async (name) => {
    const path = `uploads/${name}`
    const metadataAnalysis = await metadataAnalizer(path)
    const textAnalysis = await fileTextAnalizer(path)

    console.log(`Resultado de análisis metadata documento ${name}: `, metadataAnalysis)

    console.log(`Resultado de análisis texto documento ${name}: `, textAnalysis)

    return {
        name,
        isValid: metadataAnalysis.valid && textAnalysis.valid 
    }
}

export { getDocumentAnalysisService }