import { exiftool } from 'exiftool-vendored';

const metadataAnalizer = async (filePath) => {
    const fileResults = {
        filePath,
        valid: true,
        score: 0,
        signals: [],

    }
    let metadata
    try {
        // Read metadata
        metadata = await exiftool.read(filePath);

        // Check for specific metadata signals

        // suspicious software
        if (metadata.Software && /(Photoshop|GIMP|Word|Paint|Illustrator)/i.test(metadata.Software)) {
            fileResults.score += 3
            fileResults.signals.push(`Software de edición detectado: ${metadata.Software}`)
        }

        // create date missing and modify date missing
        if (!metadata.CreateDate) {
            fileResults.score += 1
            fileResults.signals.push("Falta fecha de creación (CreateDate)")
        }

        if (!metadata.ModifyDate) {
            fileResults.score += 1
            fileResults.signals.push("Falta fecha de modificación (ModifyDate)")
        }

        // modify date > create date
        if (metadata.CreateDate && metadata.ModifyDate) {
            const createDate = new Date(metadata.CreateDate)
            const modifyDate = new Date(metadata.ModifyDate)
            if (modifyDate > createDate) {
                fileResults.score += 2
                fileResults.signals.push(`Fecha de modificación posterior a la de creación: ${modifyDate} vs ${createDate} respectivamente`)
            }
        }

        // calculated score
        if (fileResults.score >= 4) {
            fileResults.valid = false
            fileResults.signals.push(`Puntuación alta de sospecha: ${fileResults.score}`)
        } else {
            fileResults.valid = true
            fileResults.signals.push(`Puntuación baja de sospecha: ${fileResults.score}`)
        }

    } catch (error) {
        fileResults.valid = false
        fileResults.signals.push(`Error al leer metadatos: ${error.message}`)
        console.error(error)
    } finally {
        metadata && exiftool.end()
    }
    return fileResults

}

// metadataAnalizer('uploads/17531115671954167090193018537762 - Malvado.jpg').then(res => console.log(res))

metadataAnalizer('uploads/malvado.jpg').then(res => console.log(res))

export { metadataAnalizer }
