const User = require('../models/userModel');
// const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const generateToken  = require('../config/jwt');
const AppError = require('../utils/appError'); // Custom error handler

// Register User
exports.registerUser = catchAsync(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new AppError(400, 'User already exists'));
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        next(error);
    }
});
// Login User
exports.loginUser = catchAsync(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            const token = generateToken(user._id);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        } else {
            return next(new AppError(401, 'Invalid email or password'));
        }
    } catch (error) {
        next(error);
    }
});
