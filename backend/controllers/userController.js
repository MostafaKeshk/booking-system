const User = require('../models/user');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const { searchValue, pageNumber, pageSize } = req.query;

    // Prepare searchValue query
    const query = searchValue ? { name: { $regex: searchValue, $options: 'i' } } : {};

    // Convert page and limit to numbers (with default values)
    const page = parseInt(pageNumber) || 1;
    const limit = parseInt(pageSize) || 10;

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Fetch users based on search query and pagination
    const rows = await User.find(query)
      .skip(skip)
      .limit(limit);

    // Count total number of users matching the search query
    const count = await User.countDocuments(query);

    res.status(200).json({ rows, count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};



// Add other user-related controller functions as needed

exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber, password } = req.body;
      const image = req.file ? req.file.cloudinaryUrl :"";

      // Find the user by ID
      const user = await User.findById(id);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user data
      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      
      if(image){
        user.image = image;
      }

      if(password){
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      await user.save();
  
      res.status(200).json({ message: 'User data updated successfully', user });
    } catch (error) {
        console.log({error})
      res.status(500).json({ message: 'Failed to update user data' });
    }
  };


  

exports.createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const image = req.file ? req.file.cloudinaryUrl :"";

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message : 'User already exists' });
    }     

    // Create a new user
    const user = new User({ name, email, phoneNumber, password,image,userType:'user' });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log({error})
    res.status(500).json({ message : 'Failed to create user' });
  }
};


exports.deleteUsers = async (req, res) => {
  const { ids } = req.body;

  try {
    const deleteResult = await User.deleteMany({ _id: { $in: ids } });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "Restaurants not found" });
    }

    return res.json({ message: "Restaurants deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete restaurants' });
  }
};







  
