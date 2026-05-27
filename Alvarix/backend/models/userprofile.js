const mongoose = require("mongoose");

const userprofileSchema = new mongoose.Schema({
  email: String,
  devices: [String],
  locations: [String],
  lastLogin: Date
});

module.exports = mongoose.model("userprofile", userprofileSchema);
