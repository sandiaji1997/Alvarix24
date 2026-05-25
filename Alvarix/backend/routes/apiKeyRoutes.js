const express = require('express')
const router = express.Router()

const ApiKey = require('../models/ApiKey')
const { generateApiKey, getCreditsByPlan } = require('../services/apiKeyGenerator')
const { hashApiKey } = require('../services/hashService')
const verifyToken = require('../middleware/verifyToken')

// 🚀 GENERATE API KEY (FINAL VERSION)
router.post('/generate', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id
    const plan = req.body.plan || 'free'
    const type = req.body.type || 'live'

    // 🔒 VALIDASI PLAN
    const validPlans = ['free', 'pro', 'enterprise']
    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        error: 'Invalid plan'
      })
    }

    // 🔑 GENERATE API KEY
    const apiKey = generateApiKey(type)

    // 🔐 HASH API KEY (disimpan di DB)
    const hashedKey = hashApiKey(apiKey)

    // 💰 GET CREDITS DARI SERVICE (JANGAN HARDCODE)
    const credits = getCreditsByPlan(plan)

    // 💾 SIMPAN KE DATABASE
    const newKey = new ApiKey({
      key: hashedKey,
      userId,
      plan,
      credits
    })

    await newKey.save()

    // 🎯 RESPONSE (RAW KEY HANYA SEKALI)
    return res.json({
      message: 'API key generated successfully',
      apiKey // ⚠️ hanya tampil sekali
    })

  } catch (err) {
    console.error('API KEY ERROR:', err)

    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

module.exports = router