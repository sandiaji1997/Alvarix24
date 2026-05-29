const riskengine = require('./riskengine')
const usageanalytics = require('../models/usageanalytics')

async function enrichRiskInput(payload, apikeyData) {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const [recentHighRiskEvents, previousCriticalEvents] = await Promise.all([
    usageanalytics.countDocuments({
      apikey: apikeyData.key,
      riskScore: { $gte: 70 },
      createdAt: { $gte: since }
    }),
    usageanalytics.countDocuments({
      apikey: apikeyData.key,
      riskLevel: 'CRITICAL'
    })
  ])

  return {
    ...payload,
    recentHighRiskEvents,
    previousCriticalEvents
  }
}

async function scoreRisk(payload, apikeyData) {
  const enrichedPayload = await enrichRiskInput(payload, apikeyData)
  return riskengine(enrichedPayload)
}

module.exports = {
  scoreRisk
}
