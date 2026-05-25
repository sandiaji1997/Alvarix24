const ApiKey = require('../models/ApiKey')
const { hashApiKey } = require('../services/hashService')

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key']

    // 🔒 CHECK ADA API KEY
    if (!apiKey) {
      return res.status(401).json({
        error: 'API key required'
      })
    }

    // 🔐 HASH INPUT
    const hashedKey = hashApiKey(apiKey)

    // 🔍 CARI DI DATABASE
    const keyData = await ApiKey.findOne({ key: hashedKey })

    if (!keyData) {
      return res.status(403).json({
        error: 'Invalid API key'
      })
    }

    // 🚫 CEK STATUS
    if (keyData.status !== 'active') {
      return res.status(403).json({
        error: 'API key revoked'
      })
    }

    // 💰 CEK CREDITS
    if (keyData.credits <= 0) {
      return res.status(403).json({
        error: 'API limit exceeded'
      })
    }

    // 📌 UPDATE LAST USED (TAPI JANGAN KURANGI CREDIT DI SINI)
    keyData.lastUsedAt = new Date()
    await keyData.save()

    // 🔗 INJECT KE REQUEST
    req.apiKey = keyData

    next()

  } catch (err) {
    console.error('VERIFY API KEY ERROR:', err)

    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}