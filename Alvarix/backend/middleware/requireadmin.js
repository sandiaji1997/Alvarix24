const verifytoken = require('./verifytoken')

function isAllowedByEmail(user) {
  const allowedEmails = (process.env.ADMIN_EMAILS || process.env.FOUNDER_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

  return user.email && allowedEmails.includes(String(user.email).toLowerCase())
}

function requireadmin(req, res, next) {
  verifytoken(req, res, () => {
    const role = req.user.role || req.user.adminRole
    const allowed = role === 'admin' || role === 'founder' || isAllowedByEmail(req.user)

    if (!allowed) {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      })
    }

    return next()
  })
}

module.exports = requireadmin
