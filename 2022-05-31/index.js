import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import Cocktails from './models/cocktails.js'

await mongoose.connect('mongodb://localhost/drinks')

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

console.log(await Cocktails.find())

app.listen(3000)


