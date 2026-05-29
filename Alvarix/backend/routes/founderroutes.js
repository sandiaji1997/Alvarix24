const express = require('express')

const requireadmin = require('../middleware/requireadmin')
const user = require('../models/user')
const apikey = require('../models/apikey')
const usageanalytics = require('../models/usageanalytics')
const subscription = require('../models/subscription')
const { estimatePlanRevenue, getFounderProfitMetrics } = require('../services/billingservice')

const router = express.Router()

router.use(requireadmin)

async function getPlanDistribution() {
  const rows = await apikey.aggregate([
    { $group: { _id: '$plan', count: { $sum: 1 } } }
  ])

  return rows.reduce((acc, row) => {
    acc[row._id || 'free'] = row.count
    return acc
  }, {
    free: 0,
    basic: 0,
    pro: 0,
    enterprise: 0
  })
}

async function buildFounderMetrics() {
  const [clients, plans, usageThisMonth, activeSubscriptions, paidRevenue] = await Promise.all([
    user.countDocuments(),
    getPlanDistribution(),
    usageanalytics.countDocuments({
      createdAt: {
        $gte: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
      }
    }),
    subscription.countDocuments({ status: 'active' }),
    getFounderProfitMetrics()
  ])

  const estimatedMRR =
    estimatePlanRevenue('basic', plans.basic) +
    estimatePlanRevenue('pro', plans.pro) +
    estimatePlanRevenue('enterprise', plans.enterprise)
  const estimatedInfraCost = Number(process.env.ESTIMATED_INFRA_COST_IDR) || 1700000

  return {
    clients,
    freeUsers: plans.free,
    basicUsers: plans.basic,
    proUsers: plans.pro,
    enterpriseUsers: plans.enterprise,
    activeSubscriptions,
    usageThisMonth,
    paidRevenue,
    estimatedMRR,
    estimatedInfraCost,
    estimatedProfit: estimatedMRR - estimatedInfraCost
  }
}

router.get('/revenue', async (req, res, next) => {
  try {
    const metrics = await buildFounderMetrics()

    return res.json({
      success: true,
      estimatedMRR: metrics.estimatedMRR,
      paidRevenue: metrics.paidRevenue,
      estimatedInfraCost: metrics.estimatedInfraCost,
      estimatedProfit: metrics.estimatedProfit
    })
  } catch (err) {
    return next(err)
  }
})

router.get('/clients', async (req, res, next) => {
  try {
    const metrics = await buildFounderMetrics()

    return res.json({
      success: true,
      clients: metrics.clients,
      freeUsers: metrics.freeUsers,
      basicUsers: metrics.basicUsers,
      proUsers: metrics.proUsers,
      enterpriseUsers: metrics.enterpriseUsers,
      activeSubscriptions: metrics.activeSubscriptions
    })
  } catch (err) {
    return next(err)
  }
})

router.get('/metrics', async (req, res, next) => {
  try {
    const metrics = await buildFounderMetrics()

    return res.json({
      success: true,
      ...metrics
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
