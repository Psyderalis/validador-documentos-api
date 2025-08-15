import { createWorker } from 'tesseract.js'

const extractTextOCR = async (imagePath) => {
    let worker
    try {
        worker = await createWorker('spa')
        const { data: { text } } = await worker.recognize(imagePath)
        // console.log('se extrajo el texto')
        console.log(text)
        return text
    } catch (err) {
        console.error("Error en OCR:", err)
        throw new Error(`Error en OCR: ${err.message}`)

    } finally {
        worker && await worker.terminate()
    }
}

export { extractTextOCR }