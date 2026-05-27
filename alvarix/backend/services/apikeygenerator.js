const crypto = require('crypto')

// 🔧 GENERATE API KEY
const generateApiKey = (type = 'live') => {
  const prefix = type === 'test' ? 'alv_test_' : 'alv_live_'

  // random + timestamp (lebih unik & production-safe)
  const randomPart = crypto.randomBytes(24).toString('hex')
  const timePart = Date.now().toString(36)

  return `${prefix}${randomPart}${timePart}`
}

// 🔧 SET CREDIT BERDASARKAN PLAN
const getCreditsByPlan = (plan = 'free') => {
  if (plan === 'pro') return 10000
  if (plan === 'enterprise') return 1000000
  return 100 // free
}

module.exports = {
  generateApiKey,
  getCreditsByPlan
}