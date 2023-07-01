const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.generateToken = (userId, userType) => {
  const token = jwt.sign({ userId, userType }, process.env.secretKey);
  return token;
};
