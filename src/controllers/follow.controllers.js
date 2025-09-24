const Follow = require("../models/follow.model");
const User = require("../models/user.model");

async function addfollwer(req, res) {
  try {
    const userId = req.body.userId; //user auth
    const targetId = req.params.targetId;

    console.log("usrid ", userId);
    console.log("targetId", targetId);

    if (userId === targetId) {
      return res.status(400).json({ error: "নিজেকে follow করা যায় না!" });
    }

    // new follow create
    await Follow.create({ followerId: userId, followingId: targetId });

    await User.findByIdAndUpdate(userId, { $inc: { followingCount: 1 } });
    await User.findByIdAndUpdate(targetId, { $inc: { followerCount: 1 } });

    res.json({ success: true, message: "Followed successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: false, message: "Already following" });
    }
    res.status(500).json({ error: err.message });
  }
}

async function removefollwer(req, res) {
  try {
    const userId = req.body.userId;
    const targetId = req.params.targetId;

    const deleted = await Follow.findOneAndDelete({
      followerId: userId,
      followingId: targetId,
    });

    if (deleted) {
      await User.findByIdAndUpdate(userId, { $inc: { followingCount: -1 } });
      await User.findByIdAndUpdate(targetId, { $inc: { followerCount: -1 } });
    }

    res.json({ success: true, message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addfollwer,
  removefollwer,
};
