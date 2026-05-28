const express = require('express')

const {
  getDashboardStats,
  getRecenttransactions,
  getRecentapilogs
} = require('../controllers/dashboardController')

const router = express.Router()

router.get('/stats', getDashboardStats)
router.get('/transactions', getRecenttransactions)
router.get('/logs', getRecentapilogs)

module.exports = router
