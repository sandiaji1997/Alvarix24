const crypto = require('crypto')
const ApiKey = require('../models/ApiKey')

const verifyApiKey = async (req, res, next) => {
  try {

    // ambil api key dari header
    const apiKey = req.headers['x-api-key']

    // cek api key kosong
    if (!apiKey) {
      return res.status(401).json({
        error: 'API key required'
      })
    }

    // hash api key
    const hashedKey = crypto
      .createHash('sha256')
      .update(apiKey)
      .digest('hex')

    // cari key di database
    const existingKey = await ApiKey.findOne({
      key: hashedKey
    })

    // key tidak ditemukan
    if (!existingKey) {
      return res.status(401).json({
        error: 'Invalid API key'
      })
    }

    // credits habis
    if (existingKey.credits <= 0) {
      return res.status(403).json({
        error: 'Credits exhausted'
      })
    }

    // kurangi credits
    existingKey.credits -= 1

    await existingKey.save()

    // simpan data api key ke request
    req.apiKeyData = existingKey

    next()

  } catch (err) {

    console.error('VERIFY API KEY ERROR:', err)

    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

module.exports = verifyApiKey