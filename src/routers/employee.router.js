const express = require('express')
const employeeController = require('./../controllers/employee.controller')
const router = express.Router()


router.route('/')
.post(employeeController.createEmployee)
.get(employeeController.getEmployees)

module.exports = router