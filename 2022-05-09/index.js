import express from 'express'
import {engine} from 'express-handlebars'

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

app.get('/', (req, res) => {
    const kodas = req.query.kodas
    if( kodas != undefined &&
        kodas.length === 3 &&
        kodas.includes('4' ) &&
        kodas.includes('8') &&
        kodas.includes('3') 
    ) {
        console.log('Kodas teisingas')
    } else {
        console.log('Bandykite is naujo')
    }
    res.render('index')
})

app.get('/about', (req, res) => {
    let x = 10
    let y = 'Vilius Ramulionis'
    let array = [10, 15, 'Zalgiris', 199999]
    let object = [
        {vardas: 'Test', pavarde: 'Testinis'},
        {vardas: 'Adomas', pavarde: 'Mickevičius'}
    ]
    let salis = {
        pavadinimas: 'Lietuva',
        sostine: 'Vilnius'
    }

    res.render('about', {x, y, z: true, array, object, salis})
})

app.listen(3000)