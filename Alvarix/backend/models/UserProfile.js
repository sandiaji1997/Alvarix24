const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  email: String,
  devices: [String],
  locations: [String],
  lastLogin: Date
});

module.exports = mongoose.model("UserProfile", userProfileSchema);