const express = require('express')
const orderController = require('./../controllers/order.controller')
const router = express.Router()


router.route('/')
.post(orderController.createOrder)
.get(orderController.getOrders)

module.exports = router