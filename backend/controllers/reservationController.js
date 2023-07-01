const Reservation = require('../models/reservation');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');

exports.getAllReservations = async (req, res) => {
  try {
    const { searchValue, pageNumber, pageSize, status, userId, restaurantId } = req.query;

    // Prepare searchValue query
    const query = {};
    if (searchValue) {
      query.$or = [
        { 'user.name': { $regex: searchValue, $options: 'i' } },
        { 'restaurant.name': { $regex: searchValue, $options: 'i' } },
      ];
    }
    if (status) {
      const statusArray = Array.isArray(status) ? status : [status];
      query.status = { $in: statusArray };
    }
    if (userId) {
        query['user'] = userId;
      }
      if (restaurantId) {
        query['restaurant'] = restaurantId;
      }

    // Convert page and limit to numbers (with default values)
    const page = parseInt(pageNumber) || 1;
    const limit = parseInt(pageSize) || 10;

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Fetch reservations based on search query and pagination
    const rows = await Reservation.find(query)
      .skip(skip)
      .limit(limit) 
      .populate('user')
      .populate('restaurant');

    // Count total number of rows matching the search query
    const count = await Reservation.countDocuments(query);

    res.status(200).json({ count, rows });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve reservations' });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { restaurantId, userId, date } = req.body;

    // Find the restaurant and user
    const restaurant = await Restaurant.findById(restaurantId);
    const user = await User.findById(userId);

    // Check if restaurant and user exist
    if (!restaurant || !user) {
      return res.status(404).json({ message: 'Restaurant or user not found' });
    }

    // Create the reservation
    const reservation = new Reservation({
      restaurant,
      user,
      date,
      status: 'pending',
    });
    await reservation.save();
    // Update the restaurant's bookingList
    restaurant.bookingList.push(userId);
    await restaurant.save();

    res.status(200).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.log({error});
    res.status(500).json({ message: 'Failed to create reservation' });
  }
};

exports.changeReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the reservation by ID
    const reservation = await Reservation.findById(id);

    // Check if the reservation exists
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    // Update the status
    reservation.status = status;
    await reservation.save();
    if (status === 'cancelled' || status === 'done') {
        const restaurant = await Restaurant.findById(reservation.restaurant);
        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }
  
        // Remove user from booking list
        const userIndex = restaurant.bookingList.findIndex(
          (booking) => booking === reservation.user.toString()
        );

  
        if (userIndex !== -1) {
          restaurant.bookingList.splice(userIndex, 1);
          await restaurant.save();
        }
      }

    res.status(200).json({ message: 'Reservation status updated successfully', reservation });
  } catch (error) {
    console.log({error});
    res.status(500).json({ message: 'Failed to update reservation status' });
  }
};
