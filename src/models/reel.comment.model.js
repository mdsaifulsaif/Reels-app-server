const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reel",
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
