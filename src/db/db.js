const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(
      "mongodb+srv://reelapp:5Y7TI2uKWlifIaU5@cluster0.tprylaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => {
      console.log("mongodb connectin error", err);
    });
}

module.exports = connectDB;
