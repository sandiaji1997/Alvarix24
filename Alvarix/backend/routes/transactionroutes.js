const express = require('express')

const transaction = require('../models/transaction')
const riskengine = require('../services/riskengine')
const apikeymiddleware = require('../middleware/apikeymiddleware')

const router = express.Router()

router.post('/transactions', apikeymiddleware, async (req, res) => {
  try {
    const { userId, amount, status } = req.body

    const riskResult = riskengine({
      userId,
      amount,
      status,
      location: 'indonesia',
      behaviorScore: 50
    })

    const newtransaction = new transaction({
      userId,
      amount,
      status,
      riskScore: riskResult.score,
      riskLevel: riskResult.level
    })

    await newtransaction.save()

    return res.json({
      success: true,
      risk: riskResult,
      data: newtransaction
    })
  } catch (error) {
    console.error('TRANSACTION CREATE ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

router.get('/transactions', apikeymiddleware, async (req, res) => {
  try {
    const data = await transaction.find()

    return res.json({
      success: true,
      data
    })
  } catch (error) {
    console.error('TRANSACTION LIST ERROR:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

module.exports = router
