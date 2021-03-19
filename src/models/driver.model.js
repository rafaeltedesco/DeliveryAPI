const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  available: {
    type: Boolean,
    required: true
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  contact: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  } 
})


module.exports = mongoose.model('Driver', driverSchema)



