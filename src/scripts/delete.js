const User = require('./../models/user.model')

exports.deleteData = async () => {
  const {deletedCount} =  await User.deleteMany({})
  console.log(`${deletedCount} element(s) were deleted`)
}