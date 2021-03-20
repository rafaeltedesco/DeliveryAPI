const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})


module.exports = mongoose.model('Restaurant', restaurantSchema)