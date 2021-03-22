const catchAsync = require("../utils/catchAsync");
const Order = require('./../models/order.model')
const AppError = require('./../utils/appError')
const Status = require('./../utils/requestStatus')
const orderService = require('./../services/orderService')

exports.getOrders = catchAsync(async (req, res, next) => {

  const order = await Order.find().lean()
  .populate({
    path: "client",
    model: "Client"
  })
  .populate([{
    path: "products",
    model: "Product"
  }])
  .populate({
    path: "driver",
    model: "Driver"
  })
  .populate({
    path: "restaurant",
    model: "Restaurant"
  })
  .exec()
  
 
  return res.status(Status.OK).json({
    status: 'success',
    results: order.length,
    message: `${order.length} order(s) found!`,
    data: {
      order
    }
  })
})

exports.createOrder = catchAsync(async (req, res, next) => {
  let {products, client, driver, restaurant, date} = req.body

  price = await orderService.getOrderPrice(products || [])
  console.log(price)

  let newOrder = await Order.create({
    products,
    client,
    driver,
    restaurant,
    price,
    date
  })
  return res.status(Status.OK).json({
    status: 'success',
    message: 'New Order created!',
    data: {
      newOrder
    }
  })
})
