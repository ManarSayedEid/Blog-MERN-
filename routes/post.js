const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Post = require("../models/post");
const Profile = require("../models/Profile");
const User = require("../models/User");

router.post("/", auth, async (req, res) => {
  const { text } = req.body;

  try {
    const id = req.userId;
    const user = await User.findById(id).select("-password");

    const post = await Post.create({
      user: req.userId,
      name: user.username,
      text,
    });
    res.json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Server error" });
  }
});

module.exports = router;
