const express = require('express')
const userController = require('./../controllers/user.controller')
const {checkUserToken, authMiddleware} = require('./../middleware/auth')
const {ROLE_TYPES} = require('./../utils/constants')

const router = express.Router()

router.route('/search')
.all(checkUserToken, authMiddleware(ROLE_TYPES.MANAGER))
.get(userController.getAllByName)


router.route('/login')
.post(userController.userLogin)


router.route('/')
.all(checkUserToken, authMiddleware(ROLE_TYPES.CLIENT))
.get(userController.findAll)
.post(userController.create)


router.route('/:id')
.all(checkUserToken, authMiddleware(ROLE_TYPES.ADMIN, ROLE_TYPES.BUSINESS))
.get(userController.findOne)
.delete(userController.delete)
.put(userController.update)


module.exports = router