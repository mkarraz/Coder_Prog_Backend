//Trae producto por ID
const products = require("../utils/products")//Llamo al array de productos.

const getById = (req, res, next) => {
    const id = req.params.id;

    if (isNaN(Number(id))) {
        const error = new Error("El parametro id de búsqueda debe ser un número.")
        res.status(400)
        return next(error, req, res)
    } else {
        const productFilter = products.filter((product) => {
            return product.id === Number(id)
        })

        if (!productFilter.length) {
            res.status(404).json({ error: "Producto no encontrado." })
        } else {
            productFilter.forEach((prodFilter) => {
                console.log(
                    `Usted seleccionó el objeto: ${prodFilter.title}, de ID: ${prodFilter.id}`
                )
            })
            res.json(productFilter)
        }
    }
}

module.exports = { getById: getById }