const faker = require('faker')
const _ = require('lodash')
const User = require('./../models/user.model')

const showInsertedData = (newUsers) => {
  const usersObject = newUsers.map(doc=>doc.toObject())
  console.table(usersObject)
}

exports.generateMockData = async (n, printTable=false)=> {
  try {
    const fakeUsers = await this.mockData(n)
    const newUsers = await User.insertMany(fakeUsers)
    if (!newUsers) throw new Error('Cannot create users')
    console.log(`${newUsers.length} user(s) created!`)
    if (printTable) {
      showInsertedData(newUsers)
    }
  }
  catch(err) {
    console.error(err.message)
  }
}

exports.mockData = async (n) => {
  try {
    console.log('Nice! So you want to generate ' + n + ' elements')
    let newUsers = _.times(n, ()=> {
        return {
        name: faker.name.findName(), 
        email: faker.internet.email(),
        password: faker.internet.password()
        }
      })

    return newUsers

  }
  catch(err) {
    console.error(err.message)
  }
}
