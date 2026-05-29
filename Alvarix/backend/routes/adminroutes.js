const express = require('express')

const requireadmin = require('../middleware/requireadmin')
const usageanalytics = require('../models/usageanalytics')
const apikey = require('../models/apikey')
const user = require('../models/user')
const apilog = require('../models/apilog')

const router = express.Router()

router.use(requireadmin)

function getPagination(req) {
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25))
  return {
    page,
    limit,
    skip: (page - 1) * limit
  }
}

function getDateFilter(req) {
  const filter = {}

  if (req.query.from || req.query.to) {
    filter.createdAt = {}
    if (req.query.from) filter.createdAt.$gte = new Date(req.query.from)
    if (req.query.to) filter.createdAt.$lte = new Date(req.query.to)
  }

  return filter
}

router.get('/analytics', async (req, res, next) => {
  try {
    const match = getDateFilter(req)
    const [usageByDay, riskDistribution, topThreats] = await Promise.all([
      usageanalytics.aggregate([
        { $match: match },
        { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          requests: { $sum: 1 },
          avgRiskScore: { $avg: '$riskScore' }
        } },
        { $sort: { _id: 1 } }
      ]),
      usageanalytics.aggregate([
        { $match: match },
        { $group: { _id: '$riskLevel', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      usageanalytics.aggregate([
        { $match: match },
        { $unwind: '$threatTags' },
        { $group: { _id: '$threatTags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 }
      ])
    ])

    return res.json({
      success: true,
      usageByDay,
      riskDistribution,
      topThreats
    })
  } catch (err) {
    return next(err)
  }
})

router.get('/usage', async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req)
    const filter = {
      ...getDateFilter(req)
    }

    if (req.query.plan) filter.plan = req.query.plan
    if (req.query.context) filter.context = req.query.context
    if (req.query.riskLevel) filter.riskLevel = req.query.riskLevel

    const [items, total] = await Promise.all([
      usageanalytics.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      usageanalytics.countDocuments(filter)
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

router.get('/threats', async (req, res, next) => {
  try {
    const match = getDateFilter(req)
    const threats = await usageanalytics.aggregate([
      { $match: match },
      { $unwind: '$threatTags' },
      { $group: {
        _id: '$threatTags',
        count: { $sum: 1 },
        avgRiskScore: { $avg: '$riskScore' },
        latestSeenAt: { $max: '$createdAt' }
      } },
      { $sort: { count: -1 } }
    ])

    return res.json({
      success: true,
      threats
    })
  } catch (err) {
    return next(err)
  }
})

router.get('/users', async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req)
    const [items, total] = await Promise.all([
      user.find().select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      user.countDocuments()
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

router.get('/keys', async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req)
    const filter = {}

    if (req.query.plan) filter.plan = req.query.plan
    if (req.query.status) filter.status = req.query.status

    const [items, total] = await Promise.all([
      apikey.find(filter).select('-key').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      apikey.countDocuments(filter)
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

router.get('/risk', async (req, res, next) => {
  try {
    const filter = getDateFilter(req)
    const summary = await apilog.aggregate([
      { $match: filter },
      { $group: {
        _id: '$riskLevel',
        count: { $sum: 1 },
        avgRiskScore: { $avg: '$riskScore' }
      } },
      { $sort: { count: -1 } }
    ])

    return res.json({
      success: true,
      summary
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
