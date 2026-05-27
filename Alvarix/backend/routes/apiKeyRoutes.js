const express = require('express')
const router = express.Router()

const ApiKey = require('../models/apiKey')
const { generateApiKey, getCreditsByPlan } = require('../services/apikeygenerator')
const { hashApiKey } = require('../services/hashservice')
const verifyToken = require('../middleware/verifytoken')

// 🚀 GENERATE API KEY (FINAL VERSION)
router.post('/generate', verifyToken, async (req, res) => {
  try {

    // 🔥 AMBIL USER ID DARI JWT
    const userId =
      req.user.id ||
      req.user.userId ||
      req.user._id

    // ❌ jika user tidak ada
    if (!userId) {
      return res.status(401).json({
        error: 'User not found'
      })
    }

    // 📦 request body
    const plan = req.body.plan || 'free'
    const type = req.body.type || 'live'

    // 🔒 validasi plan
    const validPlans = ['free', 'pro', 'enterprise']

    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        error: 'Invalid plan'
      })
    }

    // 🔑 generate api key
    const apiKey = generateApiKey(type)

    // 🔒 hash api key
    const hashedKey = hashApiKey(apiKey)

    // 💰 credits berdasarkan plan
    const credits = getCreditsByPlan(plan)

    // 💾 simpan ke database
    const newKey = new ApiKey({
      key: hashedKey,
      userId,
      plan,
      credits
    })

    await newKey.save()

    // ✅ response
    return res.json({
      message: 'API key generated successfully',
      apiKey
    })

  } catch (err) {

    console.error('API KEY ERROR:', err)

    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

module.exports = router