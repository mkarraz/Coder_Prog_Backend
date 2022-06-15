//Elimina producto por ID (DELETE).
const products = require("../utils/products")//Llamo al array de productos.

const deleteProduct = (req, res, next) => {
    const id = req.params.id

    if (isNaN(Number(id))) {
        const error = new Error('El ID debe ser un número.')
        res.status(400)
        return next(error, req, res)
    } else {
        if (isNaN(Number(id))) {
            return res.json({ error: "El parámetro no es un número" })
        } else {
            //Elimino el producto señalado
            const productsFilter = products.filter(product => {
                return product.id !== Number(id)
            })

            if (productsFilter.length === products.length) {
                res.status(404).json({ error: "Producto no encontrado." })
            } else {
                console.log("Array de productos tras funcion DELETE:")
                console.log(productsFilter)
                res.status(200).json(productsFilter)
            }
        }
    }
}

module.exports = { deleteProduct: deleteProduct }