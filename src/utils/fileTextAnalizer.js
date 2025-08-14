import { createWorker } from 'tesseract.js'
import { parseDate } from './parseDate.js'


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
    // console.log(text)

    const datesText = text.match(
        /\b\d{1,2}(?: DE)?\s+(ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE)(?: DE)?\s+\d{4}\b/g
    ) || []
    const dateSlash = text.match(/\b(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}\b/g) || []

    const isCertificadoTitle = /CERTIFICADO\s+DE\s+REVISIÓN\s+TÉCNICA/g.test(text)

    if (!isCertificadoTitle) {
        fileResults.valid = false
        fileResults.signals.push('No presenta título válido')
    }

    if (datesText.length < 2) {
        fileResults.valid = false
        fileResults.signals.push('No se encontró fecha de emisión y/o vencimiento')
        return fileResults
    }
    if (dateSlash.length < 1) {
        fileResults.valid = false
        fileResults.signals.push('No se encontró fecha de firma')
        return fileResults
    }

    // Solo parsear si hay coincidencias
    const issueDate = datesText[0] ? parseDate(datesText[0]) : null
    const signatureDate = dateSlash[0] ? parseDate(dateSlash[0]) : null
    const expirationDate = datesText[1] ? parseDate(datesText[1]) : null

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

// fileTextAnalizer('uploads/pre_20250510_130650.png').then(res => console.log(res))

export { fileTextAnalizer, runOCR }

