const app = require('./app')
const {config} = require('./config')

const PORT = config.PORT || 3000


app.listen(PORT, ()=> {
  console.log(`Server up and running on http://localhost:${PORT}/api/users`)
})