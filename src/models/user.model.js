const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ROLE_TYPES = require('./../utils/constants')

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
  this.password = await this.generatePassword(this.password)
})

module.exports = mongoose.model('User', userSchema)