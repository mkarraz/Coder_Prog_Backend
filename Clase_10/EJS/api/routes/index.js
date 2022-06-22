const { Router } = require('express')
const router = Router()

const { getProducts , postProducts , getForm } = require('../controllers/main')

router.get("/", getForm) 
router.get("/products", getProducts) 
router.post("/products", postProducts)

module.exports = router