const nodemailer = require('nodemailer')
const {config} = require('../../config')


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
      this._transporter = await this._createTransport()
      let info = await this._transporter.sendMail(this.mailOptions)
      
      return info
    }
    catch(err) {
      console.error('Cannot send email', err)
    }
  }
}

module.exports = MailService