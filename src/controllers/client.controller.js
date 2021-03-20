const catchAsync = require("../utils/catchAsync");
const Client = require('./../models/client.model')
const AppError = require('./../utils/appError')
const Status = require('./../utils/requestStatus')
const User = require('./../models/user.model')

exports.getClients = catchAsync(async (req, res, next) => {
  const clients = await Client.find().populate([{
    path: "user",
    model: "User"
  }])
  
  return res.status(Status.OK).json({
    status: 'success',
    message: `${clients.length} clients found!`,
    data: {
      clients
    }
  })
})

exports.createClient = catchAsync(async (req, res, next) => {
  let userId = req.body.userId
  let user = await User.findById(userId)
  if (!user) return next(new AppError('Invalid Id', Status.BAD_REQUEST))
  let {contact, address, paymentInfo, orders} = req.body
  let newClient = {
    contact,
    address,
    orders,
    paymentInfo,
    user: userId
  }
  const clientCreated = await Client.create(newClient)

  if (!clientCreated) return next(new AppError('Cannot create Client', Status.BAD_REQUEST))

  return res.status(Status.OK).json({
    status: 'success',
    message: 'New user created',
    data: {
      clientCreated
    }
  })
})
