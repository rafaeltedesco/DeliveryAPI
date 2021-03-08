const yargs = require('yargs')
const {dumpData} = require('./backup')
const {generateMockData} = require('./mock')
const {deleteData} = require('./delete')
const db = require('./../database/db')

let commands = yargs.argv['_']

operations(commands)

async function operations(opt) {

  if (opt[0] == 'backup') {
    await dumpData()
    
  }
  else if (opt[0] == 'mock'){
    if (opt[1] && !isNaN(opt[1])) {
      let n = opt[1]
      if (opt[2] && opt[2] == "print") {
        let printTable = true
        await generateMockData(n, printTable)
      }
      else {
        await generateMockData(n)
      }
    }
    else {
      console.log('Inform the number of elements that you want to generate')
    }
  }
  else if (opt[0] == 'delete') {
    await deleteData()
  }
  else {
    console.log('Command Not Found!')
  }
  
  db.close()
}