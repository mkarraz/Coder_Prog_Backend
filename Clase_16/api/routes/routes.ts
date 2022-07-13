import { Router } from 'express'
const router = Router()
import { getAll, getById, addProduct, updateProductById, deleteProductById } from '../controllers/productsControllers';
import { cartCreate, cartDelete, getProductsByCartId, addToCartById, deleteProductByCartId } from '../controllers/cartControllers'


//Vinculo los endpoints con sus respectivos controllers.
router.get("/products", getAll)//Trae todo los productos.
router.get("/products/:id", getById)//Trae producto por ID.
router.post("/products", addProduct)//Añade un nuevo producto (POST).
router.put("/products/:id", updateProductById)//Actualiza producto por ID (PUT).
router.delete("/products/:id", deleteProductById)//Elimina producto por ID (DELETE).

router.post('/cart', cartCreate)//Crea un nuevo cart.
router.delete('/cart/:id', cartDelete)//Elimina cart by ID
router.get('/cart/:id/products', getProductsByCartId)//Trae todos los productos guardados en el cart seleccionado.
router.post('/cart/:id/products', addToCartById)//Añade un producto al carrito target.
router.delete('/cart/:id/products/:id_prod', deleteProductByCartId)//Elimina un producto target de un carrito target.

export default router