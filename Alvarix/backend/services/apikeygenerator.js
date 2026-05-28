function generateapikey(type = 'live') {
  const prefix = type === 'test'
    ? 'alv_test_'
    : 'alv_live_'

  const random = Math.random().toString(36).substring(2)
  const timestamp = Date.now().toString(36)

  return prefix + random + timestamp
}

function getCreditsByPlan(plan = 'free') {
  const plans = {
    free: 100,
    pro: 10000,
    enterprise: 50000
  }

  return plans[plan] || 100
}

module.exports = {
  generateapikey,
  getCreditsByPlan
}