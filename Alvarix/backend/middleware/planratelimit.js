const windows = new Map()

function getClientKey(req) {
  return `${req.apikeyData._id}:${Math.floor(Date.now() / 60000)}`
}

async function planratelimit(req, res, next) {
  try {
    const planConfig = req.planConfig

    if (!planConfig) return next()

    const key = getClientKey(req)
    const current = windows.get(key) || {
      count: 0,
      resetAt: Date.now() + 60000
    }

    current.count += 1
    windows.set(key, current)

    res.setHeader('x-ratelimit-limit', planConfig.rateLimitPerMinute)
    res.setHeader('x-ratelimit-remaining', Math.max(0, planConfig.rateLimitPerMinute - current.count))
    res.setHeader('x-ratelimit-reset', current.resetAt)

    if (current.count > planConfig.rateLimitPerMinute * 2) {
      req.apikeyData.suspendedUntil = new Date(Date.now() + 5 * 60 * 1000)
      await req.apikeyData.save()

      return res.status(429).json({
        success: false,
        error: 'Temporary suspension applied for abuse prevention',
        suspendedUntil: req.apikeyData.suspendedUntil
      })
    }

    if (current.count > planConfig.rateLimitPerMinute) {
      return res.status(429).json({
        success: false,
        error: 'Plan rate limit exceeded',
        retryAfterSeconds: Math.ceil((current.resetAt - Date.now()) / 1000)
      })
    }

    return next()
  } catch (err) {
    return next(err)
  }
}

setInterval(() => {
  const now = Date.now()

  for (const [key, value] of windows.entries()) {
    if (value.resetAt < now) windows.delete(key)
  }
}, 60000).unref()

module.exports = planratelimit
