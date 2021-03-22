const catchAsync = require("../utils/catchAsync");
const Product = require('./../models/product.model')
const AppError = require('./../utils/appError')
const Status = require('./../utils/requestStatus')

exports.getProducts = catchAsync(async (req, res, next) => {

  const product = await Product.find()

  return res.status(Status.OK).json({
    status: 'success',
    results: product.length,
    message: `${product.length} product(s) found!`,
    data: {
      product
    }
  })
})

exports.createProduct = catchAsync(async (req, res, next) => {
  let {name, price, img, description, category, qtdd} = req.body

  let newProduct = await Product.create({
    name,
    price,
    img,
    description,
    category,
    qtdd
  })

  return res.status(Status.OK).json({
    status: 'success',
    message: 'New Product created!',
    data: {
      newProduct
    }
  })
})
