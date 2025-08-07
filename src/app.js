const express = require('express')
const app = express()
const { PORT } = require('./config')
const uploadDocumentRouter = require('./router/uploadDocumentRouter')

app.use(express.json())
app.use('/api/documents', uploadDocumentRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})