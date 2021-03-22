const express = require('express')
const productController = require('./../controllers/product.controller')
const router = express.Router()


router.route('/')
.post(productController.createProduct)
.get(productController.getProducts)

module.exports = router