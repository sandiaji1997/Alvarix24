const express = require('express')

const router = express.Router()

const {

  getDashboardStats,

  getRecenttransactions,

  getRecentapilogs

} = require('../controllers/dashboardcontroller')



// 📊 Dashboard Stats
router.get('/stats', getDashboardStats)



// 📋 Recent transactions
router.get('/transactions', getRecenttransactions)



// 📜 Recent API Logs
router.get('/logs', getRecentapilogs)



module.exports = router
