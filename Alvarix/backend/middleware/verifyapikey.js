const crypto = require('crypto')

const ApiKey = require('../models/apiKey')



const verifyApiKey = async (req, res, next) => {

  try {

    // 📦 ambil api key dari header
    const apiKeyHeader = req.headers['x-api-key']



    // ❌ jika tidak ada api key
    if (!apiKeyHeader) {

      return res.status(401).json({

        success: false,

        error: 'API key required'

      })

    }



    // 🔐 hash api key
    const hashedKey = crypto

      .createHash('sha256')

      .update(apiKeyHeader)

      .digest('hex')



    // 🔎 cari api key di database
    const apiKey = await ApiKey.findOne({

      key: hashedKey

    })



    // ❌ api key invalid
    if (!apiKey) {

      return res.status(401).json({

        success: false,

        error: 'Invalid API key'

      })

    }



    // 🚫 credits habis
    if (apiKey.credits <= 0) {

      return res.status(403).json({

        success: false,

        error: 'Credits exhausted'

      })

    }



    // ➖ kurangi credits
    apiKey.credits -= 1



    // 💾 save perubahan credits
    await apiKey.save()



    // 📌 inject api key data ke request
    req.apiKeyData = apiKey



    // 🚀 lanjut endpoint
    next()

  } catch (err) {

    console.error('VERIFY API KEY ERROR:', err)



    return res.status(500).json({

      success: false,

      error: 'Internal Server Error'

    })

  }

}



module.exports = verifyApiKey