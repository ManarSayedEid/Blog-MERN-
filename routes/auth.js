const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

///// login

router.post(
  "/login",
  body("email").isEmail().withMessage("invalid email"),
  body("password").exists().withMessage("password is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // check if user does not exist
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid email or password" }] });
      }

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid email or password" }] });
      }

      const token = await jwt.sign({ id: user.id }, config.get("jwtSecret"));
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
    console.log(req.body);
  }
);

module.exports = router;
