//Trae todos los productos.
const products = require("../utils/products")//Llamo al array de productos.

const getAll = (req, res) => {
    res.json(products);
}

module.exports = { getAll: getAll}