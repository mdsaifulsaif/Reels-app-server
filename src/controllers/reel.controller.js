const reelsModel = require("../models/reel.model");
const userModel = require("../models/user.model");
const likeModel = require("../models/like.model");
const { v4: uuid } = require("uuid");
const storage = require("../services/storage");

async function createReel(req, res) {
  //   console.log(req.body);
  //   console.log(req.file);
  //   console.log(req.user);
  const result = await storage.uploadFile(req.file.buffer, uuid());

  const reelItem = await reelsModel.create({
    name: req.body.name,
    description: req.body.description,
    video: result.url,
    createBy: req.user._id,
  });
  //   console.log(result.url);

  res.status(200).json({
    message: "Reel created successfully",
    reel: reelItem,
  });
}

async function getReels(req, res) {
  const reelItems = await reelsModel.find({});

  res.status(200).json({
    message: "Food items fetced successfuly",
    reelItems,
  });
}

async function userAllReels(req, res) {
  try {
    const createById = req.params.id; // URL থেকে user id নিচ্ছি
    console.log("User ID:", createById);

    const creator = await userModel.findById(createById);
    const userReels = await reelsModel.find({ createBy: createById });

    res.status(200).json({
      message: "User reels retrieved successfully",
      userReels,
      creator,
    });
  } catch (error) {
    console.error("Error fetching user reels:", error);
    res.status(500).json({
      message: "Failed to retrieve user reels",
      error: error.message,
    });
  }
}

async function cratelike(req, res) {
  const { reelId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    reel: reelId,
  });

  if (isAlreadyLiked) {
    // unlike
    await likeModel.deleteOne({
      user: user._id,
      reel: reelId,
    });

    await reelsModel.findByIdAndUpdate(reelId, {
      $inc: { likeCount: -1 },
    });

    return res.json({ message: "Unliked successfully" });
  }

  // like
  const like = await likeModel.create({
    user: user._id,
    reel: reelId,
  });

  await reelsModel.findByIdAndUpdate(reelId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "Liked successfully",
    like,
  });
}

module.exports = {
  createReel,
  getReels,
  userAllReels,
  cratelike,
};
