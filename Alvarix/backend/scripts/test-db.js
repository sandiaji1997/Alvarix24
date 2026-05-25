const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MONGO_URI belum diset. Isi file .env di folder backend.");
  process.exit(1);
}

mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 })
  .then(async () => {
    console.log("MongoDB connected OK");
    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error("MongoDB test error:", err.message);
    process.exit(1);
  });

function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
