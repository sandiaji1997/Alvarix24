const express = require('express')
const router = express.Router()

const Transaction = require('../models/Transaction')
const verifyApiKey = require('../middleware/verifyApiKey')

// 🚀 DASHBOARD (PER API KEY)
router.get('/dashboard', verifyApiKey, async (req, res) => {
  try {
    const apiKeyData = req.apiKey

    // 📊 TOTAL TRANSACTION
    const total = await Transaction.countDocuments({
      apiKey: apiKeyData.key
    })

    // 🔥 HIGH RISK
    const highRisk = await Transaction.countDocuments({
      apiKey: apiKeyData.key,
      riskScore: { $gte: 70 }
    })

    // ⚠️ MEDIUM RISK
    const mediumRisk = await Transaction.countDocuments({
      apiKey: apiKeyData.key,
      riskScore: { $gte: 40, $lt: 70 }
    })

    // ✅ LOW RISK
    const lowRisk = await Transaction.countDocuments({
      apiKey: apiKeyData.key,
      riskScore: { $lt: 40 }
    })

    // 📈 PERCENTAGE (biar dashboard terasa "AI")
    const safeTotal = total === 0 ? 1 : total

    const summary = {
      total,
      highRisk,
      mediumRisk,
      lowRisk,
      highRiskPercent: ((highRisk / safeTotal) * 100).toFixed(1),
      mediumRiskPercent: ((mediumRisk / safeTotal) * 100).toFixed(1),
      lowRiskPercent: ((lowRisk / safeTotal) * 100).toFixed(1)
    }

    // 🕒 RECENT TRANSACTIONS (SAFE & CLEAN)
    const recent = await Transaction.find({
      apiKey: apiKeyData.key
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('amount location device riskScore riskLevel createdAt') // 🔥 HANYA FIELD PENTING

    // 🎯 FINAL RESPONSE
    return res.json({
      success: true,
      data: {
        credits: apiKeyData.credits,
        usage: apiKeyData.usage,
        plan: apiKeyData.plan,
        summary,
        recent_transactions: recent
      }
    })

  } catch (err) {
    console.error('DASHBOARD ERROR:', err)

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    })
  }
})

module.exports = router