const express = require('express')
const userController = require('./../controllers/user.controller')
const authMiddleware = require('./../middleware/auth')

const router = express.Router()

router.route('/search')
.get(userController.getAllByName)


router.route('/login')
.post(userController.userLogin)


router.route('/')
.get(userController.findAll)
.post(userController.create)

router.route('/:id')
.get(authMiddleware.checkUserToken, userController.findOne)
.delete(userController.delete)
.put(userController.update)


module.exports = router