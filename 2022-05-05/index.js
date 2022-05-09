import express from 'express'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

//Express modulio iniciavimas
const app = express()
//Sugeneruojamas esamos direktorijos absoliutus kelias
const __dirname = dirname( fileURLToPath(import.meta.url) )

//Kelias (route'as)
app.get('/', (req, res) => {
    //req (request) - informacija apie uzklausa
    //res (response) - Grazinama informacija vartotojui
    //res.status(404)
    //res.send('<h1>Titulinis puslapis</h1>')

    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/apie-mus', (req, res) => {
    res.sendFile(__dirname + '/templates/antras.html')
})

app.listen(3000)