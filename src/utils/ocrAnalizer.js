const { createWorker, setLogging } = require('tesseract.js');
const { parseDate } = require('./parseDate');

const runOCR = async (imagePath) => {
    let worker
    try {
        worker = await createWorker('spa')
        const { data: { text } } = await worker.recognize(imagePath)

        return text
    } catch (err) {
        console.error("Error en OCR:", err)
        return null
    } finally {
        worker && await worker.terminate()
    }
}

const fileTextAnalizer = async (filePath) => {
    const fileResults = {
        filePath,
        valid: true,
        signals: [],
    }
    const text = await runOCR(filePath)

    const issueDate = parseDate(text.match(/\b\d{1,2}\s+(ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE)\s+\d{4}\b/g)[0])
    const signatureDate = parseDate(text.match(/\b(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}\b/g)[0])
    const expirationDate = parseDate(text.match(/\b\d{1,2}\s+(ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE)\s+\d{4}\b/g)[1])
    const isCertificadoTitle = /CERTIFICADO\s+DE\s+REVISIÓN\s+TÉCNICA/g.test(text)

    if (!isCertificadoTitle) {
        fileResults.valid = false
        fileResults.signals.push('No presenta título válido')
    }

    // comparar fecha de firma con fecha de emisión
    if (issueDate.getTime() !== signatureDate.getTime()) {
        fileResults.valid = false
        fileResults.signals.push('Fecha de emisión no coincide con fecha de firma')
    }

    // comparar que fecha de vencimiento no sea mayor a un año que fecha de emisión
    const yearToMs = 366 * 24 * 60 * 60 * 1000 //margen para años bisiestos
    const diff = expirationDate.getTime() - issueDate.getTime()
   
    if (diff < 0) {
        fileResults.valid = false
        fileResults.signals.push('Fecha de vencimiento anterior a fecha de emisión')
    }

    if (diff > yearToMs) {
        fileResults.valid = false
        fileResults.signals.push('Fecha de vencimiento mayor a un año desde fecha de emisión')
    }

    return fileResults
}



// (async () => {
//     console.log(await fileTextAnalizer('uploads/document-1754949151366.jpg'))
// })()