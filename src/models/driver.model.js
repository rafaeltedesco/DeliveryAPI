const mongoose = require('mongoose')


const driverSchema = new mongoose.Schema( {
  available: {
    type: Boolean,
    required: true,
    default: true
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



