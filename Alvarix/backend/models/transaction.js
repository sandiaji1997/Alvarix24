const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: String,
  apikey: String,

  amount: Number,
  location: String,
  device: String,
  context: String,

  riskScore: Number,
  riskLevel: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('transaction', transactionSchema);
