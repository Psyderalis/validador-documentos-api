const { metadataAnalizer } = require("../utils/metadataAnalizer")

const getDocumentAnalysis = async (name) => {
    const path = `uploads/${name}`
    const documentAnalysis = await metadataAnalizer(path)

    console.log(`Resultado de análisis del documento ${name}: `, documentAnalysis)

    return {
        name,
        isValid: documentAnalysis.valid
    }
}

module.exports = { getDocumentAnalysis }