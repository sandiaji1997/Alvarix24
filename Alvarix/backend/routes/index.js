const express = require('express')
const router = express.Router()

// IMPORT ROUTES
const authroutes = require('./authroutes')
const apikeyroutes = require('./apikeyroutes')
const riskroutes = require('./riskroutes')
const transactionroutes = require('./transactionroutes')
const monitoringroutes = require('./monitoringroutes')

// REGISTER ROUTES
router.use('/auth', authroutes)
router.use('/apikey', apikeyroutes)
router.use('/risk', riskroutes)
router.use('/transactions', transactionroutes)
router.use('/monitoring', monitoringroutes)

module.exports = router

