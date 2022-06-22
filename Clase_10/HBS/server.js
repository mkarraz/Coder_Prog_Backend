const express = require('express')
const app = express()
const rutas = require('./api/routes/index')
const puerto = 8080
const path = require('path')
const { engine } = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './api/views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname, './api/views/layouts')
}))

app.set('views', path.join(__dirname, './api/views'))
app.set('view engine', 'hbs')

app.use('/', rutas)


app.listen(puerto, (err) => {
    if(err) {
        console.log(`Error starting the server ${err}`)
    } else {
        console.log(`Server listening in port: ${puerto}`)
    }
})