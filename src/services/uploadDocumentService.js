const uploadDocumentService = async (file) => {
    return {
        message: 'Documento subido correctamente',
        fileName: file.filename,
        filePath: file.path,
    }
}

export { uploadDocumentService }