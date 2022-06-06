const fs = require('fs')

const express = require('express')
const app = express()
const port = 8080

class Contenedor {

    constructor(fileName){
        this.fileName = fileName
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            if (data.length) {
                let productsArray = JSON.parse(data)
                let prodSelected = productsArray.find(prod => prod.id === id)
                if (prodSelected) {
                    console.log(`El producto seleccionado es el siguiente: `)
                    console.log(prodSelected)
                    return prodSelected
                } else {
                    console.log(`No existe níngun producto con el id: ${id}`)
                }
            } else {
                console.log('El array de productos está vacío.')
            }
        } catch (error) {
            console.log(`Ocurrió un error: ${error}`)
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')

            if (data.length) {
                let productsArray = JSON.parse(data)
                let checkObjEmpty = Object.keys(productsArray).length
                if (!checkObjEmpty) {
                    console.log(`El array de productos está vacío.`)
                } else {
                    console.log(`El array está compuesto por los siguientes productos:`)
                    console.log(productsArray)
                    return productsArray
                }
            } else {
                console.log('El array de productos está vacío.')
            }
        } catch (error) {
            console.log(`Ocurrió un error: ${error}`)
        }
    }
}

const product = new Contenedor('productos.txt')

app.get('/productos', productsController)
app.get('/productoRandom', randomProductController)

async function productsController(req, res) {
    const response = await product.getAll()
    res.send(response)
}

async function randomProductController(req, res) {
    const numeroAleatorio = Math.floor(Math.random() * (3 - 1 + 1) + 1)
    const response = await product.getById(numeroAleatorio)
    res.send(response)
}













app.listen(port, () => {
    console.log(`Server listening through port: ${port}`)
})