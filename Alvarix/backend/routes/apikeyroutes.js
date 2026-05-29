const express = require('express')

const apikey = require('../models/apikey')
const verifytoken = require('../middleware/verifytoken')
const { validateBody } = require('../middleware/validate')
const {
  generateapikey,
  getCreditsByPlan
} = require('../services/keyservice')
const { hashapikey } = require('../services/hashservice')
const verifyapikey = require('../middleware/verifyapikey')
const usageanalytics = require('../models/usageanalytics')

const router = express.Router()

router.post('/generate', verifytoken, validateBody({
  enums: {
    plan: ['free', 'basic', 'pro', 'enterprise']
  }
}), async (req, res, next) => {
  try {
    const userId =
      req.user.id ||
      req.user.userId ||
      req.user._id

    if (!userId) {
      return res.status(401).json({
        error: 'User not found'
      })
    }

    const plan = req.body.plan || 'free'
    const type = req.body.type || 'live'
    const rawApiKey = generateapikey(type)
    const hashedKey = hashapikey(rawApiKey)
    const credits = getCreditsByPlan(plan)

    const newKey = new apikey({
      key: hashedKey,
      userId,
      plan,
      credits,
      monthlyQuota: credits,
      usage: 0
    })

    await newKey.save()

    return res.status(201).json({
      success: true,
      message: 'API key generated successfully',
      apiKey: rawApiKey,
      plan,
      credits
    })
  } catch (err) {
    return next(err)
  }
})

router.get('/stats', verifyapikey, async (req, res, next) => {
  try {
    const apikeyData = req.apikeyData
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const [dailyUsage, riskLevels, topThreats] = await Promise.all([
      usageanalytics.aggregate([
        { $match: { apikey: apikeyData.key, createdAt: { $gte: since } } },
        { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          requests: { $sum: 1 },
          avgRiskScore: { $avg: '$riskScore' }
        } },
        { $sort: { _id: 1 } }
      ]),
      usageanalytics.aggregate([
        { $match: { apikey: apikeyData.key, createdAt: { $gte: since } } },
        { $group: { _id: '$riskLevel', count: { $sum: 1 } } }
      ]),
      usageanalytics.aggregate([
        { $match: { apikey: apikeyData.key, createdAt: { $gte: since } } },
        { $unwind: '$threatTags' },
        { $group: { _id: '$threatTags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ])

    return res.json({
      success: true,
      plan: apikeyData.plan,
      remainingCredits: apikeyData.credits,
      monthlyQuota: apikeyData.monthlyQuota,
      used: apikeyData.usage,
      lastUsedAt: apikeyData.lastUsedAt,
      dailyUsage,
      riskLevels,
      topThreats
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
