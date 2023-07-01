const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.get('/:id', restaurantController.getRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.post('/', restaurantController.createRestaurant);
router.get('/:id/statistics', restaurantController.getStatistics);
router.patch('/:id', restaurantController.updateRestaurant);
router.delete('/', restaurantController.deleteRestaurants);


module.exports = router;
