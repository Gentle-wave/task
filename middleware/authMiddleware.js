const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError'); // Custom error handler

// Protect middleware to secure routes
const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from headers
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from the token, exclude password field
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return next(new AppError(404, 'User not found with this token'));
      }

      // Call next middleware or controller
      next();
    } catch (error) {
      // Invalid token or other JWT errors
      return next(new AppError(401, 'Not authorized, token failed'));
    }
  }

  if (!token) {
    return next(new AppError(401,'Not authorized, no token'));
  }
});

// Admin middleware to restrict access to admin users
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Proceed to next middleware or controller
  } else {
    return next(new AppError(403,'Not authorized as an admin'))
  }
};

module.exports = { protect, admin };
