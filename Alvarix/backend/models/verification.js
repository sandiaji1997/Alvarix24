const apikey = require("../models/apikey");

const verifyapikey = async (req, res, next) => {
  try {
    const apikey = req.headers["x-api-key"];

    if (!apikey) {
      return res.status(401).json({
        success: false,
        message: "API key required",
      });
    }

    const keyData = await apikey.findOne({ key: apikey });

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
    req.apikeyData = keyData;

    next();

  } catch (err) {
    console.error("API KEY ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "internal_server_error",
    });
  }
};

module.exports = verifyapikey;
