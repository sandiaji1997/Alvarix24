const VALID_API_KEYS = [
  "alvarix_clean_001", // test key kamu
];

module.exports = function (req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key required",
    });
  }

  if (!VALID_API_KEYS.includes(apiKey)) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};