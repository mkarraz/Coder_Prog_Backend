const { Router } = require('express')
const router = Router()

//Declaro todos los controllers.
const { getAll } = require('../controllers/getAll')
const { getById } = require('../controllers/getById')
const { addProduct } = require('../controllers/addProduct')
const { updateProduct } = require('../controllers/updateProduct')
const { deleteProduct } = require('../controllers/deleteProduct')


//Vinculo los endpoints con sus respectivos controllers.
router.get("/products", getAll) //Trae todo los productos.
router.get("/products/:id", getById)//Trae producto por ID.
router.post("/products", addProduct)//Añade un nuevo producto (POST).
router.put("/products/:id", updateProduct)//Actualiza producto por ID (PUT).
router.delete("/products/:id", deleteProduct)//Elimina producto por ID (DELETE).

module.exports = router