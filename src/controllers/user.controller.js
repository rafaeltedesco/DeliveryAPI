
const User = require('./../models/user.model')
const Status = require('./../utils/requestStatus')
const jwt = require('jsonwebtoken')
const { config } = require('./../../config')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const MailService = require('./../services/mailService')
const validator = require('email-validator')


const generateToken = (params = {}) => {
  return jwt.sign({ params }, config.SECRET, {
    expiresIn: config.TIMER
  })
}

exports.findAll = catchAsync(async (req, res, next) => {
  const users = await User.find()
  if (!users.length) {
    return next(new AppError('There are no users registered.', Status.NOT_FOUND))
  }
  return res.status(Status.OK).json({
    'status': 'success',
    'message': 'Listing all users',
    'results': users.length,
    'data': users
  })
})


exports.create = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body

  if (!name || !email || !password) {
    return next(new AppError('You must inform your Name, email and password', Status.BAD_REQUEST))
  }

  if (!validator.validate(email)) {
    return next(new AppError('Invalid email', Status.BAD_REQUEST))
  }

  const newUser = await User.create({ name, email, password })

  const mailOptions = {
    from: 'dev.rafaeltedesco@gmail.com',
    to: newUser.email,
    subject: 'Your verification Code',
    text: 'Your code is here',
    html: `<h1>Your Code</h1><hr>Your verification code is ${newUser.confirmationCode}`
  }

  const mailer = await new MailService(mailOptions)
  const info = await mailer.sendMail()

  if (!info) return next(new AppError('Invalid e-mail', Status.BAD_REQUEST))

  const payload = {
    id: newUser._id,
    name: newUser.name,
    role: newUser.permissions.role
  }
  const token = generateToken(payload)

  newUser.confirmationCode = undefined
  newUser.password = undefined

  return res.status(Status.CREATED_STATUS).json({
    status: 'success',
    message: `New user ${newUser.name} Added and verification code sent to ${newUser.email}`,
    data: {
      newUser,
      token
    }
  })
})

exports.findOne = catchAsync(async (req, res, next) => {
  let { id } = req.params

  const user = await User.findById(id)

  if (!user) return next(new AppError(`User Id: ${id} not Found`, Status.NOT_FOUND))

  return res.status(Status.CREATED_STATUS).json({
    'status': 'success',
    'message': `User ${user.name} found`,
    'data': user
  })
})

exports.delete = catchAsync(async (req, res, next) => {
  let { id } = req.params

  const user = await User.deleteOne({ _id: id })
  if (!user.deletedCount) return next(new AppError('User Not Found', Status.NOT_FOUND))
  return res.status(Status.OK).json({
    'status': 'success',
    'message': `User deleted!`,
  })
})

exports.update = catchAsync(async (req, res, next) => {
  let { id } = req.params
  let { name, email } = req.body
  if (!name || !email) {
    return next(new AppError('You must inform your Name and email', Status.BAD_REQUEST))
  }

  if (!validator.validate(email)) {
    return next(new AppError('Invalid email', Status.BAD_REQUEST))
  }

  const user = await User.updateOne({ _id: id }, { name, email })
  if (!user.nModified) return next(new AppError(`Cannot update`, Status.BAD_REQUEST))

  return res.status(Status.OK).json({
    'status': 'success',
    'message': `User was updated!`,
    'data': user
  })
})


exports.getAllByName = catchAsync(async (req, res, next) => {
  let { name } = req.query
  const users = await User.find({ name: { '$regex': `.*${name}.*`, '$options': 'i' } })

  if (!users.length) return next(new AppError('Data not Found!', Status.NOT_FOUND))

  return res.status(Status.OK).json({
    status: 'ok',
    message: `${users.length} users founded`,
    data: users
  })
})


exports.userLogin = catchAsync(async (req, res, next) => {
  let { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('You must inform your email and password to login', Status.BAD_REQUEST))
  }
  if (!validator.validate(email)) {
    return next(new AppError('Invalid email', Status.BAD_REQUEST))
  }

  let user = await User.findOne({ email: email }).select('+password')

  if (!user) {
    return next(new AppError('User not found!', Status.NOT_FOUND))
  }

  if (! await user.isValidPassword(password)) {
    return next(new AppError('Invalid email or password!', Status.UNAUTHORIZED))
  }

  user.isVerified = true
  user = await user.save()

  user.password = undefined
  user.confirmationCode = undefined
  const payload = {
    id: user._id,
    name: user.name,
    role: user.permissions.role
  }
  const token = generateToken(payload)

  return res.status(Status.OK).json({
    status: 'success',
    message: 'Loged in',
    data: {
      user,
      token
    }
  })
})


