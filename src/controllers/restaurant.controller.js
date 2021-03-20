const catchAsync = require("../utils/catchAsync");
const Restaurant = require('./../models/restaurant.model')
const AppError = require('./../utils/appError')
const Status = require('./../utils/requestStatus')

exports.getRestaurants = catchAsync(async (req, res, next) => {

  const restaurant = await Restaurant.find()
  if (!restaurant.length) {
    return next(new AppError('Data not found', 404))
  }
  return res.status(Status.OK).json({
    status: 'success',
    message: `${restaurant.length} restaurant found!`,
    data: {
      restaurant
    }
  })
})

exports.createRestaurant = catchAsync(async (req, res, next) => {



})
