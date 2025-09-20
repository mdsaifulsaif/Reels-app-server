const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const reelsModel = mongoose.model("reel", reelSchema);

module.exports = reelsModel;