exports.sendMail = catchAsync(async (req, res, next) => {
  let { to, from, subject, text, html } = req.body
  if (!to || !from || !subject || !text) return next(new AppError('You must inform all fields: to, from, subject, text', Status.BAD_REQUEST))
  const mailOptions = { from, to, subject, text, html }
  const mailer = await new MailService(mailOptions)
  const info = await mailer.sendMail()
  if (!info) return next(new AppError('Invalid email!', Status.BAD_REQUEST))
  return res.status(Status.OK).json({
    status: 'success',
    message: `e-mail sent to ${to}`,
  })
})


exports.confirmAccount = catchAsync(async (req, res, next) => {

  let { code } = req.body
  let { id } = req.user.params

  const user = await User.findOne({ _id: id }).select('+confirmationCode')

  if (!user) return next(new AppError('User not found!', Status.NOT_FOUND))

  if (user.confirmationCode == code) {
    await User.updateOne({ _id: decoded._id }, { $set: { isVerified: true } })
  }

  const mailOptions = {
    from: 'dev.rafaeltedesco@gmail.com',
    to: user.email,
    subject: 'Welcome!',
    text: 'Your account was verified and now you able to access your dashboard',
    html: '<h1>Welcome!</h1><hr>Your account was verified and now you able to access your dashboard'
  }

  const mailer = await new MailService(mailOptions)
  const info = await mailer.sendMail()
  if (!info) return next(new AppError('Invalid email', Status.BAD_REQUEST))

  return res.status(Status.OK).json({
    status: 'success',
    message: `e-mail sent to ${mailOptions.to}`
  })
})


exports.forgotPassword = catchAsync(async (req, res, next) => {
  let { email } = req.body

  if (!validator.validate(email)) {
    return next(new AppError('Invalid email', Status.BAD_REQUEST))
  }

  let user = await User.findOne({ email }).select('+forgotPassword')
  if (!user) return next(new AppError('User not found', Status.NOT_FOUND))
  user.forgotPassword = true
  user = await user.save()

  const mailOptions = {
    from: 'dev.rafaeltedesco@gmail.com',
    to: user.email,
    subject: 'Reset your password',
    text: 'Here is your code to reset your password',
    html: `<h1>Password Reset</h1><hr>Here is your code to reset your password<br /><h3 align="center">${user.confirmationCode}</h3>`
  }
  const mailer = new MailService(mailOptions)
  const info = mailer.sendMail()
  if (!info) return next(new AppError('Invalid email', Status.BAD_REQUEST))
  return res.status(Status.OK).json({
    status: 'success',
    message: `Verification Code sent to ${user.email}`
  })
})

exports.resetPassword = catchAsync(async (req, res, next) => {
  let { code, email, password } = req.body

  if (!code || !email || !password) {
    return next(new AppError('You must inform your Code, email and New Password!', Status.BAD_REQUEST))
  }
  if (!validator.validate(email)) {
    return next(new AppError('Invalid email', Status.BAD_REQUEST))
  }

  let user = await User.findOne({ email }).select('+password +confirmationCode +forgotPassword')
  if (!user) return next(new AppError('User not found', Status.NOT_FOUND))

  if (!user.forgotPassword) {
    return next(new AppError('First your need inform that you forgot your password'))
  }

  if (!user.confirmationCode == code) {
    return next(new AppError('Confirmation Code Invalid', Status.BAD_REQUEST))
  }

  user.password = password
  user.forgotPassword = false
  user.isVerified = true
  user = await user.save()

  user.password = undefined
  user.confirmationCode = undefined
  user.forgotPassword = undefined

  const payload = {
    id: user._id,
    name: user.name,
    role: user.permissions.role
  }
  const token = generateToken(payload)

  return res.status(200).json({
    status: 'success',
    message: 'Password updated',
    data: {
      user,
      token
    }
  })



})