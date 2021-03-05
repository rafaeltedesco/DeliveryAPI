
const User = require('./../models/user.model')
const Status = require('./../utils/requestStatus')
const jwt = require('jsonwebtoken')
const { config } = require('./../../config')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const MailService = require('./../services/mailService')

const generateToken = (params={})=> {
  return jwt.sign({params}, config.SECRET, {
    expiresIn: config.TIMER
  })
}

exports.findAll = catchAsync(async (req, res, next)=> {
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


exports.create = catchAsync(async (req, res, next)=> {
    let { name, email, password } = req.body
  
    const newUser = await User.create({name, email, password})

    const mailOptions = {
      from: 'dev.rafaeltedesco@gmail.com',
      to: newUser.email,
      subject: 'Your verification Code',
      text: 'Your code is here',
      html: `<h1>Your Code</h1><hr>Your verification code is ${newUser.confirmationCode}`
    }

    const mailer = await new MailService(mailOptions)
    const info = await mailer.sendMail()

    if (!info) return next(new AppError('Cannot send e-mail'))

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

exports.findOne = catchAsync(async (req, res, next)=> {
    let { id } = req.params
  
    const user = await User.findById(id)
    
    if (!user) return next(new AppError(`User Id: ${id} not Found`, Status.NOT_FOUND))
    
    return res.status(Status.CREATED_STATUS).json({
      'status': 'success',
      'message': `User ${user.name} found`,
      'data': user
    })
})

exports.delete = catchAsync(async (req, res, next)=> {
    let {id} = req.params
    
    const user = await User.deleteOne({_id:id})
    if (!user.deletedCount) return next(new AppError('User Not Found', Status.NOT_FOUND))
    return res.status(Status.OK).json({
      'status': 'success',
      'message': `User deleted!`,
    })
})

exports.update = catchAsync(async (req, res, next)=> {
    let {id} = req.params
    let { name, email } = req.body
    const user = await User.updateOne({_id: id}, {name, email})
    if (!user.nModified) return next(new AppError(`Cannot update`, Status.BAD_REQUEST))
  
    return res.status(Status.OK).json({
      'status': 'success',
      'message': `User was updated!`,
      'data': user
    })
})


exports.getAllByName = catchAsync(async (req, res, next)=> {
    let { name } = req.query
    const users = await User.find({ name: { '$regex': `.*${name}.*`, '$options': 'i' } })

    if (!users.length) return next(new AppError('Data not Found!', Status.NOT_FOUND))

    return res.status(Status.OK).json({
      status: 'ok',
      message: `${users.length} users founded`,
      data: users
    })
})


exports.userLogin = catchAsync(async (req, res, next)=> {
    let { email, password } = req.body

    const user = await User.findOne({email: email}).select('+password')

    if (!user) {
      return next(new AppError('User not found!', Status.NOT_FOUND))
    }

    if (! await user.isValidPassword(password)) {
      return next(new AppError('Invalid email or password!', Status.UNAUTHORIZED))
    }


    user.password = undefined
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


exports.sendMail = catchAsync(async(req, res, next)=> {
  let {to, from, subject, text, html } = req.body
  if (!to || !from|| !subject || !text) return next(new AppError('You must inform all fields: to, from, subject, text', Status.BAD_REQUEST))
  const mailOptions = {
    from, 
    to,
    subject,
    text, 
    html
  }
  const mailer = await new MailService(mailOptions)
  const info = await mailer.sendMail()
  if (!info) return next(new AppError('Cannot send email!', Status.INTERNAL_SERVER_ERROR))
  return res.status(Status.OK).json({
    status: 'success',
    message: `e-mail sent to ${to}`,
    data: {
     info
    }
  })
})


exports.confirmAccount = catchAsync(async(req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      return next(new AppError('Unauthorized access. A token must been sent', Status.UNAUTHORIZED))
    }
       
    const decoded = await jwt.verify(token, config.SECRET)

   let { code } = req.body

   const user = await User.findOne({_id: decoded.params.id})

   if (!user) return next(new AppError('User not found!', Status.NOT_FOUND))

   if (user.confirmationCode == code) {
    await User.updateOne({_id: decoded._id}, {$set: {isVerified: true}})
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
   if (!info) return next(new AppError('Cannot send your email'))

   return res.status(Status.OK).json({
     status: 'success',
     message: `e-mail sent to ${mailOptions.to}`,
     data: {
       info
     }
   })
})