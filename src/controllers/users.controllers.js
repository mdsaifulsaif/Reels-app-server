const userModel = require("../models/user.model");
const Follow = require("../models/follow.model");

async function getUsers(req, res) {
  const users = await userModel
    .find()
    .select("-password")
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "Fetched all user successfully",
    users,
  });
}

// async function suggestionsUsers(req, res) {
//   const users = await userModel
//     .find()
//     .select("-password")
//     .sort({ createdAt: -1 });

//   res.status(200).json({
//     message: "Fetched all user successfully",
//     users,
//   });
// }

async function suggestionsUsers(req, res) {
  try {
    const userId = req.user._id; // logged in user id

    // 1. logged in user যাদের follow করেছে তাদের বের করো
    const following = await Follow.find({ followerId: userId }).select(
      "followingId"
    );
    const followingIds = following.map((f) => f.followingId.toString());

    // 2. যাদের follow করে নাই + নিজের প্রোফাইল বাদ দিয়ে suggest করো
    const users = await userModel
      .find({
        _id: { $nin: [...followingIds, userId] }, // not in following + not self
      })
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      message: "Fetched suggested users successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getUsers,
  suggestionsUsers,
};
