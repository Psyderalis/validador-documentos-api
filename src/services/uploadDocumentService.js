const uploadADocument = async (file) => {
    console.log(file)
    return { 
        message: 'Documento subido correctamente',
        fileName: file.filename,
        filePath: file.path,
    }
}

module.exports = { uploadADocument }