const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes.js');
const userRoutes = require('../routes/userRoutes.js');
const restaurantRoutes = require('../routes/restaurantRoutes.js');
const reservationRoutes = require('../routes/reservationRoutes.js');
const reviewRoutes = require('../routes/reviewRoutes.js');
const authentication = require('../middleware/authentication.js');
const { connectToDB } = require("../utils/connectToDB.js");
const { upload } = require("../middleware/upload.js");

require("dotenv").config();

const cors = require('cors');

const app = express();

const PORT = process.env.PORT 



app.use(cors());

connectToDB();

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.send(`Hello!`);
});


app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', upload, authRoutes);
app.use('/api/users', upload,authentication, userRoutes);
app.use('/api/restaurants', upload,authentication, restaurantRoutes);
app.use('/api/reservations',authentication, reservationRoutes);
app.use('/api/reviews',authentication, reviewRoutes);


app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});