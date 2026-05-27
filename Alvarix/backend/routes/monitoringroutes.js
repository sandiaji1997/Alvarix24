const express = require('express')
const router = express.Router()

const transaction = require('../models/transaction')
const verifyapikey = require('../middleware/verifyapikey')

// 🚀 DASHBOARD (PER API KEY)
router.get('/dashboard', verifyapikey, async (req, res) => {
  try {
    const apikeyData = req.apikey

    // 📊 TOTAL transaction
    const total = await transaction.countDocuments({
      apikey: apikeyData.key
    })

    // 🔥 HIGH RISK
    const highRisk = await transaction.countDocuments({
      apikey: apikeyData.key,
      riskScore: { $gte: 70 }
    })

    // ⚠️ MEDIUM RISK
    const mediumRisk = await transaction.countDocuments({
      apikey: apikeyData.key,
      riskScore: { $gte: 40, $lt: 70 }
    })

    // ✅ LOW RISK
    const lowRisk = await transaction.countDocuments({
      apikey: apikeyData.key,
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

    // 🕒 RECENT transactionS (SAFE & CLEAN)
    const recent = await transaction.find({
      apikey: apikeyData.key
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('amount location device riskScore riskLevel createdAt') // 🔥 HANYA FIELD PENTING

    // 🎯 FINAL RESPONSE
    return res.json({
      success: true,
      data: {
        credits: apikeyData.credits,
        usage: apikeyData.usage,
        plan: apikeyData.plan,
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
