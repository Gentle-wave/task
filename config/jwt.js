const jwt = require('jsonwebtoken');
require('dotenv').config()

// Function to generate a JWT token for a user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Set the expiration of the token (30 days in this example)
  });
};

module.exports = generateToken;
