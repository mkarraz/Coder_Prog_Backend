//Añade un nuevo producto (POST).
const products = require("../utils/products")//Llamo al array de productos.

const addProduct = (req, res, next) => {
    const { title, price, thumbnail } = req.body//luego de acceder al body, destructuro el objeto

    if (isNaN(Number(price))) {
        const error = new Error("El precio debe ser un numero.")//Generamos un error
        res.status(400)//Le asignamos a error un statusCode = 400
        return next(error, req, res)//Se lo enviamos al siguiente middleware (en este caso estaría dentro de server.js - "Middleware de errores")
    } else {
        const lastId = products[products.length - 1].id//Accedo al id del último producto del array
        const id = lastId + 1
        products.push({ title, price, thumbnail, id })//Se agrega el nuevo prod al array
        res.status(201).json(products)//devuelvo el codigo de resolución
    }
}

module.exports = { addProduct: addProduct }