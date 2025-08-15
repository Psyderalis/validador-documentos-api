import sharp from "sharp";
import jsQR from "jsqr";

const qrReader = async (imagePath) => {
    try {

        const { data, info } = await sharp(imagePath)
            .raw()
            .ensureAlpha()
            .toBuffer({ resolveWithObject: true })


        const qrCode = jsQR(new Uint8ClampedArray(data), info.width, info.height)

        if (qrCode) {
            console.log("QR encontrado:", qrCode.data)
            return qrCode.data
        } else {
            console.log("No se encontró QR en la imagen.")
            return null;
        }
    } catch (err) {
        console.error("Error leyendo QR:", err)
    }
};

export { qrReader }