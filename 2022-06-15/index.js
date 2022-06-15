import { rejects } from 'assert'
import express from 'express'
import session from 'express-session'
import path from 'path'
import { Orders, Products } from './database/connect.js'
import auth from './middleware/auth.js'

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
    if(!req.session.loggedIn) {
        res.redirect('/login')
        return false
    }
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
    try {
        const products = await Products.find()
        res.status(200).json(products)
    } catch {
        res.sendStatus(202)
    }
})

app.get('/products/details/:id', auth, async (req, res) => {
    const id = req.params.id

    try {
        const product = await Products.findById(id)
        res.status(200).json(product)
    } catch {
        res.sendStatus(202)
    }
})

app.post('/products/new', auth, async (req, res) => {
    if(!req.body) {
        res.sendStatus(202)
        return 
    }

    if( req.body.name === '' ||
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

app.put('/products/update/:id', auth, async (req, res) => {
    const id = req.params.id 
    
    if(!req.body) {
        res.sendStatus(202)
        return 
    }

    if( req.body.name === '' ||
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

app.delete('/products/delete/:id', auth, async (req, res) => {
    const id = req.params.id

    try {
        await Products.findByIdAndDelete(id)
        res.sendStatus(200)
    } catch {
        res.sendStatus(202)
    }
})

app.get('/orders', auth,  async (req, res) => {
    try {
        let orders = await Orders.find()

        for(let i = 0; i < orders.length; i++) {
            const product = await Products.findById(orders[i].product)
            orders[i].product = product.name
        }

        res.status(200).json(orders)
    } catch {
        res.sendStatus(202)
    }
})

app.post('/order/new', async (req, res) => {
    if(!req.body) {
        res.sendStatus(202)
        return 
    }

    if( req.body.product === '' ||
        req.body.fName === '' ||
        req.body.lName === '' ||
        req.body.address === '' ||
        req.body.city === '' ||
        req.body.phone === '' ||
        req.body.email === '' 
    ) {
        res.sendStatus(202)
        return
    } 

    try {
        const order = new Orders({
            product: req.body.product,
            fName: req.body.fName, 
            lName: req.body.lName,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone,
            email: req.body.email,
            status: 0
        })

        await order.save()
        res.sendStatus(200)
    } catch {
        res.sendStatus(202)
    }
})

app.delete('/order/delete/:id', auth, async (req, res) => {
    const id = req.params.id

    try {
        await Orders.findByIdAndDelete(id)
        res.sendStatus(200)
    } catch {
        res.sendStatus(202)
    }
})

app.put('/order/status/:id/:status', auth, async (req, res) => {
    const id = req.params.id
    const status = req.params.status

    if(isNaN(status)) {
        res.sendStatus(202)
        return
    }

    try {
        await Orders.findByIdAndUpdate(id, { status })
        res.sendStatus(200)
    } catch {
        res.sendStatus(202)
    }
})

app.listen(3000)