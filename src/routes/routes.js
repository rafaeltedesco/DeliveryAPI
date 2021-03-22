const userRouter = require('./../routers/user.router')
const clientRouter = require('./../routers/client.router')
const restaurantRouter = require('./../routers/restaurant.router')
const productRouter = require('./../routers/product.router')
const driverRouter = require('./../routers/driver.router')
const employeeRouter = require('./../routers/employee.router')
const orderRouter = require('./../routers/order.router')

module.exports = (app)=> {
  app.use('/api/users', userRouter)
  app.use('/api/clients', clientRouter)
  app.use('/api/restaurants', restaurantRouter)
  app.use('/api/products', productRouter)
  app.use('/api/drivers', driverRouter)
  app.use('/api/employees', employeeRouter)
  app.use('/api/orders', orderRouter)

}