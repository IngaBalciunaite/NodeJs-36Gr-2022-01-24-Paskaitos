import express from 'express'
import {engine} from 'express-handlebars'
import session from 'express-session'
import {readFile, writeFile} from 'fs/promises'
import { URLSearchParams } from 'url'

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

//Teisingi prisijungimo duomenys
const credentials = {
    login: 'admin@bit.lt',
    password: 'labas1234',
    name: 'Vilius Ramulionis'
}

const file = './db/database.json'

app.get('/', (req, res) => {
    let returned = {}

    if(parseInt(Object.keys(req.query).length) > 0) {
        if(
            req.query.email != '' &&
            req.query.password != '' &&
            req.query.email === credentials.login &&
            req.query.password === credentials.password
        ) {
            req.session.loggedin = true
            req.session.user = credentials.name
            res.redirect('/account')
            return
        } else {  
            returned = {message: 'Neteisingi prisijungimo duomenys', status: 'danger'}
        }
    }
        
    res.render('login', {layout: 'login', title: 'Banko aplikacija', returned})
})

app.get('/account', (req, res) => {
    // if(!req.session.loggedin) {
    //     res.redirect('/')
    //     return
    // }

    const data = {
        message: req.query.message,
        status: req.query.status,
        user: req.session.user
    }
    res.render('account', data)
})

app.get('/new-transfer', (req, res) => {
    res.render('new-transfer')
})

app.post('/approve-transfer', async (req, res) => {
    //GET metodu duomenys atsiranda req.query indekse
    //POST metodu duomenys yra patalpinti i req.body

    //Tikrinimas ar uzpildyti reikalingi laukeliai
    if(
        req.body?.account_number != '' &&
        req.body?.recipient != '' &&
        req.body?.amount != ''
    ) {
        try {
            //Duomenu bazes failo perskaitymas
            const db = await readFile(file, 'utf8')
            //Faile esancio turinio konvertavimas is stringo i masyva
            let database = JSON.parse(db)
            //Nauju perduotu duomenu pridejimas i is failo paimta masyva
            database.push(req.body)
            //Papildyto masyvo irasymas atgal duomenu bazes faila
            await writeFile(file, JSON.stringify(database), 'utf8')
            //Grazinamas rezultatas pagal sablona su uzpildytais duomenimis
            res.render('approve-transfer', req.body)
            
        } catch {
            //Jeigu ivyko klaida perskaitant arba irasinejant duomenis i faila ivykdomas nukreipimas su zinute
            res.redirect('/account?message=Įvyko klaida&status=danger')
        }
        //Sustabdome funkcijos veikima, kad isvengti peradresavimo dubliavimo
        return
    }

    //Budas sukonstruoti url adresa su perduodamais laukeliais nerasant ju i stringa patiems
    // const redirect_url = new URLSearchParams({
    //     message: 'Neteisingai užpildyti duomenys',
    //     status: 'danger'
    // })
    
    // res.redirect('/account?' + redirect_url.toString())

    //Peradresavimas jeigu auksciau aprasyta if kondicija neissipilde 
    res.redirect('/account?message=Neteisingai užpildyti duomenys&status=danger')
})

app.get('/transfer/:id', (req, res) => {
    res.send('Gautas id: ' + req.params.id)
})


app.listen(3000)