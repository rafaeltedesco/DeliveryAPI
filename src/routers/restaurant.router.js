const express = require('express')
const restaurantController = require('./../controllers/restaurant.controller')
const router = express.Router()


router.route('/')
.post(restaurantController.createRestaurant)
.get(restaurantController.getRestaurants)

module.exports = router