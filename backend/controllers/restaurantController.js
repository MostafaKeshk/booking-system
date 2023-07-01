const Restaurant = require('../models/restaurant');

exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve restaurant' });
  }
};

exports.getAllRestaurants = async (req, res) => {
    try {
      const { searchValue, pageNumber, pageSize } = req.query;
  
      // Prepare searchValue query
      const query = searchValue ? { name: { $regex: searchValue, $options: 'i' } } : {};
  
      // Convert page and limit to numbers (with default values)
      const page = parseInt(pageNumber) || 1;
      const limit = parseInt(pageSize) || 10;
  
      // Calculate skip value based on page and limit
      const skip = (page - 1) * limit;
  
      // Fetch restaurants based on search query and pagination
      const rows = await Restaurant.find(query)
        .skip(skip)
        .limit(limit);
  
      // Count total number of restaurants matching the search query
      const count = await Restaurant.countDocuments(query);
  
      res.status(200).json({ rows, count });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve restaurants' });
    }
  };

  exports.getStatistics = async (req, res) => {
    try {
      const { restaurantId } = req.params;
  
      const data = {
        doneChartData: [100,120,140,120,160,170,200,250,220,200,180,140,120],
        canceledChartData: [200,180,160,130,100,90,70,50,100,80,40,0],
        starsChartData: [50,70,20,10,5],
        doneReservations: 100,
        acceptedReservations: 4,
        pendingReservations: 3,
        canceledReservations: 10,
      }
  
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve restaurants' });
    }
  };

  
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, password,address } = req.body;
    const image = req.file ? req.file.cloudinaryUrl :"";

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(id);

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Update restaurant data
    restaurant.name = name;
    restaurant.email = email;
    restaurant.phoneNumber = phoneNumber;
    restaurant.address = address;

    
    if(image){
      restaurant.image = image;
    }

    if(password){
      const hashedPassword = await bcrypt.hash(password, 10);
      restaurant.password = hashedPassword;
    }

    await restaurant.save();

    res.status(200).json({ message: 'Restaurant data updated successfully', restaurant });
  } catch (error) {
      console.log({error})
    res.status(500).json({ message: 'Failed to update user data' });
  }
};


exports.createRestaurant = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, address } = req.body;
    const image = req.file ? req.file.cloudinaryUrl :"";

    // Check if the restaurant already exists
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({ message : 'Restaurant already exists' });
    }     

    // Create a new restaurant
    const restaurant = new Restaurant({ name, email, phoneNumber, password,image, address,userType:'restaurant' });
    await restaurant.save();

    res.status(201).json({ message: 'Restaurant created successfully', restaurant });
  } catch (error) {
    console.log({error})
    res.status(500).json({ message : 'Failed to create restaurant' });
  }
};


exports.deleteRestaurants = async (req, res) => {
  const { ids } = req.body;

  try {
    const deleteResult = await Restaurant.deleteMany({ _id: { $in: ids } });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "Restaurants not found" });
    }

    return res.json({ message: "Restaurants deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete restaurants' });
  }
};
