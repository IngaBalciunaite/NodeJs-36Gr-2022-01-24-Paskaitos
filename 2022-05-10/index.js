import express from 'express'
import {engine} from 'express-handlebars'

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

const credentials = {
    login: 'admin@bit.lt',
    password: 'labas1234'
}

app.get('/', (req, res) => {
    let returned = {}

    if(parseInt(Object.keys(req.query).length) > 0) {
        if(
            req.query.email != '' &&
            req.query.password != '' &&
            req.query.email === credentials.login &&
            req.query.password === credentials.password
        ) {
            //returned = {message: 'Prisijungimas pavyko', status: 'success'}
            res.redirect('/account')
            return
        } else {  
            returned = {message: 'Neteisingi prisijungimo duomenys', status: 'danger'}
        }
    }
        
    res.render('forma', returned)
})

app.get('/account', (req, res) => {
    const data = {
        message: req.query.message,
        status: req.query.status
    }
    res.render('account', data)
})

app.get('/account/:vardas', (req, res) => {
    res.send('Vardas gautas ir yra: ' + req.params.vardas)
})

app.get('/transfer', (req, res) => {
    const data = {
        number: req.query.account_number,
        recipient: req.query.recipient,
        reference: req.query.reference
    }
    res.render('transfer', data)
})

app.listen(3000)