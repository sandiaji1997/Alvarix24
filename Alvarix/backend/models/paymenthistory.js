const mongoose = require('mongoose')

const paymenthistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true
  },

  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'invoice'
  },

  provider: {
    type: String,
    enum: ['manual', 'midtrans', 'stripe'],
    default: 'manual'
  },

  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'refunded'],
    default: 'pending'
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: 'IDR'
  },

  externalPaymentId: String,
  externalSubscriptionId: String,
  paidAt: Date,
  metadata: Object
}, {
  timestamps: true
})

module.exports = mongoose.model('paymenthistory', paymenthistorySchema)
