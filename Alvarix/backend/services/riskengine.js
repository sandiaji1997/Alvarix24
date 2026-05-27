function riskengine(data) {
  let score = 0
  let reasons = []

  // RULE 1: Amount besar
  if (data.amount > 1000000) {
    score += 40
    reasons.push('High transaction amount')
  }

  // RULE 2: Location luar
  if (data.location && data.location !== 'ID') {
    score += 30
    reasons.push('Foreign location')
  }

  // RULE 3: Device risk
  if (data.device === 'unknown') {
    score += 30
    reasons.push('Unknown device')
  }

  // NORMALISASI SCORE (max 100)
  if (score > 100) score = 100

  // LEVEL
  let level = 'LOW'
  if (score > 70) level = 'HIGH'
  else if (score > 40) level = 'MEDIUM'

  // DECISION
  let decision = 'APPROVE'
  if (level === 'HIGH') decision = 'REVIEW'

  return {
    score,        // ✅ HARUS "score"
    level,        // ✅ HARUS "level"
    reasons,
    decision
  }
}

module.exports = riskengine
