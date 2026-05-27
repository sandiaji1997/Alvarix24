const express = require('express')

const router = express.Router()

const {

  getDashboardStats,

  getRecentTransactions,

  getRecentApiLogs

} = require('../controllers/dashboardController')



// 📊 Dashboard Stats
router.get('/stats', getDashboardStats)



// 📋 Recent Transactions
router.get('/transactions', getRecentTransactions)



// 📜 Recent API Logs
router.get('/logs', getRecentApiLogs)



module.exports = router