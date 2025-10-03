const express = require("express");
const userController = require("../controllers/users.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const Router = express.Router();

Router.get("/users", userController.getUsers);
Router.get(
  "/suggestionsusers",
  authMiddleware.authUserMiddleWare,
  userController.suggestionsUsers
);

module.exports = Router;
