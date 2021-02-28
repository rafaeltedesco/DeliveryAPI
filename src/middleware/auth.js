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
      throw new AppError('Unauthorized access. A token must been sent', Status.UNAUTHORIZED) 
    }
       
    const user = await jwt.verify(token, config.SECRET)

    req.user = user
    next()
  })

const authMiddleware = (permissions=[]) => {
 
  

}

module.exports = {
  checkUserToken
}