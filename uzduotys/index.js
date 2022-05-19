import express from 'express'
import {engine} from 'express-handlebars'
import session from 'express-session'
import {readFile, writeFile, appendFile} from 'fs/promises'

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

app.get('/zmones/:pavarde', async (req, res) => {
    //Pirma uzduotis
    // const vardai = ['Eglė', 'Martynas', 'Juozas', 'Dovilė', 'Gabrielė', 'Vaidas', 'Jonas', 'Adomas', 'Aiste', 'Dovydas']
    // const pavarde = req.params.pavarde

    // const zmogus = vardai[random(0, vardai.length - 1)] + ' ' + pavarde

    // res.send(zmogus)

    //Antra uzduotis
    // Papildykite pirmos užduoties route'ą:
    // Išssaugokite sugeneruotą vardą ir pavardę faile pavadinimu "vardai.txt". 
    // Failas turi būti NE perrašomas, o pastoviai papildomas t.y. Kiekvienas sugeneruotas vardas ir pavardė turėtų pildytis failo apačioje. 
    // Po sėkmingo išssaugojimo res.send() metodu į naršyklę grąžinkite žinutę: 
    // "(Sugeneruotas Vardas ir Pavardė) sėkmingai išssaugotas faile."
    // Nepavykus to atlikti, grąžinkite žinutę:
    // "Įvyko klaida"

    //Sprendimas

    // const vardai = ['Eglė', 'Martynas', 'Juozas', 'Dovilė', 'Gabrielė', 'Vaidas', 'Jonas', 'Adomas', 'Aiste', 'Dovydas']
    // const pavarde = req.params.pavarde

    // const zmogus = vardai[random(0, vardai.length - 1)] + ' ' + pavarde

    // try {
    //     await appendFile('vardai.txt', zmogus + '\n', 'utf8')

    //     res.send(zmogus + ' sėkmingai išssaugotas faile.')
    // } catch {
    //     res.send('Įvyko klaida')
    // }

    //Trecia uzduotis
    // Modifikuokite turimą route'a:
    // Pakeiskite funkcionalumą, kad nuo šiol duomenys būtų saugomi į naują failą pavadinimu "duomenys.json".
    // Faile saugokite duomenis JSON formatu.
    // Duomenys turi būti pastoviai pildomi.
    // Grąžinamas žinutes palikite prieš tai buvusias. Pakeiskite tik failo saugojimo būdą.

    const vardai = ['Eglė', 'Martynas', 'Juozas', 'Dovilė', 'Gabrielė', 'Vaidas', 'Jonas', 'Adomas', 'Aiste', 'Dovydas']
    const pavarde = req.params.pavarde

    const zmogus = vardai[random(0, vardai.length - 1)] + ' ' + pavarde

    try {
        const duomenys = await readFile('duomenys.json', 'utf8')
        const masyvas = JSON.parse(duomenys)
        masyvas.push(zmogus)
        await writeFile('duomenys.json', JSON.stringify(masyvas), 'utf8')

        res.send(zmogus + ' sėkmingai išssaugotas faile.')
    } catch {
        res.send('Įvyko klaida')
    }

})

app.listen(3000)