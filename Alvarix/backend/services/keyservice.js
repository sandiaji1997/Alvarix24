const crypto = require('crypto')
const { getCreditsByPlan } = require('./planconfig')

function generateapikey(type = 'live') {
  const safeType = String(type).replace(/[^a-z0-9_-]/gi, '').toLowerCase() || 'live'
  const random = crypto.randomBytes(24).toString('hex')

  return `alvarix_${safeType}_${random}`
}

module.exports = {
  generateapikey,
  getCreditsByPlan
}
