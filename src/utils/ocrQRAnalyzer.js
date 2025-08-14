
import { runOCR } from "./fileTextAnalizer.js";
import { preprocessImage } from "./processImage.js";

const ocrQRAnalyzer = async (filePath, url) => {
    const fileResults = {
        filePath,
        valid: true,
        signals: [],
    };

    try {
        const processedImgPath = await preprocessImage(filePath)
        const text = await runOCR(processedImgPath);

        const regexPatente = /\b([A-Z]{2}\d{4}|[A-Z]{4}\d{2})\b/g
        const patenteOcr = text.match(regexPatente) ? text.match(regexPatente)[0] : ''

        if (!patenteOcr) {
            fileResults.valid = false
            fileResults.signals.push('No se detectó patente en el documento')
        }
        // console.log('OCR:', patenteOcr)

        let patenteUrl = ''
        try {
            const urlObj = new URL(url)
            patenteUrl = urlObj.searchParams.get("patente") || ''
        } catch (err) {
            console.error('URL inválida:', url)
            fileResults.valid = false;
            fileResults.signals.push('URL inválida')
        }

        // console.log('URL:', patenteUrl)

        if (patenteOcr && patenteUrl && patenteOcr !== patenteUrl) {
            fileResults.valid = false;
            fileResults.signals.push('No coincide la patente del documento con el código QR')
        }

    } catch (error) {
        console.error('Error analizando archivo:', error)
        fileResults.valid = false;
        fileResults.signals.push('Error al procesar el archivo')
    }

    return fileResults
}


// fileTextAnalizer('uploads/document-1755129915202.jpg', 'http://www.prt.cl/Paginas/QRRevisionTecnica.aspx?patente=PY7851').then(res => console.log(res))

export { ocrQRAnalyzer }