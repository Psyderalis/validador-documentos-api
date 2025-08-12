const { metadataAnalizer } = require("../utils/metadataAnalizer")
const { fileTextAnalizer } = require("../utils/fileTextAnalizer")

const getDocumentAnalysis = async (name) => {
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

module.exports = { getDocumentAnalysis }