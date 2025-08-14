import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import { router } from './router/router.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/documents', router)

process.on('exit', async () => {
    await exiftool.end()
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

