const geoip = require("geoip-lite");

// daftar negara berisiko tinggi (bisa kamu expand nanti)
const HIGH_RISK_COUNTRIES = [
  "RU", "KP", "IR", "SY"
];

function getIPInfo(ip) {
  const geo = geoip.lookup(ip);

  if (!geo) {
    return {
      country: "unknown",
      isHighRisk: true
    };
  }

  return {
    country: geo.country,
    isHighRisk: HIGH_RISK_COUNTRIES.includes(geo.country)
  };
}

module.exports = { getIPInfo };
