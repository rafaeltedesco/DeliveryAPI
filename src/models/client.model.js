const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
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