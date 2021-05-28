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

// get all posts
router.get("/", async (req, res) => {
  try {
    // sort to get latest posts
    const posts = await Post.find()
      .sort({ date: "desc" })
      .populate("user", ["image"]);
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Server error" });
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    // delete profile
    await Post.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "post deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Server error" });
  }
});

//like - unlike a post
router.put("/likes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const isLiked = post.likes.filter(
      (like) => like.user.toString() === req.userId
    );
    console.log(isLiked);

    if (isLiked.length > 0) {
      post.likes.forEach(async (like, index) => {
        console.log("like", like);
        console.log("index", index);
        if (like.user.toString() === req.userId) {
          post.likes.splice(index, 1);
          await post.save();
        }
      });
      res.json(post.likes);
      // res.json({ likes: post.likes, status: "unlike" });
      // return res.status(400).json({ msg: "Post already liked" });
    } else {
      post.likes.push({ user: req.userId });
      await post.save();
      // res.json({ likes: post.likes, status: "like" });
      res.json(post.likes);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Server error" });
  }
});

// //Know like state for every post
// router.put("/likes/status/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     const isLiked = post.likes.filter(
//       (like) => like.user.toString() === req.userId
//     );
//     console.log(isLiked);

//     if (isLiked.length > 0) {
//       res.json({ status: "unlike" });
//     } else {
//       res.json({ status: "like" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     return res.status(404).json({ msg: "Server error" });
//   }
// });

// add comment
router.post("/comment/:id", auth, async (req, res) => {
  const { text } = req.body;

  try {
    const id = req.userId;

    const user = await User.findById(id).select("-password");
    const post = await Post.findById(req.params.id);

    const comment = {
      user: id,
      image: user.image,
      name: user.username,
      text: text,
    };

    post.comments.push(comment);
    await post.save();

    console.log(post);
    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Server error" });
  }
});

// delete comment (will protect it from frontend ( too lazy))
router.delete("/comment/:postId/:commentId", async (req, res) => {
  try {
    const id = req.userId;
    const post = await Post.findById(req.params.postId);

    post.comments.forEach(async (comment, index) => {
      console.log("comment", comment);
      console.log("index", index);
      console.log(comment._id);
      console.log(req.params.commentId);

      if (comment._id.toString() === req.params.commentId) {
        post.comments.splice(index, 1);
        await post.save();
      }
    });

    console.log("deleted");
    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Server error" });
  }
});

module.exports = router;
