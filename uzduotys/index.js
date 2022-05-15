import express from 'express'
import {engine} from 'express-handlebars'
import session from 'express-session'
import {readFile, writeFile} from 'fs/promises'

const app = express()

//Handlebars sablonu prijungimo konfiguracija
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

//Sesijos priskyrimas prie express objekto
app.use(session({
    secret: 'Xc8BWMjxR5u2hyJaQ2R7UCUXAJeB4jKrXF722RXuumjZEfcD7AHuhCmEYgfCMeQ67J3Tqtumd6Nzf4ZKU9BJ3j9a4TLvFT2KmKrcaBTbdsYVWSYjXd54PRASMxfaX7Zz',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 864000000
    }
}))

//Express konfiguracijos prapletimas norint priimti POST metodu perduodamus duomenis
app.use(express.urlencoded({
    extended: false
}))

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/zmones/:pavarde', (req, res) => {
    const vardai = ['Eglė', 'Martynas', 'Juozas', 'Dovilė', 'Gabrielė', 'Vaidas', 'Jonas', 'Adomas', 'Aiste', 'Dovydas']
    const pavarde = req.params.pavarde

    const zmogus = vardai[random(0, vardai.length - 1)] + ' ' + pavarde

    res.send(zmogus)
})


app.listen(3000)