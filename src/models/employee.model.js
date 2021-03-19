const mongoose = require('mongoose')


const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  jobName: {
    type: String,
    required: True
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