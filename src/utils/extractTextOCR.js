import { createWorker } from 'tesseract.js'

const extractTextOCR = async (imagePath) => {
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

export { extractTextOCR }