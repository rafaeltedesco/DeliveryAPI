const userRouter = require('./../user/user.router')

module.exports = (app)=> {
  app.use('/api/users', userRouter)

}