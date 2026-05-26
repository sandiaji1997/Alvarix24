require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// 🔐 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 📦 ROUTES
//const routes = require("./routes");
//app.use("/api", routes);

// 🗄️ CONNECT DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// 🚀 HEALTH CHECK (penting untuk deploy)
app.get("/", (req, res) => {
  res.send("Alvarix API is running 🚀");
});

// 🔥 PORT FIX (WAJIB UNTUK RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
