import express from 'express'
import cors from 'cors'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import mongoose from 'mongoose'
import details from './model/details.js'

mongoose.connect('mongodb://localhost:27017/profiles', (err) => {
    if(err) 
        console.log(err)
    else 
        console.log('Prisijungta prie mongodb')
})

console.log( await details.find().exec() )

const __dirname = dirname( fileURLToPath(import.meta.url) )

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

app.listen(3000)