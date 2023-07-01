const Review = require('../models/review');
const Restaurant = require('../models/restaurant');

exports.createReview = async (req, res) => {
  try {
    const { userId, comment, stars, restaurantId, reservationId  } = req.body;
    console.log(req.body)
    // Create the review
    const review = new Review({ user: userId, comment, stars, restaurant: restaurantId,reservation:reservationId  });
    await review.save();

    // Update the restaurant
    const restaurant = await Restaurant.findById(restaurantId);

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Update the restaurant's review data
    restaurant.numOfReviews++;
    restaurant.totalStars += stars;
    restaurant.rating = restaurant.totalStars / restaurant.numOfReviews;

    await restaurant.save();

    res.status(200).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.log({error});
    res.status(500).json({ message: 'Failed to create review' });
  }
};


exports.getAllReviews = async (req, res) => {
  try {
    const { searchValue, pageNumber, pageSize, userId, restaurantId } = req.query;
    const query = {};

    // Add search value to query if provided
    if (searchValue) {
      query.comment = { $regex: searchValue, $options: 'i' };
    }

    // Add userId filter to query if provided
    if (userId) {
      query.user = userId;
    }

    // Add restaurantId filter to query if provided
    if (restaurantId) {
      query.restaurant = restaurantId;
    }

    const count = await Review.countDocuments(query);

    const rows = await Review.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate('user')
      .populate('restaurant');

    res.status(200).json({
      count,
      rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get reviews' });
  }
};

