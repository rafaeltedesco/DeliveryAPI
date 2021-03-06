const nodemailer = require('nodemailer')
const {config} = require('../../config')
const validator = require('email-validator')
const AppError = require('./../utils/appError')
const Status = require('./../utils/requestStatus')

class MailService {
  constructor(mailOptions) {
    console.log()
    this.mailOptions = mailOptions
    
    this._transporter
  }

  async _createTransport() {
    try {
      return await nodemailer.createTransport(config.EMAIL_CONFIG)
    }
    catch(err) {
      console.error('Cannot create Transport', err)
    }
  }

  async sendMail() {
    try {
      if(!validator.validate(this.mailOptions.to) || !validator.validate(this.mailOptions.from)) {
        return false
      }
      this._transporter = await this._createTransport()
      await this._transporter.sendMail(this.mailOptions)
      
      return true
    }
    catch(err) {
      console.error('Cannot send email', err)
    }
  }
}

module.exports = MailService