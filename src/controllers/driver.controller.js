const catchAsync = require("../utils/catchAsync");
const Driver = require('./../models/driver.model')
const AppError = require('./../utils/appError')
const Status = require('./../utils/requestStatus')
const UserService = require('./../services/userService')

exports.getDrivers = catchAsync(async (req, res, next) => {

  const driver = await Driver.find().populate(
    [
      {
        path: 'user',
        model: 'User'
      }
  ])
  
  return res.status(Status.OK).json({
    status: 'success',
    results: driver.length,
    message: `${driver.length} driver(s) found!`,
    data: {
      driver
    }
  })
})

exports.createDriver = catchAsync(async (req, res, next) => {
  let {name, available, orders, contact, userId} = req.body

  const user = await UserService.getUserById(userId)
  if (!user) return next(new AppError('User not found!', Status.NOT_FOUND))

  let newDriver = await Driver.create({
    available,
    orders,
    contact,
    user
  })
  return res.status(Status.OK).json({
    status: 'success',
    message: 'New Driver created!',
    data: {
      newDriver
    }
  })
})
