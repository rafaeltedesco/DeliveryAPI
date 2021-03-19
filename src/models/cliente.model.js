const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  paymentInfo: {
    cardNumber: {
      type: String,
      required: true
    },
    cardCode: {
      type: String,
      required: true
    },
    cardPlaceholder: {
      type: String,
      required: true
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


module.exports = mongoose.model('Client', clientSchema)