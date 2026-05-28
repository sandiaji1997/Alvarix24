const crypto = require('crypto')

function hashapikey(apiKey) {
  return crypto
    .createHash('sha256')
    .update(apiKey)
    .digest('hex')
}

module.exports = {
  hashapikey
}
