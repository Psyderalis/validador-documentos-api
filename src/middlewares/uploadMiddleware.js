const { upload } = require('../config')

const uploadMiddleware = (req, res, next) => {
    upload.single('document')(req, res, (err) => {
        if (err) {
            if (err.code === 'INVALID_FILE_TYPE') return res.status(400).json({ error: err.message });

            return res.status(500).json({ error: `Error al subir el archivo: ${err.message}` })
        }
        next()
    })
}

module.exports = uploadMiddleware