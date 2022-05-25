import express from 'express'
import cors from 'cors'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname( fileURLToPath(import.meta.url) )

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/api/', (req, res) => {
    const objektas = {
        vardas: 'Vilius',
        pavarde: 'Ramulionis'
    }
    res.json(objektas)
})

app.get('/api/weather/', (req, res) => {

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const condition = ['windy', 'rain', 'sunshine']
    const location = ['London, UK', 'Madrid, Spain', 'Vilnius, Lithuania', 'Berlin, Germany']

    const objektas = {
        condition: condition[random(0, 2)],
        degrees: random(-8, 40),
        location: location[random(0, 3)],
        windSpeed: random(1, 10),
        humidity: random(40, 100)
    }
    res.json(objektas)
})


app.listen(3000)