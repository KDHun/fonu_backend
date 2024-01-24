require("dotenv").config();
const mongoose = require("mongoose");

const databaseConnection = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log(err);
  }
};

module.exports = databaseConnection;
