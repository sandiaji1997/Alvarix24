const express = require('express')

const verifyapikey = require('../middleware/verifyapikey')
const planratelimit = require('../middleware/planratelimit')
const { validateBody } = require('../middleware/validate')
const { scoreRisk } = require('../services/riskintelligenceservice')
const { consumeCredit } = require('../services/meteringservice')
const { logUsage } = require('../services/usageservice')
const transaction = require('../models/transaction')
const apilog = require('../models/apilog')

const router = express.Router()

const riskScoreValidation = validateBody({
  required: ['user_id', 'context'],
  enums: {
    context: ['transaction', 'login', 'api']
  },
  numbers: ['amount', 'velocity24h', 'failedAttempts', 'requestRate', 'errorRate']
})

router.post('/risk-score', verifyapikey, planratelimit, riskScoreValidation, async (req, res, next) => {
  const startedAt = Date.now()

  try {
    const apikeyData = req.apikeyData
    const result = await scoreRisk(req.body, apikeyData)
    const usage = await consumeCredit(apikeyData)

    if (req.body.context === 'transaction') {
      await transaction.create({
        userId: apikeyData.userId,
        apikey: apikeyData.key,
        amount: req.body.amount,
        location: req.body.location,
        device: req.body.device,
        context: req.body.context,
        riskScore: result.riskScore,
        riskLevel: result.riskLevel
      })
    }

    await apilog.create({
      apikey: apikeyData.key,
      userId: req.body.user_id,
      amount: req.body.amount || 0,
      location: req.body.location,
      device: req.body.device,
      context: req.body.context,
      riskScore: result.riskScore,
      riskLevel: result.riskLevel,
      decision: result.decision
    })

    await logUsage({
      req,
      apikeyData,
      statusCode: 200,
      responseTimeMs: Date.now() - startedAt,
      riskResult: result
    })

    return res.status(200).json({
      success: true,
      requestId: req.requestId,
      context: result.context,
      riskScore: result.riskScore,
      riskLevel: result.riskLevel,
      confidence: result.confidence,
      threatTags: result.threatTags,
      reasons: result.reasons,
      decision: result.decision,
      remainingCredits: usage.remainingCredits,
      usage
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
