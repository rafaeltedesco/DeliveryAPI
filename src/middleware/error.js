const AppError = require("../utils/appError")

module.exports = {
  
  handleError: (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
},

throwError: (req, res, next)=> {
  next(new AppError(`Cannot find ${req.originalUrl}`))
}

}