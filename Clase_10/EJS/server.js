const express = require('express')
const app = express()
const rutas = require('./api/routes/index')
const puerto = 8080
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('views', path.join(__dirname, './api/views'))
app.set('view engine', 'ejs')

app.use('/', rutas)


app.listen(puerto, (err) => {
    if(err) {
        console.log(`Error starting the server ${err}`)
    } else {
        console.log(`Server listening in port: ${puerto}`)
    }
})