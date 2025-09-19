const reelsModel = require("../models/reel.model");
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

module.exports = {
  createReel,
  getReels,
};
