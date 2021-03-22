const express = require('express')
const driverController = require('./../controllers/driver.controller')
const router = express.Router()


router.route('/')
.post(driverController.createDriver)
.get(driverController.getDrivers)

module.exports = router