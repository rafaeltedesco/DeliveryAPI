const express = require('express')
const userController = require('./../controllers/user.controller')

const router = express.Router()

router.param('id', userController.checkId)

router.route('/')
.get(userController.findAll)
.post(userController.create)

router.route('/:id')
.get(userController.findOne)
.delete(userController.delete)
.put(userController.update)


module.exports = router