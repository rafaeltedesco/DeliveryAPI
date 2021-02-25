const express = require('express')
const userController = require('./../controllers/user.controller')

const router = express.Router()

router.route('/search')
.get(userController.getAllByName)


router.route('/login')
.post(userController.userLogin)

// Testing Middlewares
// const testeMiddleware = (req, res, next)=> {
//   console.log('here')
//   next()
// }

// const testeMiddleWare2 = (req, res, next)=> {
//   console.log('here 2')
//   next()
// }

// router.route('/teste')
// .get(testeMiddleware, testeMiddleWare2, (req, res)=> res.send('ok'))

router.route('/')
.get(userController.findAll)
.post(userController.create)

router.route('/:id')
.get(userController.findOne)
.delete(userController.delete)
.put(userController.update)


module.exports = router