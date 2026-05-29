const mongoose = require('mongoose')

const apikeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  plan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise'],
    default: 'free'
  },

  credits: {
    type: Number,
    default: 1000
  },

  monthlyQuota: {
    type: Number,
    default: 1000
  },

  usage: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ['active', 'paused', 'revoked'],
    default: 'active'
  },

  lastUsedAt: {
    type: Date
  },

  quotaPeriodStart: {
    type: Date,
    default: () => new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
  },

  suspendedUntil: {
    type: Date
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('apikey', apikeySchema)
