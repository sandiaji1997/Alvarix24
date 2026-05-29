const express = require('express')

const verifytoken = require('../middleware/verifytoken')
const { validateBody } = require('../middleware/validate')
const user = require('../models/user')
const invoice = require('../models/invoice')
const subscription = require('../models/subscription')
const {
  createOrUpdateSubscription,
  attachProviderPayment,
  verifyPayment,
  generateInvoice
} = require('../services/billingservice')

const router = express.Router()

router.use(verifytoken)

function getUserId(req) {
  return req.user.userId || req.user.id || req.user._id
}

async function getAuthenticatedUser(req) {
  const currentUser = await user.findById(getUserId(req))

  if (!currentUser) {
    const err = new Error('Authenticated user not found')
    err.status = 401
    throw err
  }

  return currentUser
}

async function handleSubscriptionChange(req, res, next) {
  try {
    const currentUser = await getAuthenticatedUser(req)
    const provider = req.body.provider || 'manual'
    const plan = req.body.plan

    const result = await createOrUpdateSubscription({
      userId: currentUser._id,
      plan,
      provider,
      billingMode: req.body.billingMode || 'subscription'
    })

    const payment = await attachProviderPayment({
      provider,
      user: currentUser,
      invoiceDoc: result.invoice,
      successUrl: req.body.successUrl,
      cancelUrl: req.body.cancelUrl
    })

    return res.status(201).json({
      success: true,
      subscription: result.subscription,
      invoice: result.invoice,
      payment
    })
  } catch (err) {
    return next(err)
  }
}

const subscriptionValidation = validateBody({
  required: ['plan'],
  enums: {
    plan: ['free', 'basic', 'pro', 'enterprise'],
    provider: ['manual', 'stripe', 'midtrans'],
    billingMode: ['subscription', 'usage_based', 'hybrid']
  }
})

router.post('/subscription/activate', subscriptionValidation, handleSubscriptionChange)
router.post('/subscription/upgrade', subscriptionValidation, handleSubscriptionChange)
router.post('/subscription/downgrade', subscriptionValidation, handleSubscriptionChange)

router.post('/invoices', validateBody({
  required: ['plan'],
  enums: {
    plan: ['free', 'basic', 'pro', 'enterprise'],
    provider: ['manual', 'stripe', 'midtrans']
  },
  numbers: ['usageAmount']
}), async (req, res, next) => {
  try {
    const currentUser = await getAuthenticatedUser(req)
    const activeSubscription = await subscription.findOne({
      userId: currentUser._id,
      status: { $in: ['trialing', 'active', 'past_due', 'paused'] }
    })
    const invoiceDoc = await generateInvoice({
      userId: currentUser._id,
      subscriptionId: activeSubscription ? activeSubscription._id : undefined,
      provider: req.body.provider || 'manual',
      plan: req.body.plan,
      usageAmount: Number(req.body.usageAmount || 0)
    })

    return res.status(201).json({
      success: true,
      invoice: invoiceDoc
    })
  } catch (err) {
    return next(err)
  }
})

router.get('/invoices', async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25))
    const currentUser = await getAuthenticatedUser(req)
    const [items, total] = await Promise.all([
      invoice.find({ userId: currentUser._id }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      invoice.countDocuments({ userId: currentUser._id })
    ])

    return res.json({
      success: true,
      page,
      limit,
      total,
      items
    })
  } catch (err) {
    return next(err)
  }
})

router.post('/payments/verify', validateBody({
  required: ['provider', 'reference'],
  enums: {
    provider: ['stripe', 'midtrans']
  }
}), async (req, res, next) => {
  try {
    const currentUser = await getAuthenticatedUser(req)
    const invoiceFilter = req.body.provider === 'stripe'
      ? { externalInvoiceId: req.body.reference }
      : { invoiceNumber: req.body.reference }
    const invoiceDoc = await invoice.findOne(invoiceFilter)

    if (!invoiceDoc) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found for payment reference'
      })
    }

    if (String(invoiceDoc.userId) !== String(currentUser._id)) {
      return res.status(403).json({
        success: false,
        error: 'Invoice does not belong to authenticated user'
      })
    }

    const result = await verifyPayment({
      provider: req.body.provider,
      reference: req.body.reference
    })

    return res.json({
      success: true,
      invoice: result.invoice,
      providerResponse: result.providerResponse
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
