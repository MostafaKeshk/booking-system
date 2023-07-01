const bcrypt = require('bcrypt');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const jwtUtils = require('../utils/jwt');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, userType } = req.body;
    const image = req.file.cloudinaryUrl;
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, phoneNumber, password: hashedPassword, image, userType });
    await user.save();

    const token = jwtUtils.generateToken(user._id, user.userType);

    res.status(200).json({ message: 'User registered successfully', user, token  });
  } catch (error) {
  
    res.status(500).json({ message: error.message });
  }
};

exports.registerRestaurant = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, userType, address } = req.body;
    const image = req.file.cloudinaryUrl;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const restaurant = new Restaurant({ name, email, phoneNumber, password: hashedPassword, image, userType, address, numOfReviews:0, totalStars:0, rating:0,bookingList:[]  });
    await restaurant.save();

    const token = jwtUtils.generateToken(restaurant._id, restaurant.userType);

    res.status(200).json({ message: 'Restaurant registered successfully',user:restaurant, token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register restaurant' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const restaurant = await Restaurant.findOne({ email });

    if (!user && !restaurant) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, restaurant.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const userType = user ? user.userType : restaurant.userType;
    const userId = user ? user._id : restaurant._id;

    const loggedInUser = user ? user : restaurant
    const token = jwtUtils.generateToken(userId, userType);

    res.status(200).json({ message: 'Login successful',user:loggedInUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login' });
  }
};
