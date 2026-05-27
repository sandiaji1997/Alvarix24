const express = require('express')

const router = express.Router()

const verifyapikey = require('../middleware/verifyapikey')

const riskengine = require('../services/riskengine')

const transaction = require('../models/transaction')

const apilog = require('../models/apilog')



// 🚀 FINAL RISK SCORE ENDPOINT

router.post('/risk-score', verifyapikey, async (req, res) => {

  try {

    // 📥 ambil data body
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

        required: [

          'user_id',

          'amount',

          'context'

        ]

      })

    }



    // 🔑 ambil data API key dari middleware
    const apikeyData = req.apikeyData



    // 🧠 jalankan AI risk engine
    const result = await Promise.resolve(

      riskengine({

        user_id,

        amount,

        location,

        device,

        context

      })

    )



    // 💾 simpan transaction
    await transaction.create({

      userId: apikeyData.userId,

      apikey: apikeyData.key,

      amount,

      location,

      device,

      context,

      riskScore: result.score,

      riskLevel: result.level

    })



    // 💾 simpan API log
    await apilog.create({

      apikey: apikeyData.key,

      userId: user_id,

      amount,

      location,

      device,

      context,

      riskScore: result.score,

      riskLevel: result.level,

      decision: result.decision || 'REVIEW'

    })



    // ✅ response final API
    return res.status(200).json({

      success: true,

      risk_score: result.score,

      risk_level: result.level,

      reasons: result.reasons,

      decision: result.decision || 'REVIEW',

      remaining_credits: apikeyData.credits

    })



  } catch (err) {

    console.error('RISK SCORE ERROR:', err)



    return res.status(500).json({

      error: 'Internal Server Error'

    })

  }

})



module.exports = router
