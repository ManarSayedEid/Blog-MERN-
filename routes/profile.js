const express = require("express");
const multer = require("multer");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const auth = require("../middleware/auth");
const Post = require("../models/post");
const Profile = require("../models/Profile");
const User = require("../models/User");
// const Post = require("../models/Post");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./downloads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

////////////////////////////////// api/profile //////////////////////////////////

// get user profile
router.get("/me", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.userId });

    if (!profile) {
      profile = await Profile.create({ user: req.userId });
      profile = await Profile.findOne({ user: req.userId }).populate("user", [
        "username",
        "email",
      ]);
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Something went wrong!" });
  }
});

// create or update pofile

router.post("/", auth, async (req, res) => {
  const { bio, facebook, linkedin, github } = req.body;

  let profile = await Profile.findOne({ user: req.userId });

  const profileField = {
    user: req.userId,
    bio: bio ? bio : profile.bio,
    social: profile.social
      ? {
          facebook: facebook ? facebook : profile.social.facebook,
          linkedin: linkedin ? linkedin : profile.social.facebook,
          github: github ? github : profile.social.facebook,
        }
      : {
          facebook: facebook ? facebook : "",
          linkedin: linkedin ? linkedin : "",
          github: github ? github : "",
        },
    // image: (req.file && req.file.path) || profile.image,
  };

  try {
    // check if it update or create
    // let profile = await Profile.findOne({ user: req.userId });

    // if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { $set: profileField },
      { new: true }
    );
    // }

    // profile = await Profile.create(profileField);
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
});

/////// get all users
// will not be in the site
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["username"]);

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// get diff user profile by id
router.get("/user/:id", async (req, res) => {
  try {
    let profile = await Profile.find({ user: req.params.id }).populate("user", [
      "username",
      "image",
    ]);

    console.log(profile);
    profile = profile[0];
    console.log(profile);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// delete profile - user
router.delete("/", auth, async (req, res) => {
  try {
    // delete profile
    await Profile.findOneAndRemove({ user: req.userId });

    // delete user
    await User.findOneAndRemove({ _id: req.userId });

    //delete hos post
    await Post.deleteMany({ user: req.userId });

    res.json({ msg: "user deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// /api/users/img
router.post("/img", auth, upload.single("image"), async (req, res) => {
  console.log("req.file");
});

module.exports = router;
