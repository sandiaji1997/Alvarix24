const express = require('express')
const router = express.Router()

const apikey = require('../models/apikey')
const { generateapikey, getCreditsByPlan } = require('../services/apikeygenerator')
const { hashapikey } = require('../services/hashservice')
const verifytoken = require('../middleware/verifytoken')

// 🚀 GENERATE API KEY (FINAL VERSION)
router.post('/generate', verifytoken, async (req, res) => {
  try {

    // 🔥 AMBIL user ID DARI JWT
    const userId =
      req.user.id ||
      req.user.userId ||
      req.user._id

    // ❌ jika user tidak ada
    if (!userId) {
      return res.status(401).json({
        error: 'user not found'
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
    const apikey = generateapikey(type)

    // 🔒 hash api key
    const hashedKey = hashapikey(apikey)

    // 💰 credits berdasarkan plan
    const credits = getCreditsByPlan(plan)

    // 💾 simpan ke database
    const newKey = new apikey({
      key: hashedKey,
      userId,
      plan,
      credits
    })

    await newKey.save()

    // ✅ response
    return res.json({
      message: 'API key generated successfully',
      apikey
    })

  } catch (err) {

    console.error('API KEY ERROR:', err)

    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

module.exports = router
