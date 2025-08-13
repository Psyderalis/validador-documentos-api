import { getOpenCv } from "./openCV.mjs";
import sharp from "sharp";

async function main() {
    const { cv } = await getOpenCv();
    // console.log(cv.getBuildInformation());

    // Leer imagen con sharp y obtener buffer raw RGBA
    const inputBuffer = await sharp("Lenna.png")
        .raw()
        .ensureAlpha() // asegurar 4 canales RGBA
        .toBuffer({ resolveWithObject: true });

    const { data, info } = inputBuffer;

    // Crear cv.Mat desde buffer de sharp
    const img = cv.matFromImageData({
        data,
        width: info.width,
        height: info.height,
    });
    // convert Lenna.png to gray image
    const gray = new cv.Mat();
    cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);

    // convert gray image to RGBA format for Jimp´

    // Convertir gris a RGBA para guardar
    const rgbaGray = new cv.Mat();
    cv.cvtColor(gray, rgbaGray, cv.COLOR_GRAY2RGBA);

    // Guardar imagen con sharp
    await sharp(Buffer.from(rgbaGray.data), {
        raw: { width: rgbaGray.cols, height: rgbaGray.rows, channels: 4 },
    })
        .toFile("output.png");
    console.log(`Saved gray image to output.png`);

    // release memory
    img.delete();
    gray.delete();
    rgbaGray.delete();
    console.log("Memory released");
}

main();