const catchAsync = require("../utils/catchAsync");
const Employee = require('./../models/employee.model')
const AppError = require('./../utils/appError')
const Status = require('./../utils/requestStatus')
const UserService = require('./../services/userService')

exports.getEmployees = catchAsync(async (req, res, next) => {

  const employee = await Employee.find().populate(
    [
      {
        path: 'user',
        model: 'User'
      }
  ])
 
  return res.status(Status.OK).json({
    status: 'success',
    results: employee.length,
    message: `${employee.length} employee(s) found!`,
    data: {
      employee
    }
  })
})

exports.createEmployee = catchAsync(async (req, res, next) => {
  let {jobName, schedule, userId} = req.body

  const user = await UserService.getUserById(userId)
  if (!user) return next(new AppError('User not found!', Status.NOT_FOUND))

  let newEmployee = await Employee.create({
    jobName,
    schedule,
    user
  })
  return res.status(Status.OK).json({
    status: 'success',
    message: 'New Employee created!',
    data: {
      newEmployee
    }
  })
})
