const express = require('express')
const app = express()
const router = require('./routes')
const port = 3000
const session = require('express-session')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(router)

app.listen(port, () => {
    console.log('app listening on port ', port)
})