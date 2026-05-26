const express = require('express')
const router = express.Router()

// IMPORT ROUTES
const authRoutes = require('./authRoutes')
const apiKeyRoutes = require('./apiKeyRoutes')
const riskRoutes = require('./riskRoutes')
const transactionRoutes = require('./transactionRoutes')
const monitoringRoutes = require('./monitoringRoutes')

// REGISTER ROUTES
router.use('/auth', authRoutes)
router.use('/apikey', apiKeyRoutes)
router.use('/risk', riskRoutes)
router.use('/transactions', transactionRoutes)
router.use('/monitoring', monitoringRoutes)

module.exports = router
