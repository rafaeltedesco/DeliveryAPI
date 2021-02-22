const mongoose = require('mongoose')
const {config} = require('./../../config')

mongoose.connect(config.DB, {
  useNewUrlParser: true, useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=> {
  console.log('Database connected')
})

mongoose.connection.on('disconnected', ()=> {
  console.log('Database disconnected')
})

mongoose.connection.on('error', (err)=> {
  console.log('Database err' + err)
})

mongoose.set('useCreateIndex', true)

module.exports = mongoose.connection