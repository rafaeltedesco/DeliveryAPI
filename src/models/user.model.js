const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ROLE_TYPES = require('./../utils/constants')
const generator = require('generate-password')

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
    unique: true,
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
    },
    permissions: {
      role: { 
        type: String,
        enum: [
            ROLE_TYPES.BUSINESS,
            ROLE_TYPES.ADMIN,
            ROLE_TYPES.CLIENT
        ],
        default: "CLIENT"
    }
  },
  confirmationCode: {
    type: String,
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.generatePassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password.toString(), this.password)
  }
  catch(err) {
    console.log(err.message)
  }
}
userSchema.pre('save', async function() {
  this.confirmationCode = await generator.generate(
    {
      length: 4,
      numbers: true,
      symbols: false,
      exclude: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      strict: false
    })

  this.password = await this.generatePassword(this.password)
})

module.exports = mongoose.model('User', userSchema)