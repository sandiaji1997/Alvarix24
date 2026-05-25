// ================================
// 🌍 CONFIG
// ================================

const HIGH_RISK_COUNTRIES = [
  "north korea",
  "iran",
  "syria",
  "russia",
  "nigeria"
];

const REGION_MAP = {
  asia: ["indonesia", "singapore", "malaysia", "china", "japan"],
  europe: ["germany", "france", "italy", "netherlands"],
  america: ["usa", "canada", "mexico"],
  africa: ["nigeria", "egypt", "south africa"]
};

const WEIGHT = {
  BASE: 20,

  DEVICE_CHANGE: 20,
  LOCATION_CHANGE: 20,
  REGION_CHANGE: 25,

  HIGH_RISK_COUNTRY: 40,

  HIGH_ACTIVITY: 10,
  VELOCITY: 30,
  MULTI_LOCATION: 20,
  IMPOSSIBLE_TRAVEL: 25,

  ANOMALY: 15,
  TRUSTED: -20,

  LARGE_AMOUNT: 25,
  LOW_BEHAVIOR: 25
};

// ================================
// 🧠 UTIL
// ================================

function getRegion(country) {
  if (!country) return "unknown";
  country = country.toLowerCase();

  for (let region in REGION_MAP) {
    if (REGION_MAP[region].includes(country)) {
      return region;
    }
  }
  return "unknown";
}

// ================================
// 🚀 MAIN ENGINE
// ================================

