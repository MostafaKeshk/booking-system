const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.secretKey);
    console.log(decodedToken)

    req.userData = { userId: decodedToken.userId, userType: decodedToken.userType };
    next();
  } catch (error) {
    console.log({error});
    res.status(401).json({ message: 'Authentication failed' });
  }
};
