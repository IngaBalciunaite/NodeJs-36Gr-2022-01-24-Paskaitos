import express from 'express'
import { Tasks } from './database/connection.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const __dirname = dirname( fileURLToPath(import.meta.url) )

//Express konfiguracijos praplėtimas priimti perduodamą informaciją į serverį json formatu
app.use( express.json() )

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

//Visu užduočių paėmimas iš duomenų bazės
app.get('/api/tasks/all', async (req, res) => {
    try {
        const taskList = await Tasks.find()
        res.status(200).json(taskList)
    } catch {
        res.sendStatus(500)
        //res.status(500).end() - Po issiusto statuso pasinaudojant express metodu "status()", reikia uzbaigti atsakymo eilute metodu "end()"
        //res.sendStatus(500) - sendStatus() metodas uzbaigia atsakymo siuntima is karto
    }
})

//Užduoties pridėjimas į duomenų bazę
app.post('/api/tasks/new', async (req, res) => {
    try {
        await Tasks.create(req.body)
        res.status(200).end()
    } catch {
        res.sendStatus(500)
    }
})

//Užduoties redagavimas
app.put('/api/tasks/edit/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Tasks.findByIdAndUpdate(id, req.body)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})  

//Užduoties istrynimas
app.delete('/api/tasks/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Tasks.findByIdAndDelete(id)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})  

app.listen(3000)