async function calculateRiskAdvanced({
  email,
  device,
  location,
  amount = 0,
  behaviorScore = 1,
  history = []
}) {

  console.log("DEBUG INPUT:", { amount, behaviorScore });

  let risk_score = WEIGHT.BASE;
  let reasons = [];

// ================================
// 1. AMOUNT ANALYSIS
// ================================
// =====================
// AMOUNT ANALYSIS (AI LEVEL)
// =====================
const safeAmount = typeof amount === "number" ? amount : 0;

if (safeAmount > 50000000) {
    risk_score += 40;
    reasons.push("extreme_amount");
} else if (safeAmount > 10000000) {
    risk_score += 25;
    reasons.push("high_amount");
} else if (safeAmount > 1000000) {
    risk_score += 10;
    reasons.push("medium_amount");
}

// ================================
// 2. BEHAVIOR ANALYSIS
// ================================
if (behaviorScore < 0.5) {
  risk_score += 30;
  reasons.push("suspicious_behavior");
}

// ================================
// 3. LOCATION ANALYSIS
// ================================
const highRiskCountries = ["north korea", "iran", "russia"];

if (highRiskCountries.includes(location.toLowerCase())) {
  score += 40;
  reasons.push("high_risk_country");
}

  const currentDevice = device?.toLowerCase();
  const currentLocation = location?.toLowerCase();

  const safeHistory = Array.isArray(history) ? history : [];

  const normalizedHistory = safeHistory.map(h => ({
    device: h.device?.toLowerCase(),
    location: h.location?.toLowerCase(),
    createdAt: new Date(h.createdAt)
  }));

// ================================
// 4. HISTORY ANALYSIS (AI ADAPTIVE)
// ================================

// Ambil device & location yang sering dipakai
const deviceCount = {};
const locationCount = {};

normalizedHistory.forEach(h => {
  if (h.device) {
    deviceCount[h.device] = (deviceCount[h.device] || 0) + 1;
  }
  if (h.location) {
    locationCount[h.location] = (locationCount[h.location] || 0) + 1;
  }
});

// Cari device & location paling sering
const mostUsedDevice = Object.keys(deviceCount).sort((a, b) => deviceCount[b] - deviceCount[a])[0];
const mostUsedLocation = Object.keys(locationCount).sort((a, b) => locationCount[b] - locationCount[a])[0];

// ================================
// DETEKSI ANOMALI
// ================================

// Device baru → risiko naik
if (currentDevice && mostUsedDevice && currentDevice !== mostUsedDevice) {
  risk_score += 25;
  reasons.push("new_device_detected");
}

// Lokasi baru → risiko naik
if (currentLocation && mostUsedLocation && currentLocation !== mostUsedLocation) {
  risk_score += 25;
  reasons.push("new_location_detected");
}

  normalizedHistory.sort((a, b) => a.createdAt - b.createdAt);

  const last = normalizedHistory[normalizedHistory.length - 1];
  const prev = normalizedHistory[normalizedHistory.length - 2];

  let sameDevice = false;
  let sameLocation = false;

  // ================================
  // DEVICE CHECK
  // ================================
  if (last?.device && currentDevice) {
    if (last.device !== currentDevice) {
      risk_score += WEIGHT.DEVICE_CHANGE;
      reasons.push("new_device_detected");
    } else {
      sameDevice = true;
    }
  }

  // ================================
  // LOCATION CHECK
  // ================================
  if (last?.location && currentLocation) {
    if (last.location !== currentLocation) {
      risk_score += WEIGHT.LOCATION_CHANGE;
      reasons.push("location_change_detected");
    } else {
      sameLocation = true;
    }
  }

  // ================================
  // TRUSTED
  // ================================
  if (sameDevice && sameLocation) {
    risk_score += WEIGHT.TRUSTED;
    reasons.push("trusted_behavior");
  }

  // ================================
  // REGION CHECK
  // ================================
  const lastRegion = getRegion(last?.location);
  const currentRegion = getRegion(currentLocation);

  if (
    lastRegion !== "unknown" &&
    currentRegion !== "unknown" &&
    lastRegion !== currentRegion
  ) {
    risk_score += WEIGHT.REGION_CHANGE;
    reasons.push("cross_region_access");
  }

  // ================================
  // HIGH RISK COUNTRY
  // ================================
  if (HIGH_RISK_COUNTRIES.includes(currentLocation)) {
    risk_score += WEIGHT.HIGH_RISK_COUNTRY;
    reasons.push("high_risk_country");
  }

  // ================================
  // HIGH ACTIVITY
  // ================================
  if (normalizedHistory.length >= 5) {
    risk_score += WEIGHT.HIGH_ACTIVITY;
    reasons.push("high_activity");
  }

  // ================================
  // VELOCITY
  // ================================
  if (last && prev) {
    const diffMs = last.createdAt - prev.createdAt;

    if (diffMs < 60 * 1000) {
      risk_score += WEIGHT.VELOCITY;
      reasons.push("high_velocity_transactions");
    }
  }

  // ================================
  // MULTI LOCATION
  // ================================
  const uniqueLocations = new Set(normalizedHistory.map(h => h.location));

  if (uniqueLocations.size >= 3) {
    risk_score += WEIGHT.MULTI_LOCATION;
    reasons.push("multiple_locations_used");
  }

  // ================================
  // AMOUNT ANALYSIS
  // ================================
  if (amount > 10000000) {
    risk_score += WEIGHT.LARGE_AMOUNT;
    reasons.push("large_transaction");
  }

  // ================================
  // BEHAVIOR SCORE
  // ================================
  if (behaviorScore < 0.5) {
    risk_score += WEIGHT.LOW_BEHAVIOR;
    reasons.push("low_behavior_score");
  }

  // ================================
  // AI COMBINATION
  // ================================
  if (
    reasons.includes("new_device_detected") &&
    reasons.includes("location_change_detected")
  ) {
    risk_score += WEIGHT.ANOMALY;
    reasons.push("device_location_anomaly");
  }

  if (
    reasons.includes("high_activity") &&
    reasons.includes("multiple_locations_used")
  ) {
    risk_score += WEIGHT.ANOMALY;
    reasons.push("behavior_anomaly");
  }

  // ================================
  // NORMALIZATION
  // ================================
  risk_score = Math.max(0, Math.min(100, risk_score));

  // ================================
  // CONFIDENCE
  // ================================
  const confidence = Math.min(1,
  0.4 +
  (reasons.length * 0.1) +
  (normalizedHistory.length > 0 ? 0.2 : 0)
);

// NORMALISASI
if (risk_score > 100) risk_score = 100;

// DECISION
let decision = "low_risk";

if (risk_score >= 70) decision = "high_risk";
else if (risk_score >= 40) decision = "medium_risk";

  // ================================
  // RESPONSE
  // ================================
  return {
    risk_score,
    decision,
    risk_level: decision,
    confidence: Number(confidence.toFixed(2)),
    reasons,
    meta: {
      email,
      analyzed_at: new Date(),
      history_count: history.length,
      most_used_device: mostUsedDevice || null,
      most_used_location: mostUsedLocation || null,
    }
  };
}

module.exports = {
  calculateRiskAdvanced
};