const ApiKey = require('./apikey')
const { hashapikey } = require('../services/hashservice')

const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key']

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: 'API key required'
      })
    }

    const keyData = await ApiKey.findOne({
      key: hashapikey(apiKey)
    })

    if (!keyData) {
      return res.status(403).json({
        success: false,
        message: 'Invalid API key'
      })
    }

    if (keyData.credits <= 0) {
      return res.status(429).json({
        success: false,
        message: 'API credits exhausted'
      })
    }

    keyData.usage = (keyData.usage || 0) + 1
    keyData.credits -= 1
    await keyData.save()

    req.apiKeyData = keyData
    req.apikeyData = keyData
    req.apikey = keyData

    return next()
  } catch (err) {
    console.error('API KEY ERROR:', err)

    return res.status(500).json({
      success: false,
      message: 'internal_server_error'
    })
  }
}

module.exports = verifyApiKey
