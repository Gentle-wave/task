const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError'); // Custom error handler


// Get all products
exports.getProducts = catchAsync(async (req, res, next) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      next(error); 
    }
  });
  
  // Create new product (Admin only)
  exports.createProduct = catchAsync(async (req, res, next) => {
    try {
      const { name, price, description } = req.body;
  
      const product = new Product({
        name,
        price,
        description,
      });
  
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } catch (error) {
      next(error); 
    }
  });
  
  // Delete product (Admin only)
  exports.deleteProduct = catchAsync(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
      } else {
        return next(new AppError(404, 'Product not found'));
      }
    } catch (error) {
      next(error);
    }
  });
  

  // Update product (Admin only)
exports.updateProduct = catchAsync(async (req, res, next) => {
    try {
      const { name, price, description } = req.body;
      
      // Find product by id
      const product = await Product.findById(req.params.id);
  
      // If product doesn't exist, throw error
      if (!product) {
        return next(new AppError(404, 'Product not found'));
      }
  
      // Update product fields with new data
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
  
      // Save updated product
      const updatedProduct = await product.save();
      
      res.status(200).json({
        status: 'success',
        data: updatedProduct
      });
    } catch (error) {
      next(error); 
    }
  });
