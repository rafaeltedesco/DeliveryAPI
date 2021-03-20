const express = require('express')
const restaurantController = require('./../controllers/restaurant.controller')
const router = express.Router()


router.route('/')
.post(restaurantController.createClient)
.get(restaurantController.getClients)