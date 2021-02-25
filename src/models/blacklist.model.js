const mongoose = require('mongoose')
const { config } = require('./../../config')


const blackListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now,
    expires: config.TIMER
  },
  
})

module.exports = mongoose.model('BlackListModel', blackListSchema)

