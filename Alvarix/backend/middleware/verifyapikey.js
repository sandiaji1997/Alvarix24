const apikeyModel = require('../models/apikey')
const { hashapikey } = require('../services/hashservice')
const { getPlanConfig } = require('../services/planconfig')
const { refreshMonthlyQuota } = require('../services/meteringservice')

const verifyapikey = async (req, res, next) => {
  try {
    const apikeyHeader = req.headers['x-api-key']

    if (!apikeyHeader) {
      return res.status(401).json({
        success: false,
        error: 'API key required'
      })
    }

    const hashedKey = hashapikey(apikeyHeader)
    const apikey = await apikeyModel.findOne({ key: hashedKey })

    if (!apikey) {
      return res.status(401).json({
        success: false,
        error: 'Invalid API key'
      })
    }

    if (apikey.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'API key is not active'
      })
    }

    if (apikey.suspendedUntil && apikey.suspendedUntil > new Date()) {
      return res.status(429).json({
        success: false,
        error: 'API key temporarily suspended',
        suspendedUntil: apikey.suspendedUntil
      })
    }

    const planConfig = getPlanConfig(apikey.plan)
    await refreshMonthlyQuota(apikey)

    if (apikey.credits <= 0 || apikey.usage >= planConfig.monthlyQuota) {
      return res.status(403).json({
        success: false,
        error: 'API quota exhausted'
      })
    }

    req.apikeyData = apikey
    req.apikey = apikey
    req.planConfig = planConfig

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = verifyapikey
