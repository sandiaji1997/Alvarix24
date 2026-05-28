const express = require('express')

const router = express.Router()

const apikey = require('../models/apikey')

const {
  generateapikey,
  getCreditsByPlan
} = require('../services/keyservice')

const { hashapikey } = require('../services/hashservice')


// 🚀 GENERATE API KEY
router.post('/generate', verifytoken, async (req, res) => {

    try {

        // ambil user id dari jwt
        const userId =
            req.user.id ||
            req.user.userId ||
            req.user._id

        // jika user tidak ada
        if (!userId) {
            return res.status(401).json({
                error: 'user not found'
            })
        }

        // request body
        const plan = req.body.plan || 'free'

        const type = req.body.type || 'live'

        // validasi plan
        const validPlans = ['free', 'basic', 'pro', 'enterprise']

        if (!validPlans.includes(plan)) {
            return res.status(400).json({
                error: 'invalid plan'
            })
        }

        // generate api key
        const rawApiKey = generateapikey(type)

        // hash api key
        const hashedKey = hashapikey(rawApiKey)

        // credits berdasarkan plan
        const credits = getCreditsByPlan(plan)

        // simpan database
        const newKey = new apikey({
            key: hashedKey,
            userId,
            plan,
            credits
        })

        await newKey.save()

        // response
        return res.json({
            message: 'api key generated successfully',
            apiKey: rawApiKey,
            plan,
            credits
        })

    } catch (err) {

        console.error('API KEY ERROR:', err)

        return res.status(500).json({
            error: 'internal server error'
        })
    }

})

module.exports = router
