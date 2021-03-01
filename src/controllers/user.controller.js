
const User = require('./../models/user.model')
const Status = require('./../utils/requestStatus')
const jwt = require('jsonwebtoken')
const { config } = require('./../../config')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const generateToken = (params={})=> {
  return jwt.sign({params}, config.SECRET, {
    expiresIn: config.TIMER
  })
}

exports.findAll = catchAsync(async (req, res, next)=> {
    const users = await User.find()
    if (!users.length) {
      next(new AppError('There are no users registered.', Status.NOT_FOUND))
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
  
    return res.status(Status.CREATED_STATUS).json({
      status: 'success',
      message: `New user ${newUser.name} Added`,
      data: newUser
    })
})

exports.findOne = catchAsync(async (req, res, next)=> {
    let { id } = req.params
  
    const user = await User.findById(id)
    
    if (!user) next(new AppError(`User Id: ${id} not Found`, Status.NOT_FOUND))
    
    return res.status(Status.CREATED_STATUS).json({
      'status': 'success',
      'message': `User ${user.name} found`,
      'data': user
    })
})

exports.delete = catchAsync(async (req, res, next)=> {
    let {id} = req.params
    
    const user = await User.deleteOne({_id:id})
    if (!user.deletedCount) next(new AppError('User Not Found', Status.NOT_FOUND))
    return res.status(Status.OK).json({
      'status': 'success',
      'message': `User deleted!`,
    })
})

exports.update = catchAsync(async (req, res, next)=> {
    let {id} = req.params
    let { name, email } = req.body
    const user = await User.updateOne({_id: id}, {name, email})
    if (!user.nModified) next(new AppError(`Cannot update`, Status.BAD_REQUEST))
  
    return res.status(Status.OK).json({
      'status': 'success',
      'message': `User was updated!`,
      'data': user
    })
})


exports.getAllByName = catchAsync(async (req, res, next)=> {
    let { name } = req.query
    const users = await User.find({ name: { '$regex': `.*${name}.*`, '$options': 'i' } })

    if (!users.length) next(new AppError('Data not Found!', Status.NOT_FOUND))

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
      next(new AppError('User not found!', Status.NOT_FOUND))
    }

    if (! await user.isValidPassword(password)) {
      next(new AppError('Invalid email or password!', Status.UNAUTHORIZED))
    }


    user.password = undefined
    const token = generateToken({id: user._id})

    return res.status(Status.OK).json({
      status: 'success',
      message: 'Loged in',
      data: {
        user,
        token
      }
    })
})