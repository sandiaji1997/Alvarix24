const mongoose = require('mongoose')

const apiLogSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  location: {
    type: String
  },

  device: {
    type: String
  },

  context: {
    type: String
  },

  riskScore: {
    type: Number
  },

  riskLevel: {
    type: String
  },

  decision: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('ApiLog', apiLogSchema)