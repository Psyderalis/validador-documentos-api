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
            // console.log('qr: ', qrCode.data)
            return qrCode.data
        } else {
            // console.log('no hay qr')
            return null;
        }
    } catch (err) {
        console.error("Error leyendo QR:", err)
        throw new Error(`Error leyendo QR: ${err.message}`);
    }
};

// qrReader('uploads/document-471c6fed-e06a-49eb-a781-3aacd5c56630.jpg')

export { qrReader }