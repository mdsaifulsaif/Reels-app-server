// routes/follow.js
const express = require("express");
const follwerController = require("../controllers/follow.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const Router = express.Router();

// Follow a user
Router.post(
  "/follow/:targetId",
  authMiddleware.authUserMiddleWare,
  follwerController.addfollwer
);

// Unfollow a user
Router.post(
  "/unfollow/:targetId",
  authMiddleware.authUserMiddleWare,
  follwerController.removefollwer
);

module.exports = Router;
