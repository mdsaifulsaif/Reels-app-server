const commentModel = require("../models/reel.comment.model");

async function createComment(req, res) {
  try {
    const newComment = await commentModel.create({
      comment: req.body.comment,
      reel: req.body.reelId,
      user: req.user._id,
    });

    res.status(200).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getComment(req, res) {
  try {
    const { reelId } = req.params;
    let comments = await commentModel
      .find({ reel: reelId })
      .populate("user", "fullName email ")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createComment, getComment };
