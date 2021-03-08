const yargs = require('yargs')
const {dumpData} = require('./backup')

let commands = yargs.argv['_']
if (commands.includes('backup')) {
  dumpData()
}
else {
  console.log('Command Not Found!')
}


