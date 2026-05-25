const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: String,
  apiKey: String,

  amount: Number,
  location: String,
  device: String,

  riskScore: Number,
  riskLevel: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);