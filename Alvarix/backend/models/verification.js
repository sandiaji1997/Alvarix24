const ApiKey = require("../models/ApiKey");

const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key required",
      });
    }

    const keyData = await ApiKey.findOne({ key: apiKey });

    if (!keyData) {
      return res.status(403).json({
        success: false,
        message: "Invalid API key",
      });
    }

    // 🔥 RATE LIMIT CHECK
    if (keyData.usage >= keyData.limit) {
      return res.status(429).json({
        success: false,
        message: "API limit exceeded",
      });
    }

    // 🔥 TAMBAH USAGE
    keyData.usage += 1;
    await keyData.save();

    // inject ke request
    req.apiKeyData = keyData;

    next();

  } catch (err) {
    console.error("API KEY ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "internal_server_error",
    });
  }
};

module.exports = verifyApiKey;