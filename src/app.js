const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("helo world");
});

app.use("/api/auth", authRoutes);
app.use("/api/food/", foodRoutes);

module.exports = app;
