const express = require('express')
const app = express()
const path = require('path')
const port = 8080
const { Server: IOServer } = require('socket.io')
const serverExpress = app.listen(port, (err) => {
    if(err) {
        console.log(`Error starting the server ${err}`)
    } else {
        console.log(`Server listening in port: ${port}`)
    }
})
const io = new IOServer(serverExpress)
const messages = []
const products = require('../utils/products')

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {
    console.log(`New user connected: ${socket.id}`)
    /* A cada cliente que se conecte se le mostrarán los productos */
    socket.emit('server:products', products)
    socket.emit('server:message', messages)

    socket.on('client:product', productInfo => {
        products.push(productInfo)
        io.emit('server:products', products)
    })

    socket.on('client:message', messageInfo => {
        messages.push(messageInfo)
        io.emit('server:message', messages)
    })
})
