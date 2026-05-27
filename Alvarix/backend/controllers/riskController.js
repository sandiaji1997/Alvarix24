const riskengine = require('../services/riskengine')
const transaction = require('../models/transaction')

const riskScore = async (req, res) => {
  try {
    const { user_id, amount, location, device, context } = req.body

    // 🔒 VALIDASI
    if (!user_id || !amount || !context) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["user_id", "amount", "context"]
      })
    }

    const apikeyData = req.apikey

    // 🧠 HITUNG RISK
    const result = riskengine({
      user_id,
      amount,
      location,
      device,
      context
    })

    // 💰 USAGE TRACKING (PINDAH KE SINI - BENAR)
    apikeyData.usage += 1
    apikeyData.credits -= 1
    await apikeyData.save()

    // 💾 SIMPAN transaction
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

    // 🎯 RESPONSE FINAL
    return res.status(200).json({
      risk_score: result.score,
      risk_level: result.level,
      reasons: result.reasons,
      decision: result.decision || "REVIEW"
    })

  } catch (err) {
    console.error('RISK CONTROLLER ERROR:', err)

    return res.status(500).json({
      error: "Internal Server Error"
    })
  }
}

module.exports = { riskScore }
