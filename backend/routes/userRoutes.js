const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/', userController.deleteUsers);
router.patch('/:id', userController.updateUser);
// Add other user-related routes as needed

module.exports = router;
