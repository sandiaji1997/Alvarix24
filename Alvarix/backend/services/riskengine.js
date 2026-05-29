const VALID_CONTEXTS = ['transaction', 'login', 'api']

function normalizeScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)))
}

function classifyRisk(score) {
  if (score >= 90) return 'CRITICAL'
  if (score >= 70) return 'HIGH'
  if (score >= 40) return 'MEDIUM'
  return 'LOW'
}

function addSignal(state, points, reason, tag) {
  state.score += points
  state.reasons.push(reason)
  if (tag) state.threatTags.push(tag)
}

function scoreTransaction(data, state) {
  const amount = Number(data.amount || 0)

  if (amount >= 10000000) addSignal(state, 45, 'Very high transaction amount', 'HIGH_AMOUNT')
  else if (amount >= 1000000) addSignal(state, 30, 'High transaction amount', 'HIGH_AMOUNT')

  if (data.location && data.expectedLocation && data.location !== data.expectedLocation) {
    addSignal(state, 25, 'Geo mismatch detected', 'GEO_MISMATCH')
  } else if (data.location && !['ID', 'indonesia', 'Indonesia'].includes(data.location)) {
    addSignal(state, 15, 'Foreign location', 'FOREIGN_LOCATION')
  }

  if (Number(data.velocity24h || 0) >= 10) {
    addSignal(state, 30, 'High request velocity', 'VELOCITY_ATTACK')
  }
}

function scoreLogin(data, state) {
  if (Number(data.failedAttempts || 0) >= 5) {
    addSignal(state, 30, 'Suspicious login pattern detected', 'SUSPICIOUS_LOGIN')
  }

  if (data.newDevice === true || data.device === 'unknown') {
    addSignal(state, 25, 'Device anomaly detected', 'DEVICE_ANOMALY')
  }

  if (data.impossibleTravel === true) {
    addSignal(state, 40, 'Impossible travel pattern detected', 'IMPOSSIBLE_TRAVEL')
  }

  if (data.sessionAnomaly === true) {
    addSignal(state, 25, 'Session anomaly detected', 'SESSION_ANOMALY')
  }
}

function scoreApi(data, state) {
  if (Number(data.requestRate || 0) >= 100) {
    addSignal(state, 35, 'High request velocity', 'VELOCITY_ATTACK')
  }

  if (Number(data.errorRate || 0) >= 25) {
    addSignal(state, 20, 'High API error rate', 'API_ABUSE')
  }

  if (data.suspiciousPayload === true) {
    addSignal(state, 35, 'Suspicious API payload detected', 'SUSPICIOUS_PAYLOAD')
  }
}

function scoreSharedFraudPatterns(data, state) {
  if (data.device === 'unknown') addSignal(state, 20, 'Unknown device', 'DEVICE_ANOMALY')
  if (data.vpnDetected === true || data.vpn === true) addSignal(state, 25, 'VPN detected', 'VPN')
  if (data.proxyDetected === true || data.proxy === true) addSignal(state, 25, 'Proxy detected', 'PROXY')
  if (data.torDetected === true || data.tor === true) addSignal(state, 35, 'TOR network detected', 'TOR')
  if (data.blacklisted === true) addSignal(state, 45, 'Blacklisted identity or source', 'BLACKLIST')
  if (data.chargebackHistory === true) addSignal(state, 30, 'Chargeback history detected', 'CHARGEBACK_HISTORY')
  if (data.behaviorAnomaly === true) addSignal(state, 25, 'Behavioral anomaly detected', 'BEHAVIOR_ANOMALY')
}

function applyHistoryCorrelation(data, state) {
  if (Number(data.recentHighRiskEvents || 0) >= 3) {
    addSignal(state, 20, 'Risk history correlation detected', 'RISK_HISTORY')
  }

  if (Number(data.previousCriticalEvents || 0) >= 1) {
    addSignal(state, 25, 'Previous critical event correlation detected', 'RISK_HISTORY')
  }
}

function calculateConfidence(score, signalCount) {
  const base = 0.62 + Math.min(signalCount, 6) * 0.045 + score / 1000
  return Math.min(0.99, Number(base.toFixed(2)))
}

function riskengine(data = {}) {
  const context = VALID_CONTEXTS.includes(data.context) ? data.context : 'transaction'
  const state = {
    score: 0,
    reasons: [],
    threatTags: []
  }

  if (context === 'transaction') scoreTransaction(data, state)
  if (context === 'login') scoreLogin(data, state)
  if (context === 'api') scoreApi(data, state)

  scoreSharedFraudPatterns(data, state)
  applyHistoryCorrelation(data, state)

  const score = normalizeScore(state.score)
  const level = classifyRisk(score)
  const decision = level === 'CRITICAL' ? 'BLOCK' : level === 'HIGH' ? 'REVIEW' : 'APPROVE'
  const reasons = state.reasons.length ? [...new Set(state.reasons)] : ['No significant risk indicators detected']
  const threatTags = [...new Set(state.threatTags)]

  return {
    score,
    riskScore: score,
    level,
    riskLevel: level,
    confidence: calculateConfidence(score, threatTags.length),
    threatTags,
    reasons,
    decision,
    context
  }
}

module.exports = riskengine
module.exports.normalizeScore = normalizeScore
module.exports.classifyRisk = classifyRisk
module.exports.VALID_CONTEXTS = VALID_CONTEXTS
