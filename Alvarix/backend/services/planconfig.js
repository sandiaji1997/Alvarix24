const PLAN_LIMITS = {
  free: {
    dailyLimit: 100,
    costPerRequest: 0
  },
  pro: {
    dailyLimit: 1000,
    costPerRequest: 1
  },
  enterprise: {
    dailyLimit: 10000,
    costPerRequest: 0
  }
};

module.exports = { PLAN_LIMITS };
