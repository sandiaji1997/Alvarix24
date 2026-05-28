const mongoose = require('mongoose')

const apikeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  plan: {
    type: String,
    default: 'free'
  },

  credits: {
    type: Number,
    default: 100
  },

  usage: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('apikey', apikeySchema)
