const { getPlanConfig } = require('./planconfig')

function getPeriodStart(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
}

async function refreshMonthlyQuota(apikeyData) {
  const planConfig = getPlanConfig(apikeyData.plan)
  const periodStart = getPeriodStart()

  if (!apikeyData.quotaPeriodStart || apikeyData.quotaPeriodStart < periodStart) {
    apikeyData.monthlyQuota = planConfig.monthlyQuota
    apikeyData.credits = planConfig.monthlyQuota
    apikeyData.usage = 0
    apikeyData.quotaPeriodStart = periodStart
    await apikeyData.save()
  }

  return apikeyData
}

async function consumeCredit(apikeyData) {
  await refreshMonthlyQuota(apikeyData)

  if (apikeyData.credits <= 0) {
    const err = new Error('API credits exhausted')
    err.status = 403
    throw err
  }

  apikeyData.credits -= 1
  apikeyData.usage = (apikeyData.usage || 0) + 1
  apikeyData.lastUsedAt = new Date()
  await apikeyData.save()

  return {
    plan: apikeyData.plan,
    monthlyQuota: apikeyData.monthlyQuota,
    used: apikeyData.usage,
    remainingCredits: apikeyData.credits,
    quotaPeriodStart: apikeyData.quotaPeriodStart
  }
}

function buildUsageSnapshot(apikeyData) {
  return {
    plan: apikeyData.plan,
    monthlyQuota: apikeyData.monthlyQuota,
    used: apikeyData.usage || 0,
    remainingCredits: apikeyData.credits,
    lastUsedAt: apikeyData.lastUsedAt,
    quotaPeriodStart: apikeyData.quotaPeriodStart
  }
}

module.exports = {
  refreshMonthlyQuota,
  consumeCredit,
  buildUsageSnapshot
}
