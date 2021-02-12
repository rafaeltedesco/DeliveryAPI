const express = require('express')

const router = express.Router()

let users = []

router.get('/', (req, res)=> {
  if (!users) {
    return res.status(404).json({
      'status': 'fail',
      'message': 'Data not Found',
      'data': users,
    })
  }
  return res.status(200).json({
    'status': 'success',
    'message': 'Listing all users',
    'results': users.length,
    'data': users
  })

})

router.get('/:id', (req, res)=> {
  let {id} = req.params
  let user = users.filter(user=>user.id==id)
  if (!user) return res.status(404).json({
    message: 'Not found'
  })
  return res.status(200).json({
    data: user
  })

})

router.post('/add', (req, res)=> {

  let {id, name} = req.body

  let newUser = {id, name}

  users.push(newUser)

  return res.status(201).json({
    'status': 'success',
    'message': 'New user Added',
    'data': users
  })

})


router.put('/:id', (req, res)=> {
  let {id} = req.params
  let flag = false
  let userIdx
  users = users.map((user, idx) => {
    if (user.id == id) {
      user.name = req.body.name
      flag = true
      userIdx = idx
    }
    return user
  })

  if (!flag) {
    return res.status(404).json({
      'message': 'Data not found'
    })
  }

  return res.status(200).json({
    'data': users[userIdx]
  })

})

router.delete('/:id', (req, res)=> {
  let {id} = req.params
  let flag = false
  users = users.filter(user=> {
    if (user.id != id) {
      return user
    }
    flag = true
  }) 
  
  if (flag) {
    return res.status(200).json({
      'message': 'User deleted'
    })
  }

  return res.status(404).json({
    'message': 'Invalid Id'
  })
 

})

module.exports = router