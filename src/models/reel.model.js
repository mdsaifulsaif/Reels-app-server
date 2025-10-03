const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 50,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  isLike: {
    type: Boolean,
    default: false,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const reelsModel = mongoose.model("reel", reelSchema);

module.exports = reelsModel;
