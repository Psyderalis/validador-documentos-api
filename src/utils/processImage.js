import sharp from 'sharp'
import path from 'path'

export async function preprocessImage(inputPath) {
    const outputPath = path.join(
        path.dirname(inputPath),
        'pre_' + path.basename(inputPath, path.extname(inputPath)) + '.png'
    )

    await sharp(inputPath)
        .rotate()
        .grayscale()
        .normalize()
        .modulate({
            brightness: 1.5,
        })
        .toFile(outputPath)

    return outputPath
}

preprocessImage('uploads/20250510_130650.jpg').then(res => console.log(res))
