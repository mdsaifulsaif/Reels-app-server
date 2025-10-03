const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.tprylaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ Mongodb connected");
  } catch (err) {
    console.error("❌ Mongodb connection error:", err.message);
    throw err; // error টা server.js এ যাবে
  }
}

module.exports = connectDB;
