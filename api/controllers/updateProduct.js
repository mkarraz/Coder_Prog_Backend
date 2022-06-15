//Actualiza producto por ID (PUT).
const products = require("../utils/products")//Llamo al array de productos.

const updateProduct = (req, res, next) => {
    const id = req.params.id

    if (isNaN(Number(id))) {
        const error = new Error('El ID debe ser un número.')
        res.status(400)
        return next(error, req, res)
    } else {
        const { title, price, thumbnail } = req.body
        const productSelected = products.filter((item) => {
            return item.id === Number(id)
        })
        if (!productSelected.length) {
            return res.status(404).json({ error: "Producto no encontrado." })
        } else {
            //Identifico el indice del producto seleccionado
            let prodIndex = products.findIndex((item) => {
                return item.id == Number(id)
            })
            //modifico el array discriminado por el index del producto seleccionado
            products[prodIndex].title = title
            products[prodIndex].price = Number(price)
            products[prodIndex].thumbnail = thumbnail
            console.log('Array de productos actualizado:')
            console.log(products)
            return res.status(200).json(products)
        }
    }
}

module.exports = { updateProduct: updateProduct }