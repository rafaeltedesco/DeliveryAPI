
let users = []

exports.findAll = (req, res)=> {
  return res.status(200).json({
    'status': 'success',
    'message': 'Listing all users',
    'results': users.length,
    'data': users
  })
}


exports.create = (req, res)=> {
  let id
  id = users.length === 0 ? 1 : users[users.length-1].id + 1
  let {name} = req.body
  let newUser = {id, name}
  users.push(newUser)

  return res.status(201).json({
    'status': 'success',
    'message': `New user ${newUser.name} Added`,
    'data': users
  })
}

exports.findOne = (req, res)=> {
  let {id} = req.params
  let user = users.find(user=> user.id == id)
  return res.status(200).json({
    'status': 'success',
    'message': `User ${user.name} found`,
    'data': user
  })
}

exports.delete = (req, res)=> {
  let {id} = req.params
  let userToDelete
  users = users.filter(user=> {
    if (user.id != id) {
      return user
    }
    userToDelete = user
  }) 
    return res.status(200).json({
      'status': 'success',
      'message': `User ${userToDelete.name} deleted!`,
    })
}

exports.update = (req, res)=> {
  let {id} = req.params
  let previousUser
  let user = users.find(user => { 
    if (user.id==id) {
      previousUser = Object.assign({}, user)
      user.name = req.body.name
      return user
    }
  })
  return res.status(200).json({
    'status': 'success',
    'message': `User: ${previousUser.name} was updated to ${user.name}!`,
    'data': users[id]
  })
}