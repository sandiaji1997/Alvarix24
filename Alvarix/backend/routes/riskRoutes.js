const express = require('express')
const router = express.Router()

const verifyApiKey = require('../middleware/verifyApiKey')
const riskEngine = require('../services/riskEngine')
const Transaction = require('../models/Transaction')

// 🚀 FINAL ENDPOINT (CLEAN VERSION)
router.post('/risk-score', verifyApiKey, async (req, res) => {
  try {
    const { user_id, amount, location, device, context } = req.body

    // 🔒 VALIDASI WAJIB
    if (!user_id || !amount || !context) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["user_id", "amount", "context"]
      })
    }

    const apiKeyData = req.apiKey

    // 🧠 HITUNG RISK (AMANKAN ASYNC)
    const result = await Promise.resolve(
      riskEngine({
        user_id,
        amount,
        location,
        device,
        context
      })
    )

    // 💾 SIMPAN TRANSACTION
    await Transaction.create({
      userId: apiKeyData.userId,
      apiKey: apiKeyData.key,

      amount,
      location,
      device,
      context,

      riskScore: result.score,
      riskLevel: result.level
    })

    // 🎯 RESPONSE FINAL (STANDARD API)
    return res.status(200).json({
      risk_score: result.score,
      risk_level: result.level,
      reasons: result.reasons,
      decision: result.decision || "REVIEW"
    })

  } catch (err) {
    console.error('RISK SCORE ERROR:', err)

    return res.status(500).json({
      error: "Internal Server Error"
    })
  }
})

module.exports = router