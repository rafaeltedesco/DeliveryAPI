require('dotenv').config()

exports.config = {
  PORT: 3000,
  DB: `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  SECRET: "49fb775afa045a8d97a4ddba26c743cb",
  TIMER: 1562271258,
  EMAIL_CONFIG: {
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  }
}