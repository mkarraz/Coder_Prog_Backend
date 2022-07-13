import express from 'express'
import routes from './api/routes/routes'
import auth from './api/middlewares/auth'
import dotenv from 'dotenv'
import wrongRoute from './api/middlewares/wrongRoute'
import path from 'path'
import { Server as IOServer } from 'socket.io'
import products from './api/models/DBProductsContainer'
import chat from './api/models/ChatContainer'

dotenv.config()
const port = process.env.PORT
const app = express()



const serverExpress = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

const io = new IOServer(serverExpress)

    /* const products: object = [] */

//MIDDLEWARES
app.use(express.json())//Acceso al rec.body
app.use(express.urlencoded({ extended: true }))
app.use(auth)//Middleware: checks user role.
app.use('/api', routes)//Conexiones hacia las rutas.
app.use(express.static(path.join(__dirname, '../public')))
app.use(wrongRoute)//Middleware: checks not implemented route.


io.on('connection', async (socket) => {
    console.log(`New user connected: ${socket.id}`)
    /* A cada cliente que se conecte se le mostrarán todos los mensajes y productos almacenados en la db.*/
    socket.emit('server:products', await products.getAll())
    socket.emit('server:message', await chat.getAllMessages())

    socket.on('client:product', async (productInfo) => {
        products.addProduct(productInfo)
        io.emit('server:products', await products.getAll())
    })

    /* El servidor recibirá el mensaje del cliente, lo añadirá a la base de datos mediante la clase "chat" y luego utilizará la función getAllMessages para renderizar todos los mensajes en memoria. */
    socket.on('client:message', async (messageInfo) => {
        chat.addMessage(messageInfo)
        io.emit('server:message', await chat.getAllMessages())
    })
})