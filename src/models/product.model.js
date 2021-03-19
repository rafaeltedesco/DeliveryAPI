const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  qtdd: {
    type: Number,
  }
})


module.exports = mongoose.model('Product', productSchema)