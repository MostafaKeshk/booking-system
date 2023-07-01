const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register/user', authController.registerUser);
router.post('/register/restaurant', authController.registerRestaurant);
router.post('/login', authController.login);

module.exports = router;
