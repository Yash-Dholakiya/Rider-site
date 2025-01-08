const express = require('express');
const router = express.Router();    // Import express and create a router
const{ body } = require("express-validator"); // Import express-validator
const userController = require('../controllers/user.controller'); // Import user controller


router.post('/register', [  // Validate user input
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
    userController.registerUser    // Call user controller // Handle user registration
)

module.exports = router;    // Export the router