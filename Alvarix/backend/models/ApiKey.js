const mongoose = require('mongoose')

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },

  userId: {
    type: String,
    required: true
  },

  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },

  credits: {
    type: Number,
    default: 100 // default free plan
  },

  usage: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active'
  },

  lastUsedAt: {
    type: Date
  }

}, { timestamps: true })

module.exports = mongoose.model('ApiKey', apiKeySchema)