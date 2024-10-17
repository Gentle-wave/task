const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError'); // Custom error handler


// Get user's cart
exports.getCart = catchAsync(async (req, res, next) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id }).populate('products');
      if (!cart) {
        return next(new AppError(404, 'Cart not found'));
      }
      res.json(cart);
    } catch (error) {
      next(error); // Pass the error to the error middleware
    }
  });
  
  // Add product to cart
  exports.addToCart = catchAsync(async (req, res, next) => {
    try {
      let cart = await Cart.findOne({ user: req.user._id });
  
      if (cart) {
        cart.products.push(req.body.productId);
        await cart.save();
        res.status(200).json(cart); // Send the updated cart
      } else {
        const newCart = await Cart.create({
          user: req.user._id,
          products: [req.body.productId],
        });
        res.status(201).json(newCart);
      }
    } catch (error) {
      next(error); // Pass the error to the error middleware
    }
  });

  exports.removeFromCart = catchAsync(async (req, res, next) => {
    try {
      // Find the user's cart
      let cart = await Cart.findOne({ user: req.user._id });
  
      // If no cart is found, return an error
      if (!cart) {
        return next(new AppError(404, 'Cart not found'));
      }
  
      // Find the index of the product to remove
      const productIndex = cart.products.indexOf(req.params.productId);
  
      // If the product is not in the cart, return an error
      if (productIndex === -1) {
        return next(new AppError(404, 'Product not found in cart'));
      }
  
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
      next(error); // Pass the error to the error middleware
    }
  });

  // Clear cart (Remove all items from cart)
exports.clearCart = catchAsync(async (req, res, next) => {
    try {
      // Find the user's cart
      let cart = await Cart.findOne({ user: req.user._id });
  
      // If no cart is found, return an error
      if (!cart) {
        return next(new AppError(404, 'Cart not found'));
      }
  
      // Clear the products array
      cart.products = [];
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: 'Cart has been cleared', cart });
    } catch (error) {
      next(error); // Pass the error to the error middleware
    }
  });
  
