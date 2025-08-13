import sharp from "sharp";
import { getOpenCv } from "./openCV.mjs";

export async function detectForgeryELA(inputPath) {
    const { cv } = await getOpenCv();

    // Detectar formato
    const metadata = await sharp(inputPath).metadata();
    const format = metadata.format;

    // 1️⃣ Leer original para bordes
    const { data, info } = await sharp(inputPath)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
    const originalMat = cv.matFromImageData({ data, width: info.width, height: info.height });

    // Bordes (Canny)
    const gray = new cv.Mat();
    cv.cvtColor(originalMat, gray, cv.COLOR_RGBA2GRAY);
    const edges = new cv.Mat();
    cv.Canny(gray, edges, 50, 150);
    const edgePixels = cv.countNonZero(edges);
    const totalPixels = edges.rows * edges.cols;
    const edgeScore = edgePixels / totalPixels;

    // 2️⃣ Crear base JPEG para ELA
    const baseJPEGBuffer = await sharp(inputPath)
        .jpeg({ quality: 95 })
        .toBuffer();

    const { data: baseData, info: baseInfo } = await sharp(baseJPEGBuffer)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
    const baseMat = cv.matFromImageData({ data: baseData, width: baseInfo.width, height: baseInfo.height });

    // Recompresión para ELA
    const recompressedBuffer = await sharp(baseJPEGBuffer)
        .jpeg({ quality: 90 })
        .toBuffer();

    const { data: recData, info: recInfo } = await sharp(recompressedBuffer)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
    const recompressedMat = cv.matFromImageData({ data: recData, width: recInfo.width, height: recInfo.height });

    // 3️⃣ Calcular ELA real
    const elaMat = new cv.Mat();
    cv.absdiff(baseMat, recompressedMat, elaMat);
    const elaGray = new cv.Mat();
    cv.cvtColor(elaMat, elaGray, cv.COLOR_RGBA2GRAY);
    const elaPixels = cv.countNonZero(elaGray);
    const totalELA = elaGray.rows * elaGray.cols;
    let elaScore = elaPixels / totalELA;

    // 4️⃣ Normalización para PNG
    if (format === "png") {
        // Baseline para PNG limpio
        const cleanJPEG = await sharp(baseJPEGBuffer)
            .jpeg({ quality: 95 })
            .toBuffer();
        const recompressedCleanJPEG = await sharp(cleanJPEG)
            .jpeg({ quality: 90 })
            .toBuffer();

        const { data: cleanData, info: cleanInfo } = await sharp(cleanJPEG)
            .raw()
            .ensureAlpha()
            .toBuffer({ resolveWithObject: true });

        const { data: cleanRecData, info: cleanRecInfo } = await sharp(recompressedCleanJPEG)
            .raw()
            .ensureAlpha()
            .toBuffer({ resolveWithObject: true });

        const cleanMat = cv.matFromImageData({ data: cleanData, width: cleanInfo.width, height: cleanInfo.height });
        const cleanRecMat = cv.matFromImageData({ data: cleanRecData, width: cleanRecInfo.width, height: cleanRecInfo.height });

        const elaMatBaseline = new cv.Mat();
        cv.absdiff(cleanMat, cleanRecMat, elaMatBaseline);
        const elaGrayBaseline = new cv.Mat();
        cv.cvtColor(elaMatBaseline, elaGrayBaseline, cv.COLOR_RGBA2GRAY);
        const baselinePixels = cv.countNonZero(elaGrayBaseline);
        const baselineScore = baselinePixels / (elaGrayBaseline.rows * elaGrayBaseline.cols);

        // Máximo esperado en JPG limpio (estimado)
        const maxJPGScore = 0.25;

        // Normalizar
        elaScore = Math.max(0, (elaScore - baselineScore) / (maxJPGScore - baselineScore));

        // Limpiar
        [cleanMat, cleanRecMat, elaMatBaseline, elaGrayBaseline].forEach(m => m.delete());
    }

    // 5️⃣ Score final combinado
    const finalScore = Math.min(edgeScore * 0.6 + elaScore * 0.4, 1);

    // 6️⃣ Determinar si es sospechoso
    const threshold = 0.3;
    const isSuspicious = finalScore >= threshold;

    // Limpiar
    [originalMat, gray, edges, baseMat, recompressedMat, elaMat, elaGray].forEach(m => m.delete());

    return { format, edgeScore, elaScore, finalScore, isSuspicious };
}



async function main() {
    const result = await detectForgeryELA("uploads/malvado.jpg");
    console.log("Resultado avanzado de adulteración:", result);
}

main()