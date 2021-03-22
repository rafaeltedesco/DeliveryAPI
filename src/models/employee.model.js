const mongoose = require('mongoose')


const EmployeeSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


module.exports = mongoose.model('Employee', EmployeeSchema)