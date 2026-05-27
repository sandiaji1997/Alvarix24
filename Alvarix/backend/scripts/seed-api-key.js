const mongoose = require("mongoose");
const apikey = require("../models/apikey");

async function seed() {
  try {
    // CONNECT MONGODB
    await mongoose.connect(
      "mongodb+srv://alvarix_user:Alvaro24@cluster0.ruwkkto.mongodb.net/qcc_nexus?retryWrites=true&w=majority"
    );

    console.log("MongoDB Connected for seeding...");

    // HAPUS DATA LAMA
    await apikey.deleteMany({});

    // CREATE API KEY
    const apikey = await apikey.create({
      key: "alvarix_free_123",
      owner: "test_user",
      limit: 100,
      usage: 0,
    });

    console.log("API KEY CREATED:");
    console.log(apikey.key);

    process.exit(0);
  } catch (err) {
    console.error("SEED ERROR:", err);
    process.exit(1);
  }
}

seed();
