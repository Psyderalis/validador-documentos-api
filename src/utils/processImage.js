import sharp from 'sharp'
import path from 'path'

const preprocessImage = async (inputPath) => {
    const outputPath = path.join(
        path.dirname(inputPath),
        'pro_' + path.basename(inputPath, path.extname(inputPath)) + '.png'
    )

    await sharp(inputPath)
        .rotate()
        .grayscale()
        .normalize()
        .modulate({
            brightness: 1.2,
        })
        .toFile(outputPath)

    return outputPath
}

export { preprocessImage }
