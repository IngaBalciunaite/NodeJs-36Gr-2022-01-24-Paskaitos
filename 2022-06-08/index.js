import express from 'express'
import session from 'express-session'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const __dirname = dirname( fileURLToPath(import.meta.url) )
const credentials = {
    login: 'vilius@bit.lt',
    password: '1234'
}

app.use(session({
    secret: 'Xc8BWMjxR5u2hyJaQ2R7UCUXAJeB4jKrXF722RXuumjZEfcD7AHuhCmEYgfCMeQ67J3Tqtumd6Nzf4ZKU9BJ3j9a4TLvFT2KmKrcaBTbdsYVWSYjXd54PRASMxfaX7Zz',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 864000000
    }
}))

//Express konfiguracijos praplėtimas priimti perduodamą informaciją į serverį json formatu
app.use( express.json() )

app.use('/js', express.static('js'))

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/templates/login.html')
})

app.post('/authenticate', (req, res) => {
    if(parseInt(Object.keys(req.body).length) > 0) {
        if(
            req.body.email != '' &&
            req.body.password != '' &&
            req.body.email === credentials.login &&
            req.body.password === credentials.password
        ) {
            req.session.loggedin = true
            res.sendStatus(200)
            return
        } else {  
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(202)
    }
})

app.listen(3000)