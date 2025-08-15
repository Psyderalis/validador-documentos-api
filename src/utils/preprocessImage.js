import sharp from 'sharp'
import path from 'path'
import { unlink } from 'fs/promises'

const preprocessImage = async (inputPath) => {
    const outputPath = path.join(
        path.dirname(inputPath),
        'pre_' + path.basename(inputPath, path.extname(inputPath)) + '.png'
    )
    try {
        await sharp(inputPath)
            .rotate()
            .grayscale()
            .normalize()
            .modulate({
                brightness: 1.2,
            })
            .toFile(outputPath)
        try {
            await unlink(inputPath)
        } catch (err) {
            console.error('Error al borrar el archivo:', err)
        }

        return outputPath
    } catch (error) {
        console.error("Error preprocesando imagen:", err)
        throw new Error(`No se pudo preprocesar la imagen: ${error.message}`)
    }
}

export { preprocessImage }
