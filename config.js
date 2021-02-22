require('dotenv').config()

exports.config = {
  PORT: 3000,
  DB: `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
}