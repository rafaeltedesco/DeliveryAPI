require('./src/database/db')
const express = require('express')
const logger = require('morgan')
const app = express()
const cors = require('cors')
const {handleError, throwError}  = require('./src/middleware/error')
const AppError = require('./src/utils/appError')

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

require('./src/routes/routes')(app)

app.all('*', throwError)

app.use(handleError)

module.exports = app