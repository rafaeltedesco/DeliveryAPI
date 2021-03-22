const AppError = require('../utils/appError')
const Product = require('./../models/product.model')

const getItemsPrice = async (products) => {
  return new Promise(async (resolve, reject)=> {
    productsList = []
    productsList = await products.map(async product => {
      let p = await Product.findById(product).select({'price':1})
      if (!p.price) {
        p.price = 0
      }
      return p.price
    })
    resolve(productsList)    
  })
}


exports.getOrderPrice =async (products)=> {
  prices = await getItemsPrice(products)
  console.log(prices, 'prices')
  total = prices.reduce((curr, next)=> {
    return curr + next
  })

  return total
}