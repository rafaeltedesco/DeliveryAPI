const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
          return new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$').test(email);
        }
      }
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    admin: {
      type: Boolean,
      default: false
    }
})

userSchema.methods.generatePassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.pre('save', async function() {
  this.password = await this.generatePassword(this.password)
})

module.exports = mongoose.model('User', userSchema)