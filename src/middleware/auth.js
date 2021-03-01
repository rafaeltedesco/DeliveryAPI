const jwt = require('jsonwebtoken')
const User = require('./../models/user.model')
const { config } = require('./../../config')
const Status = require('./../utils/requestStatus')
const BlackList = require('./../models/blacklist.model')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const checkUserToken = catchAsync(async (req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      return next(new AppError('Unauthorized access. A token must been sent', Status.UNAUTHORIZED))
    }
       
    const user = await jwt.verify(token, config.SECRET)

    req.user = user
    next()
  })

const authMiddleware = permissions => {
  return catchAsync(async function (req, res, next) {
      // find user 
      let {id} = req.user.params
    
      const user = await User.findById(id)
      
      if(!user) return next(new AppError('Invalid User', Status.NOT_FOUND))
      
      let userPermissions = permissions.filter(permission=> {
        return user.permissions.role == permission
      })

      if (!userPermissions.length) return next(new AppError('User dont have permission'))

      next()
    })
  }

module.exports = {
  checkUserToken,
  authMiddleware
} 