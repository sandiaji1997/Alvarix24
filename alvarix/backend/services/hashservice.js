const crypto = require('crypto');

const hashapikey = (apikey) => {
  return crypto
    .createHash('sha256')
    .update(apikey)
    .digest('hex');
};