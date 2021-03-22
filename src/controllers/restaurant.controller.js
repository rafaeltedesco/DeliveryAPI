const catchAsync = require("../utils/catchAsync");
const Restaurant = require('./../models/restaurant.model')
const AppError = require('./../utils/appError')
const Status = require('./../utils/requestStatus')
const UserService = require('./../services/userService')

exports.getRestaurants = catchAsync(async (req, res, next) => {

  const restaurant = await Restaurant.find().populate(
    [
      {
        path: 'user',
        model: 'User'
      }
  ])
  if (!restaurant.length) {
    return next(new AppError('Data not found', 404))
  }
  return res.status(Status.OK).json({
    status: 'success',
    results: restaurant.length,
    message: `${restaurant.length} restaurant(s) found!`,
    data: {
      restaurant
    }
  })
})

exports.createRestaurant = catchAsync(async (req, res, next) => {
  let {name, products, employees, userId} = req.body

  const user = await UserService.getUserById(userId)
  console.log(user)
  if (!user) return next(new AppError('User not found!', Status.NOT_FOUND))

  let newRestaurant = await Restaurant.create({
    name,
    products,
    employees,
    user
  })
  return res.status(Status.OK).json({
    status: 'success',
    message: 'New restaurant created!',
    data: {
      newRestaurant
    }
  })
})
