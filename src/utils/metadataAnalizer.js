const { exiftool } = require("exiftool-vendored")

const metadataAnalizer = async (filePath) => {
    const fileResults = {
        valid: true,
        signals: [],

    }
    try {
        // Read metadata
        const metadata = await exiftool.read(filePath);

        // Check for specific metadata signals

        //software
        if (metadata.Software && /(Photoshop|GIMP|Word|Paint)/i.test(metadata.Software)) {
            fileResults.valid = false
            fileResults.signals.push(`Software de edición detectado: ${metadata.Software}`)
        }
        // dates
        if (metadata.CreateDate && metadata.ModifyDate) {
            const createDate = new Date(metadata.CreateDate)
            const modifyDate = new Date(metadata.ModifyDate)
            if (modifyDate > createDate) {
                fileResults.valid = false
                fileResults.signals.push(`Fecha de modificación posterior a la de creación: ${modifyDate} vs ${createDate} respectivamente`)
            }
        }

        // empty essential fields
        const essentialFields = ["Make", "Model", "CreateDate"]
        const missingFields = essentialFields.filter(field => !metadata[field])

        if (missingFields.length > 0) {
            fileResults.valid = false
            fileResults.signals.push(`Faltan metadatos esenciales: ${missingFields.join(", ")}`)
        }

        exiftool.end()

    } catch (error) {
        exiftool.end()
        fileResults.valid = false;
        fileResults.signals.push(`Error al leer metadatos: ${error.message}`);
        console.error(error)
    }
    return fileResults

}


(async () => {
    const result = await metadataAnalizer('uploads/20250510_130650.jpg');
    console.log(result);
})()

// (async () => {
//     const result = await metadataAnalizer('uploads/document-1754686192710.jpg');
//     console.log(result);
// })()