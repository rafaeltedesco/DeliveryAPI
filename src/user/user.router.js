const express = require('express')
const userController = require('./../controllers/user.controller')
const {checkUserToken, authMiddleware} = require('./../middleware/auth')
const {ROLE_TYPES} = require('./../utils/constants')

const router = express.Router()

router.route('/search')

.get(userController.getAllByName)


router.route('/login')
.post(userController.userLogin)

router.route('/confirmaccount')
.post(checkUserToken, userController.confirmAccount)

router.route('/forgot')
.post(userController.forgotPassword)

router.route('/resetpassword')
.post(userController.resetPassword)

router.route('/sendmail')
.post(checkUserToken, userController.sendMail)


router.route('/')
.get(checkUserToken, userController.findAll)
.post(userController.create)


router.route('/:id')
.all(checkUserToken, authMiddleware(ROLE_TYPES.ADMIN, ROLE_TYPES.BUSINESS, ROLE_TYPES.CLIENT))
.get(userController.findOne)
.delete(userController.delete)
.put(userController.update)



module.exports = router