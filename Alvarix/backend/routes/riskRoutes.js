const express = require('express')
const router = express.Router()

const verifyApiKey = require('../middleware/verifyApiKey')
const riskEngine = require('../services/riskEngine')
const Transaction = require('../models/Transaction')


// 🚀 FINAL RISK SCORE ENDPOINT
router.post('/risk-score', verifyApiKey, async (req, res) => {

  try {

    const {
      user_id,
      amount,
      location,
      device,
      context
    } = req.body


    // ✅ validasi wajib
    if (!user_id || !amount || !context) {

      return res.status(400).json({
        error: 'Missing required fields',
        required: ['user_id', 'amount', 'context']
      })

    }


    // ✅ ambil data api key dari middleware
    const apiKeyData = req.apiKeyData


    // 🧠 jalankan AI risk engine
    const result = await Promise.resolve(

      riskEngine({
        user_id,
        amount,
        location,
        device,
        context
      })

    )


    // 💾 simpan transaction
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


    // ✅ response final API
    return res.status(200).json({

      success: true,

      risk_score: result.score,

      risk_level: result.level,

      reasons: result.reasons,

      decision: result.decision || 'REVIEW',

      remaining_credits: apiKeyData.credits

    })

  } catch (err) {

    console.error('RISK SCORE ERROR:', err)

    return res.status(500).json({

      error: 'Internal Server Error'

    })

  }

})

module.exports = router