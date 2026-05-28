const express = require('express')

const apikey = require('../models/apikey')
const verifytoken = require('../middleware/verifytoken')
const {
  generateapikey,
  getCreditsByPlan
} = require('../services/keyservice')
const { hashapikey } = require('../services/hashservice')

const router = express.Router()

router.post('/generate', verifytoken, async (req, res) => {
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
    const validPlans = ['free', 'basic', 'pro', 'enterprise']

    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        error: 'Invalid plan'
      })
    }

    const rawApiKey = generateapikey(type)
    const hashedKey = hashapikey(rawApiKey)
    const credits = getCreditsByPlan(plan)

    const newKey = new apikey({
      key: hashedKey,
      userId,
      plan,
      credits,
      usage: 0
    })

    await newKey.save()

    return res.status(201).json({
      message: 'API key generated successfully',
      apiKey: rawApiKey,
      plan,
      credits
    })
  } catch (err) {
    console.error('API KEY ERROR:', err)

    return res.status(500).json({
      error: 'Internal Server Error'
    })
  }
})

module.exports = router
