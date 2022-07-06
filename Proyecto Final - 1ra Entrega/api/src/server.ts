import express from 'express'
import path from 'path'
import auth from '../middlewares/auth'
import wrongRoute from '../middlewares/wrongRoute'
import routes from '../routes/routes'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT

//MIDDLEWARES
app.use(express.json())//Acceso al rec.body
app.use(express.urlencoded({ extended: true }))

app.use(auth)//Middleware: checks user role.
app.use('/api', routes)//Conexiones hacia las rutas.
app.use(wrongRoute)//Middleware: checks not implemented route.

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
