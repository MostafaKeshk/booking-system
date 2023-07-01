const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);

// Add other review-related routes as needed

module.exports = router;
