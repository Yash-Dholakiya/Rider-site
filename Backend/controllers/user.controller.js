const userModel = require('../models/user.model');    // Import userModel
const userService = require('../services/user.service');    // Import userService
const { validationResult } = require('express-validator');    // Import express-validator


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);    // Validate user input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   // Return validation errors

    const { fullname, email, password } = req.body;    // Get user input

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }   // Check if user already exist

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });    // Return token and user details
}

module.exports.loginUser = async (req, res, next) => {
    
    const errors = validationResult(req);    // Validate user input
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   // Return validation errors

    const { email, password } = req.body;    // Get user input

    const user = await userModel.findOne({ email }).select('+password');    // Find user by email and password

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }   // Check if user exist

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }   // Check if password match

    const token = user.generateAuthToken();   // Generate token

    res.cookie('token', token);    // Set token in cookie

    res.status(200).json({ token, user });  // Return token and user
}

module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);    // Return user profile
    
}