const mongoose = require('mongoose')

const apilogSchema = new mongoose.Schema({

  apikey: {
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
  }

}, {

  timestamps: true

})

module.exports = mongoose.model('apilog', apilogSchema)
