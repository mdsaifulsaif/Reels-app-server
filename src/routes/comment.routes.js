const express = require("express");
const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const Router = express.Router();

// comment route
Router.post(
  "/",
  authMiddleware.authUserMiddleWare,
  commentController.createComment
);
Router.get(
  "/:reelId",
  authMiddleware.authUserMiddleWare,
  commentController.getComment
);

module.exports = Router;
