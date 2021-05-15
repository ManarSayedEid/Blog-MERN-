const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

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

  const profileField = {};
  profileField.user = req.userId;
  profileField.social = {};

  if (bio) profileField.bio = bio;
  if (facebook) profileField.social.facebook = facebook;
  if (linkedin) profileField.social.linkedin = linkedin;
  if (github) profileField.social.github = github;

  console.log(profileField);

  try {
    // check if it update or create
    // let profile = await Profile.findOne({ user: req.userId });

    // if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { $set: profileField },
      { new: true }
    );
    return res.json(profile);
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
    const profile = await Profile.find({ user: req.params.id }).populate(
      "user",
      ["username"]
    );

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

    res.json({ msg: "user deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
