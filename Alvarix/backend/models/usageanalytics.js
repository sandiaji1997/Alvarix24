const mongoose = require('mongoose')

const usageanalyticsSchema = new mongoose.Schema({
  apikey: {
    type: String,
    required: true,
    index: true
  },

  userId: {
    type: String
  },

  plan: {
    type: String,
    default: 'free'
  },

  endpoint: {
    type: String,
    required: true
  },

  method: {
    type: String,
    required: true
  },

  statusCode: {
    type: Number
  },

  requestId: {
    type: String
  },

  responseTimeMs: {
    type: Number
  },

  riskScore: {
    type: Number
  },

  riskLevel: {
    type: String
  },

  confidence: {
    type: Number
  },

  threatTags: [{
    type: String
  }],

  context: {
    type: String
  },

  ip: {
    type: String
  },

  userAgent: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('usageanalytics', usageanalyticsSchema)
