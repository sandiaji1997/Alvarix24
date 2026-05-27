const VALID_API_KEYS = [
  "alvarix_clean_001", // test key kamu
];

module.exports = function (req, res, next) {
  const apikey = req.headers["x-api-key"];

  if (!apikey) {
    return res.status(401).json({
      success: false,
      message: "API key required",
    });
  }

  if (!VALID_API_KEYS.includes(apikey)) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};
