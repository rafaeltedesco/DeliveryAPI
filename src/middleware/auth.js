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
      return next(AppError('Unauthorized access. A token must been sent', Status.UNAUTHORIZED))
    }
       
    const user = await jwt.verify(token, config.SECRET)

    req.user = user
    next()
  })

const authMiddleware = permissions => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
  
      if (!token) return next(new AppError('Token must been sent', 400))
  
      const decoded = await jwt.verify(token, config.SECRET)
  
      if (!decoded) return next(new AppError('Invalid token', 400))
  
      // find user 
  
      console.log(decoded)
      const user = await User.findById(decoded.params.id)
  
      if(!user) return next(new AppError('Invalid User', 400))
      
      let userPermissions = permissions.filter(permission=> {
        if (permission == user.role) {
          return permission
        }
      })

      if (!userPermissions.length) return next(new AppError('User dont have permission'))
      
      // check permissions
      next()
    }
    catch(err) {

      return res.status(400).json({
        status: 'fail',
        message: err.message
      })
      
    }
  }
}

module.exports = {
  checkUserToken,
  authMiddleware
} 