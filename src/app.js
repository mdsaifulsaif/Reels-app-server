const express = require("express");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const reelRoutes = require("./routes/reel.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // তোমার React frontend url
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("helo world");
});

app.use("/api/auth", authRoutes);
app.use("/api/food/", foodRoutes);
app.use("/api/reel", reelRoutes);

// app.use("/api/partner");

module.exports = app;
