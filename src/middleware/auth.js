const jwt = require('jsonwebtoken')
const User = require('./../models/user.model')
const { config } = require('./../../config')
const Status = require('./../utils/requestStatus')
const BlackList = require('./../models/blacklist.model')


const checkUserToken = async (req, res, next)=> {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(Status.UNAUTHORIZED).json({
      status: 'fail',
      message: 'Unauthorized access. A token must been sent'
    })
    const user = await jwt.verify(token, config.SECRET)
    req.user = user
    next()
  }
  catch(err) {
    return res.status(Status.UNAUTHORIZED).json({
      status: 'fail',
      message: err.message
    })
  }
}

const authMiddleware = (permissions=[]) => {
 
  

}

module.exports = {
  checkUserToken
}