const mongoose = require("mongoose");

async function connectDB(mongoUri) {
  console.log("Connecting to:", mongoUri);

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("MongoDB connected");
}

module.exports = { connectDB };