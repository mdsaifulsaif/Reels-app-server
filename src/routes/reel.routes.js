const express = require("express");
const reelController = require("../controllers/reel.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authMiddleware.authUserMiddleWare,
  upload.single("video"),
  reelController.createReel
);

router.get("/", authMiddleware.authUserMiddleWare, reelController.getReels);

module.exports = router;
