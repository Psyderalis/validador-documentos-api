
const textVsQRAnalyzer = (text, url) => {
    const fileResults = {
        valid: true,
        signals: [],
    }

    try {
        const regexBeforeCertificadoTitle = /([\s\S]*?)CERTIFICADO/i
        const matchBeforeCertificadoTitle = text.match(regexBeforeCertificadoTitle)
        const textBeforeCertificadoTitle = matchBeforeCertificadoTitle ? matchBeforeCertificadoTitle[1].trim() : ''

        const regexPatente = /\b([A-Z]{2}\d{4}|[A-Z]{4}\d{2})\b/g
        const matchPatente = textBeforeCertificadoTitle.match(regexPatente)
        const patenteOcr = matchPatente ? matchPatente[matchPatente.length - 1] : '';

        if (!patenteOcr) {
            fileResults.valid = false
            fileResults.signals.push('No se detectó patente en el documento')
        }

        let patenteUrl = ''
        try {
            const urlObj = new URL(url)
            patenteUrl = urlObj.searchParams.get("patente") || ''
        } catch (err) {
            console.error('URL inválida:', url)
            fileResults.valid = false
            fileResults.signals.push('URL inválida')
        }

        if (patenteOcr && patenteUrl && (patenteOcr !== patenteUrl)) {
            fileResults.valid = false
            fileResults.signals.push('No coincide la patente del documento con el código QR')
        }
    } catch (error) {
        console.error('Error analizando archivo:', error)
        fileResults.valid = false
        fileResults.signals.push('Error al al analizar qr')
    }

    return fileResults
}

export { textVsQRAnalyzer }