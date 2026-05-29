const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true
  },

  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subscription'
  },

  provider: {
    type: String,
    enum: ['manual', 'midtrans', 'stripe'],
    default: 'manual'
  },

  status: {
    type: String,
    enum: ['draft', 'open', 'paid', 'void', 'uncollectible'],
    default: 'draft'
  },

  subtotal: {
    type: Number,
    default: 0
  },

  usageAmount: {
    type: Number,
    default: 0
  },

  total: {
    type: Number,
    default: 0
  },

  currency: {
    type: String,
    default: 'IDR'
  },

  dueAt: Date,
  paidAt: Date,
  externalInvoiceId: String,
  invoiceNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentUrl: String,
  plan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise']
  },
  metadata: Object
}, {
  timestamps: true
})

module.exports = mongoose.model('invoice', invoiceSchema)
