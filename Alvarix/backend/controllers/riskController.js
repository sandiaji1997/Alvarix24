const riskEngine = require('../services/riskEngine')
const Transaction = require('../models/Transaction')

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

    const apiKeyData = req.apiKey

    // 🧠 HITUNG RISK
    const result = riskEngine({
      user_id,
      amount,
      location,
      device,
      context
    })

    // 💰 USAGE TRACKING (PINDAH KE SINI - BENAR)
    apiKeyData.usage += 1
    apiKeyData.credits -= 1
    await apiKeyData.save()

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