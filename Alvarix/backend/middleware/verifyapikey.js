const crypto = require('crypto')

const apikey = require('../models/apikey')



const verifyapikey = async (req, res, next) => {

  try {

    // 📦 ambil api key dari header
    const apikeyHeader = req.headers['x-api-key']



    // ❌ jika tidak ada api key
    if (!apikeyHeader) {

      return res.status(401).json({

        success: false,

        error: 'API key required'

      })

    }



    // 🔐 hash api key
    const hashedKey = crypto

      .createHash('sha256')

      .update(apikeyHeader)

      .digest('hex')



    // 🔎 cari api key di database
    const apikey = await apikey.findOne({

      key: hashedKey

    })



    // ❌ api key invalid
    if (!apikey) {

      return res.status(401).json({

        success: false,

        error: 'Invalid API key'

      })

    }



    // 🚫 credits habis
    if (apikey.credits <= 0) {

      return res.status(403).json({

        success: false,

        error: 'Credits exhausted'

      })

    }



    // ➖ kurangi credits
    apikey.credits -= 1



    // 💾 save perubahan credits
    await apikey.save()



    // 📌 inject api key data ke request
    req.apikeyData = apikey



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



module.exports = verifyapikey
