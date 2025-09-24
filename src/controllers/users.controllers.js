const userModel = require("../models/user.model");

async function getUsers(req, res) {
  //   const users = await userModel.find({});
  const users = await userModel.find().select("-password");

  res.status(200).json({
    message: "Fetched all user successfully",
    users,
  });
}

module.exports = {
  getUsers,
};
