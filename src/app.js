const express = require('express')
const app = express()
const cors = require('cors')
const { PORT } = require('./config')
const uploadDocumentRouter = require('./router/uploadDocumentRouter')
const { exiftool } = require('exiftool-vendored')

app.use(express.json())
app.use(cors())
app.use('/api/documents', uploadDocumentRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

process.on('exit', () => exiftool.end())