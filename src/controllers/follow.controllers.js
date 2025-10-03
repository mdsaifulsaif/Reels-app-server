const Follow = require("../models/follow.model");
const User = require("../models/user.model");

// async function addfollwer(req, res) {
//   try {
//     const userId = req.user._id;
//     // const userId = req.body.userId;
//     const targetId = req.params.targetId;

//     console.log("usrid ", userId);
//     console.log("targetId", targetId);

//     if (userId === targetId) {
//       return res.status(400).json({ error: "নিজেকে follow করা যায় না!" });
//     }

//     // new follow create
//     await Follow.create({ followerId: userId, followingId: targetId });

//     await User.findByIdAndUpdate(userId, { $inc: { followingCount: 1 } });
//     await User.findByIdAndUpdate(targetId, { $inc: { followerCount: 1 } });

//     res.json({ success: true, message: "Followed successfully" });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.json({ success: false, message: "Already following" });
//     }
//     res.status(500).json({ error: err.message });
//   }
// }

// async function removefollwer(req, res) {
//   try {
//     const userId = req.user._id;
//     const targetId = req.params.targetId;

//     const deleted = await Follow.findOneAndDelete({
//       followerId: userId,
//       followingId: targetId,
//     });

//     if (deleted) {
//       await User.findByIdAndUpdate(userId, { $inc: { followingCount: -1 } });
//       await User.findByIdAndUpdate(targetId, { $inc: { followerCount: -1 } });
//     }

//     res.json({ success: true, message: "Unfollowed successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

async function addfollwer(req, res) {
  try {
    const userId = req.user._id;
    const targetId = req.params.targetId;

    if (userId.toString() === targetId.toString()) {
      return res.status(400).json({ error: "নিজেকে follow করা যায় না!" });
    }

    // follow create
    await Follow.create({ followerId: userId, followingId: targetId });

    // following count update (follower user)
    await User.findByIdAndUpdate(userId, {
      $inc: { followingCount: 1 },
    });

    // target user update (followerCount + isFollow true)
    const targetUser = await User.findByIdAndUpdate(
      targetId,
      {
        $inc: { followerCount: 1 },
        $set: { isFollow: "true" }, // 👈 এখানে update হবে
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Followed successfully",
      user: targetUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: false, message: "Already following" });
    }
    res.status(500).json({ error: err.message });
  }
}
async function removefollwer(req, res) {
  try {
    const userId = req.user._id;
    const targetId = req.params.targetId;

    const deleted = await Follow.findOneAndDelete({
      followerId: userId,
      followingId: targetId,
    });

    let targetUser = null;

    if (deleted) {
      await User.findByIdAndUpdate(userId, { $inc: { followingCount: -1 } });

      targetUser = await User.findByIdAndUpdate(
        targetId,
        {
          $inc: { followerCount: -1 },
          $set: { isFollow: "false" }, // 👈 এখানে আবার false করে দিচ্ছি
        },
        { new: true }
      );
    }

    res.json({
      success: true,
      message: "Unfollowed successfully",
      user: targetUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addfollwer,
  removefollwer,
};
