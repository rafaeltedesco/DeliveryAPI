const User = require('./../models/user.model')
const converter = require('json-2-csv')
const fs = require('fs')


const getData = async () => {
  try {
    const userData = await User.find({}).select('-__v')
    if (!userData) {
      throw new Error('User Data Not Found')
    }
    return userData
  }
  catch(err) {
    console.error(err.message)
  }
}


const saveDataSync = (csvData, _name='backup_')=> {
  let path = `${__dirname}/backup`
  !fs.existsSync(path) && fs.mkdirSync(path)
  fs.writeFileSync(`${path}/${_name}${Date.now()}.csv`, csvData)

}

exports.dumpData = async()=> {
  try {
    const data = await getData()
    const dataObj = data.map(doc=>doc.toObject())
    const csvData = await converter.json2csvAsync(dataObj)
    saveDataSync(csvData)
    console.log('User data dumped to csv')
  }
  catch(err) {
    console.error(err.message)
  }
}