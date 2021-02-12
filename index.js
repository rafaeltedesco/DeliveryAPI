require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

require('./src/routes/routes')(app)


app.listen(process.env.PORT, ()=> {
  console.log('Up and Running')
})
