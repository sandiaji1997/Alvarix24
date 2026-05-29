const mongoose = require('mongoose')

const revenuetrackingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },

  provider: {
    type: String,
    enum: ['manual', 'midtrans', 'stripe'],
    default: 'manual'
  },

  plan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise']
  },

  subscriptionRevenue: {
    type: Number,
    default: 0
  },

  usageRevenue: {
    type: Number,
    default: 0
  },

  totalRevenue: {
    type: Number,
    default: 0
  },

  currency: {
    type: String,
    default: 'IDR'
  },

  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'invoice'
  },

  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'paymenthistory'
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('revenuetracking', revenuetrackingSchema)
