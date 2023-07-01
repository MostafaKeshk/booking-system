const mongoose = require('mongoose');

require("dotenv").config();

exports.connectToDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};
