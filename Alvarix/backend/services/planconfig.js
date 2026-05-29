const PLAN_LIMITS = {
  free: {
    name: 'free',
    monthlyQuota: 1000,
    dailyLimit: 100,
    rateLimitPerMinute: 10,
    costPerRequest: 0
  },
  basic: {
    name: 'basic',
    monthlyQuota: 10000,
    dailyLimit: 1000,
    rateLimitPerMinute: 60,
    costPerRequest: 0
  },
  pro: {
    name: 'pro',
    monthlyQuota: 50000,
    dailyLimit: 5000,
    rateLimitPerMinute: 300,
    costPerRequest: 1
  },
  enterprise: {
    name: 'enterprise',
    monthlyQuota: 1000000,
    dailyLimit: 100000,
    rateLimitPerMinute: 5000,
    customScaling: true,
    costPerRequest: 0
  }
}

function getPlanConfig(plan = 'free') {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free
}

function getCreditsByPlan(plan = 'free') {
  return getPlanConfig(plan).monthlyQuota
}

module.exports = {
  PLAN_LIMITS,
  getPlanConfig,
  getCreditsByPlan
}
