const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError'); // Custom error handler

// Get all users (Admin only)
exports.getUsers = catchAsync(async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error); // Pass the error to the error middleware
    }
});

// Get user by ID
exports.getUserById = catchAsync(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            res.json(user);
        } else {
            return next(new AppError(404, 'User not found'));
        }
    } catch (error) {
        next(error); // Pass the error to the error middleware
    }
});

