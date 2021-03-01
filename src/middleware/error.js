const AppError = require("../utils/appError")
const Status = require('./../utils/requestStatus')

module.exports = {
  
  handleError: (err, req, res, next) => {
  err.statusCode = err.statusCode || Status.BAD_REQUEST
  err.status = err.status || 'error'
  
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
},

throwError: (req, res, next)=> {
  return next(new AppError(`Cannot find ${req.originalUrl}`))
}

}