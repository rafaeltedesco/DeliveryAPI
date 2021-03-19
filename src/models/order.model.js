const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema( {
  products: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product'
    }
  ],
  client: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }

})