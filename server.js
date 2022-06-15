const express = require('express')
const app = express()
/* const rutas = require('./api/productos') */
const rutas = require('./api/routes/index')
const puerto = 8080

app.use(express.json())//Accedo al rec.body
app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(`${__dirname}/public`))//Declaro ruta estática al form
//para acceder http://localhost:8080/public/index.html

app.use('/', rutas)//conexiones hacia las rutas

//Middleware de manejo de errores: siempre recibe un error o err como PRIMER parámetro
app.use((error, req, res) => {
    res.status(error.httpStatusCode).send(error)
})

app.listen(puerto, (err) => {
    if(err) {
        console.log(`Se produjo un error al iniciar el servidor ${err}`)
    } else {
        console.log(`El servidor esta escuchando el puerto: ${puerto}`)
    }
})