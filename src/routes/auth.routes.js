const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth.controller");

// user auth apis
router.post("/register", authController.registerUser);
router.post("/login", authController.loginuser);
router.get("/logout", authController.logoutUser);

// foodpartner auth apis
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.get("/food-partner/logout", authController.logoutFoodPrtner);

module.exports = router;
