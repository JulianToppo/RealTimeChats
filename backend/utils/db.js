const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("MongoDB connected ");
  } catch (err) {
    console.log("DB connection error", err);
    process.exit(1);
  }
};

module.exports = connectDB;