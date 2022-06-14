import express from 'express'
import session from 'express-session'
import path from 'path'
import { Orders, Products } from './database/connect.js'

const app = express()
const credentials = {
    email: 'vilius@bit.lt',
    password: '1234'
}

app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//Titulinis puslapis
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'))
})

//Login puslapis
app.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/admin')
        return false
    }
    res.sendFile(path.resolve('./public/login.html'))
})

//Admin puslapis
app.get('/admin', (req, res) => {
    res.sendFile(path.resolve('./public/admin.html'))
})

//Prisijungimo duomenu tikrinimas
app.post('/authenticate', (req, res) => {
    if( req.body?.email === credentials.email && 
        req.body?.password === credentials.password
    ) {
        req.session.loggedIn = true
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

app.get('/products', async (req, res) => {
    // if(!req.session.loggedIn) {
    //     res.sendStatus(401)
    //     return
    // }

    try {
        const products = await Products.find()
        res.status(200).json(products)
    } catch {
        res.sendStatus(202)
    }
})

app.post('/products/new', async (req, res) => {
    // if(!req.session.loggedIn) {
    //     res.sendStatus(401)
    //     return
    // }
    
    if(!req.body) {
        res.sendStatus(202)
        return 
    }

    if( req.body.name === '' &&
        req.body.description === '' ) {
        res.sendStatus(202)
        return
    } 

    try {
        const product = new Products({
            name: req.body.name, 
            description: req.body.description
        })

        await product.save()
        res.sendStatus(200)
    } catch {
        res.sendStatus(202)
    }

})

app.put('/products/update/:id', async (req, res) => {
    const id = req.params.id 

    // if(!req.session.loggedIn) {
    //     res.sendStatus(401)
    //     return
    // }
    
    if(!req.body) {
        res.sendStatus(202)
        return 
    }

    if( req.body.name === '' &&
        req.body.description === '' ) {
        res.sendStatus(202)
        return
    } 

    try {
        await Products.findByIdAndUpdate(id, {
            name: req.body.name, 
            description: req.body.description
        })

        res.sendStatus(200)
    } catch {
        res.sendStatus(202)
    }

})

app.listen(3000)