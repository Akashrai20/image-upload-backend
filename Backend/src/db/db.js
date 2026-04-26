const mongoose = require("mongoose");

async function connectDB() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB connection error:", error.message);

    throw error;
  }
}

module.exports = connectDB;
