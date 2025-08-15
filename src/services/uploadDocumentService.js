const uploadDocumentService = async (file) => {
    return {
        message: 'Documento cargado correctamente',
        fileName: file.filename,
        filePath: file.path,
    }
}

export { uploadDocumentService }