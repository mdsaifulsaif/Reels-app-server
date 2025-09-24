const express = require("express");
const userController = require("../controllers/users.controllers");

const Router = express.Router();

Router.get("/users", userController.getUsers);

module.exports = Router;
