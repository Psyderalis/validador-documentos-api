const uploadADocument = async (file) => {
    return { 
        message: 'Documento subido correctamente',
        fileName: file.filename,
        filePath: file.path,
    }
}

module.exports = { uploadADocument }