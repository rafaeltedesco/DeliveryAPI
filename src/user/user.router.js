const express = require('express')
const userController = require('./../controllers/user.controller')
const {authMiddleware} = require('./../middleware/auth')
const {ROLE_TYPES} = require('./../utils/constants')

const router = express.Router()

router.route('/search')
.get(userController.getAllByName)


router.route('/login')
.post(userController.userLogin)


router.route('/')
.get(userController.findAll)
.post(userController.create)

// router.get('/', authMiddleware(['ADMIN', 'MANAGER', 'SALES']), userController.getUsers);


router.route('/:id')
.get(authMiddleware([ROLE_TYPES.ADMIN, ROLE_TYPES.BUSINESS]), userController.findOne)
.delete(userController.delete)
.put(userController.update)


module.exports = router