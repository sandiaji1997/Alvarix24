const apikeyModel = require('../models/apikey')
const { hashapikey } = require('../services/hashservice')

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

    const apikey = await apikeyModel.findOne({
      key: hashedKey
    })

    if (!apikey) {
      return res.status(401).json({
        success: false,
        error: 'Invalid API key'
      })
    }

    if (apikey.credits <= 0) {
      return res.status(403).json({
        success: false,
        error: 'Credits exhausted'
      })
    }

    apikey.credits -= 1
    apikey.usage = (apikey.usage || 0) + 1
    await apikey.save()

    req.apikeyData = apikey
    req.apikey = apikey

    return next()
  } catch (err) {
    console.error('VERIFY API KEY ERROR:', err)

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    })
  }
}

module.exports = verifyapikey
