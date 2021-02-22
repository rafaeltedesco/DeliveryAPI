
const User = require('./../models/user.model')
const Status = require('./../utils/requestStatus')

exports.findAll = async (req, res)=> {
  try {
    const users = await User.find()
    if (!users.length) throw new Error('There are no users registered.')
    return res.status(Status.OK).json({
      'status': 'success',
      'message': 'Listing all users',
      'results': users.length,
      'data': users
    })
  }
  catch(err) {
    return res.status(Status.NOT_FOUND).json({
      message: err.message
    })
  }
}


exports.create = async (req, res)=> {
  try {
    let { name, email, password } = req.body
  
    const newUser = await User.create({name, email, password})
  
    return res.status(Status.CREATED_STATUS).json({
      status: 'success',
      message: `New user ${newUser.name} Added`,
      data: newUser
    })
  }
  catch(err) {
    return res.status(Status.BAD_REQUEST).json({
      message: err.message
    })
  }
}

exports.findOne = async (req, res)=> {
  try {
    let { id } = req.params
  
    const user = await User.findById(id)
    
    if (!user) throw new Error(`User Id: ${id} not Found`)
  
    return res.status(Status.CREATED_STATUS).json({
      'status': 'success',
      'message': `User ${user.name} found`,
      'data': user
    })
  }
  catch(err) {
    return res.status(Status.NOT_FOUND).json({
      message: err.message
    })
  }
}

exports.delete = async (req, res)=> {
  try {
    let {id} = req.params
    
    const user = await User.deleteOne({_id:id})
    if (!user.deletedCount) throw new Error('User Not Found')
    return res.status(Status.OK).json({
      'status': 'success',
      'message': `User deleted!`,
    })
  }
  catch(err) {
    return res.status(Status.BAD_REQUEST).json({
      message: err.message
    })
  }
}

exports.update = async (req, res)=> {
  try {
    let {id} = req.params
  
    const user = await User.updateOne({_id: id}, req.body)
    if (!user.nModified) throw new Error(`Cannot update`)
  
    return res.status(Status.OK).json({
      'status': 'success',
      'message': `User was updated!`,
      'data': user
    })
  }
  catch(err) {
    return res.status(Status.BAD_REQUEST).json({
      message: err.message
    })
  }
}