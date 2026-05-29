const subscription = require('../models/subscription')
const invoice = require('../models/invoice')
const paymenthistory = require('../models/paymenthistory')
const revenuetracking = require('../models/revenuetracking')
const apikey = require('../models/apikey')
const { getCreditsByPlan } = require('./planconfig')
const stripeprovider = require('./stripeprovider')
const midtransprovider = require('./midtransprovider')

const PLAN_PRICING_IDR = {
  free: 0,
  basic: 250000,
  pro: 1200000,
  enterprise: 5000000
}

function estimatePlanRevenue(plan, count) {
  return (PLAN_PRICING_IDR[plan] || 0) * count
}

function getPlanPrice(plan) {
  return PLAN_PRICING_IDR[plan] || 0
}

function nextPeriodEnd(from = new Date()) {
  const date = new Date(from)
  date.setUTCMonth(date.getUTCMonth() + 1)
  return date
}

function createInvoiceNumber() {
  return `ALV-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

async function generateInvoice({ userId, subscriptionId, provider, plan, usageAmount = 0 }) {
  const subtotal = getPlanPrice(plan)
  const total = subtotal + usageAmount

  return invoice.create({
    userId,
    subscriptionId,
    provider,
    status: total === 0 ? 'paid' : 'open',
    subtotal,
    usageAmount,
    total,
    currency: 'IDR',
    plan,
    dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    paidAt: total === 0 ? new Date() : undefined,
    invoiceNumber: createInvoiceNumber()
  })
}

async function applyPlanToApiKeys(userId, plan) {
  const credits = getCreditsByPlan(plan)

  await apikey.updateMany(
    { userId },
    {
      $set: {
        plan,
        monthlyQuota: credits,
        credits,
        usage: 0,
        quotaPeriodStart: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
      }
    }
  )
}

async function createOrUpdateSubscription({ userId, plan, provider = 'manual', billingMode = 'subscription' }) {
  const now = new Date()
  const amount = getPlanPrice(plan)
  const existing = await subscription.findOne({ userId, status: { $in: ['trialing', 'active', 'past_due', 'paused'] } })
  const payload = {
    plan,
    status: amount === 0 ? 'active' : 'past_due',
    billingProvider: provider,
    billingMode,
    amount,
    currency: 'IDR',
    currentPeriodStart: now,
    currentPeriodEnd: nextPeriodEnd(now)
  }

  const sub = existing
    ? await subscription.findByIdAndUpdate(existing._id, payload, { new: true })
    : await subscription.create({ userId, ...payload })

  const inv = await generateInvoice({
    userId,
    subscriptionId: sub._id,
    provider,
    plan
  })

  sub.latestInvoiceId = inv._id
  await sub.save()

  if (inv.status === 'paid') {
    await applyPlanToApiKeys(userId, plan)
    await trackRevenue({ invoiceDoc: inv, userId, plan, provider })
  }

  return { subscription: sub, invoice: inv }
}

async function attachProviderPayment({ provider, user, invoiceDoc, successUrl, cancelUrl }) {
  if (invoiceDoc.total <= 0) {
    return {
      provider,
      status: 'not_required'
    }
  }

  if (provider === 'stripe') {
    const session = await stripeprovider.createCheckoutSession({
      user,
      invoice: invoiceDoc,
      successUrl,
      cancelUrl
    })

    invoiceDoc.externalInvoiceId = session.id
    invoiceDoc.paymentUrl = session.url
    invoiceDoc.metadata = { stripeSessionId: session.id }
    await invoiceDoc.save()

    return {
      provider,
      checkoutId: session.id,
      paymentUrl: session.url
    }
  }

  if (provider === 'midtrans') {
    const transaction = await midtransprovider.createSnapTransaction({
      user,
      invoice: invoiceDoc
    })

    invoiceDoc.externalInvoiceId = transaction.token
    invoiceDoc.paymentUrl = transaction.redirect_url
    invoiceDoc.metadata = { midtransToken: transaction.token }
    await invoiceDoc.save()

    return {
      provider,
      checkoutId: transaction.token,
      paymentUrl: transaction.redirect_url
    }
  }

  return {
    provider: 'manual',
    status: 'invoice_created'
  }
}

async function activatePaidInvoice({ invoiceDoc, provider, externalPaymentId, metadata = {} }) {
  if (invoiceDoc.status === 'paid') return invoiceDoc

  invoiceDoc.status = 'paid'
  invoiceDoc.paidAt = new Date()
  await invoiceDoc.save()

  const payment = await paymenthistory.create({
    userId: invoiceDoc.userId,
    invoiceId: invoiceDoc._id,
    provider,
    status: 'succeeded',
    amount: invoiceDoc.total,
    currency: invoiceDoc.currency,
    externalPaymentId,
    paidAt: new Date(),
    metadata
  })

  const sub = await subscription.findById(invoiceDoc.subscriptionId)

  if (sub) {
    sub.status = 'active'
    sub.plan = invoiceDoc.plan || sub.plan
    sub.billingProvider = provider
    sub.currentPeriodStart = new Date()
    sub.currentPeriodEnd = nextPeriodEnd()
    await sub.save()
    await applyPlanToApiKeys(sub.userId, sub.plan)
  }

  await trackRevenue({
    invoiceDoc,
    paymentDoc: payment,
    userId: invoiceDoc.userId,
    plan: invoiceDoc.plan,
    provider
  })

  return invoiceDoc
}

async function verifyPayment({ provider, reference }) {
  if (provider === 'stripe') {
    const session = await stripeprovider.retrieveCheckoutSession(reference)
    const invoiceDoc = await invoice.findOne({ externalInvoiceId: session.id })

    if (!invoiceDoc) {
      const err = new Error('Invoice not found for Stripe reference')
      err.status = 404
      throw err
    }

    if (session.payment_status === 'paid') {
      await activatePaidInvoice({
        invoiceDoc,
        provider,
        externalPaymentId: session.payment_intent || session.id,
        metadata: session
      })
    }

    return { invoice: invoiceDoc, providerResponse: session }
  }

  if (provider === 'midtrans') {
    const status = await midtransprovider.verifyTransaction(reference)
    const invoiceDoc = await invoice.findOne({ invoiceNumber: status.order_id || reference })

    if (!invoiceDoc) {
      const err = new Error('Invoice not found for Midtrans reference')
      err.status = 404
      throw err
    }

    if (['capture', 'settlement'].includes(status.transaction_status)) {
      await activatePaidInvoice({
        invoiceDoc,
        provider,
        externalPaymentId: status.transaction_id,
        metadata: status
      })
    }

    return { invoice: invoiceDoc, providerResponse: status }
  }

  const err = new Error('Unsupported billing provider')
  err.status = 400
  throw err
}

async function trackRevenue({ invoiceDoc, paymentDoc, userId, plan, provider }) {
  return revenuetracking.create({
    date: new Date(),
    provider,
    plan,
    subscriptionRevenue: invoiceDoc.subtotal,
    usageRevenue: invoiceDoc.usageAmount,
    totalRevenue: invoiceDoc.total,
    currency: invoiceDoc.currency,
    invoiceId: invoiceDoc._id,
    paymentId: paymentDoc ? paymentDoc._id : undefined,
    userId
  })
}

async function getFounderProfitMetrics() {
  const monthStart = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
  const rows = await revenuetracking.aggregate([
    { $match: { date: { $gte: monthStart } } },
    { $group: {
      _id: null,
      subscriptionRevenue: { $sum: '$subscriptionRevenue' },
      usageRevenue: { $sum: '$usageRevenue' },
      totalRevenue: { $sum: '$totalRevenue' }
    } }
  ])
  const revenue = rows[0] || {
    subscriptionRevenue: 0,
    usageRevenue: 0,
    totalRevenue: 0
  }
  const estimatedInfraCost = Number(process.env.ESTIMATED_INFRA_COST_IDR) || 1700000

  return {
    ...revenue,
    estimatedInfraCost,
    estimatedProfit: revenue.totalRevenue - estimatedInfraCost
  }
}

module.exports = {
  PLAN_PRICING_IDR,
  estimatePlanRevenue,
  getPlanPrice,
  generateInvoice,
  createOrUpdateSubscription,
  attachProviderPayment,
  activatePaidInvoice,
  verifyPayment,
  trackRevenue,
  getFounderProfitMetrics
}
