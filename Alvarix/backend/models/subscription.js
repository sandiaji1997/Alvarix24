const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true
  },

  plan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise'],
    required: true
  },

  status: {
    type: String,
    enum: ['trialing', 'active', 'past_due', 'cancelled', 'paused'],
    default: 'active'
  },

  billingProvider: {
    type: String,
    enum: ['manual', 'midtrans', 'stripe'],
    default: 'manual'
  },

  billingMode: {
    type: String,
    enum: ['subscription', 'usage_based', 'hybrid'],
    default: 'subscription'
  },

  amount: {
    type: Number,
    default: 0
  },

  currency: {
    type: String,
    default: 'IDR'
  },

  currentPeriodStart: Date,
  currentPeriodEnd: Date,
  cancelAt: Date,
  externalCustomerId: String,
  externalSubscriptionId: String,
  latestInvoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'invoice'
  },
  metadata: Object
}, {
  timestamps: true
})

module.exports = mongoose.model('subscription', subscriptionSchema)
