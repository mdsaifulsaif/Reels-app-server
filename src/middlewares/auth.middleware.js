// const foodPartnerModle = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartenr = await foodPartnerModle.findById(decoded.id);
    req.foodPartenr = foodPartenr;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

async function authUserMiddleWare(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleWare,
};
