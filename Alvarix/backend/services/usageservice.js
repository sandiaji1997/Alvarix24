const usageanalytics = require('../models/usageanalytics')

async function logUsage({
  req,
  apikeyData,
  statusCode,
  responseTimeMs,
  riskResult
}) {
  if (!apikeyData) return

  await usageanalytics.create({
    apikey: apikeyData.key,
    userId: apikeyData.userId ? String(apikeyData.userId) : undefined,
    plan: apikeyData.plan || 'free',
    endpoint: req.originalUrl,
    method: req.method,
    statusCode,
    requestId: req.requestId,
    responseTimeMs,
    riskScore: riskResult ? riskResult.riskScore : undefined,
    riskLevel: riskResult ? riskResult.riskLevel : undefined,
    confidence: riskResult ? riskResult.confidence : undefined,
    threatTags: riskResult ? riskResult.threatTags : undefined,
    context: riskResult ? riskResult.context : undefined,
    ip: req.ip,
    userAgent: req.get('user-agent')
  })
}

module.exports = {
  logUsage
}
