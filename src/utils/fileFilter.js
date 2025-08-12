const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg'
]

const fileFilter = (req, file, cb) => {

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        const error = new Error('Tipo de archivo no válido. Debe ser PDF, JPG, JPEG o PNG.')
        error.code = 'INVALID_FILE_TYPE'
        cb(error, false)
    }
}

export { fileFilter }