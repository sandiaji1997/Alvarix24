const express = require('express')
const router = express.Router()

// IMPORT ROUTES
const authRoutes = require('./authroutes')
const apiKeyRoutes = require('./apikeyRoutes')
const riskRoutes = require('./riskroutes')
const transactionRoutes = require('./transactionroutes')
const monitoringRoutes = require('./monitoringroutes')

// REGISTER ROUTES
router.use('/auth', authRoutes)
router.use('/apikey', apiKeyRoutes)
router.use('/risk', riskRoutes)
router.use('/transactions', transactionRoutes)
router.use('/monitoring', monitoringRoutes)

module.exports = router
