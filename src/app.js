const express = require("express");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const reelRoutes = require("./routes/reel.routes");
const commentRoutes = require("./routes/comment.routes");
const followRoutes = require("./routes/follow.routes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://clipzygo.netlify.app"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("helo world");
});
app.get("/test", (req, res) => {
  res.send("Hello test");
});

app.use("/api/auth", authRoutes);
app.use("/api/reel", reelRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/", followRoutes);
// app.use("/api/partner");

module.exports = app;
