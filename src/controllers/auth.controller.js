const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartnerModle = require("../models/foodpartner.model");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  //   user password hashed

  const hashedPassword = await bcrypt.hash(password, 10);

  //   create user
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    "8439650484f8e9f8d2b3e4617544545c"
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user register successfull",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginuser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email of password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or Passwrod",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    "8439650484f8e9f8d2b3e4617544545c"
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, mobile, password } = req.body;

  const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

  if (isAccountAlreadyExists) {
    return res.status(200).json({
      message: "Food partner account alrady exixts",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModle.create({
    name,
    mobile,
    email,
    password: hashedPassword,
  });

  // generate token
  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    "8439650484f8e9f8d2b3e4617544545c"
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "Food partner registered succecfully ",
    foodPartnerinfo: {
      _id: foodPartner._id,
      mobile: foodPartner.mobile,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartenr = await foodPartnerModel.findOne({ email });

  if (!foodPartenr) {
    return res.status(400).json({
      message: "Invalid email of password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartenr.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartenr._id,
    },
    "8439650484f8e9f8d2b3e4617544545c"
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Food partner logged in successfully",
    foodPartner: {
      _id: foodPartenr._id,
      email: foodPartenr.email,
      name: foodPartenr.name,
    },
  });
}

function logoutFoodPrtner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
}

async function currentFoodPartner(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, "8439650484f8e9f8d2b3e4617544545c");

    const foodPartner = await foodPartnerModle
      .findById(decoded.id)
      .select("-password");
    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }
    res.json({ foodPartner });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

async function currentUser(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, "8439650484f8e9f8d2b3e4617544545c");
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  registerUser,
  loginuser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPrtner,
  currentUser,
  currentFoodPartner,
};
