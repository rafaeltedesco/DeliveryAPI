const userRouter = require('./../routers/user.router')
const clientRouter = require('./../routers/client.router')

module.exports = (app)=> {
  app.use('/api/users', userRouter)
  app.use('/api/clients', clientRouter)

}