const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const multer = require("multer");
const config = require("config");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });
const router = express.Router();

router.post(
  "/register",

  body("username").not().isEmpty().withMessage("username is required"),
  body("gender").not().isEmpty().withMessage("gender is required"),
  body("email").isEmail().withMessage("invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be more than 5 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, gender, email, password } = req.body;

      // check if user exists
      const isTaken = await User.findOne({ email });
      if (isTaken) {
        return res
          .status(400)
          .json({ errors: [{ msg: " User already exists!!" }] });
      }

      // hash password
      const HashedPassword = await bcrypt.hash(password, 10);
      // register
      const user = await User.create({
        username,
        email,
        gender,
        password: HashedPassword,
      });

      const token = await jwt.sign({ id: user.id }, config.get("jwtSecret"));
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }

    console.log(req.body);
    // res.send("user works");
  }
);

// /api/users/img
// router.post("/img", auth, upload.single("image"), async (req, res) => {
//   let user = await User.findOne({ _id: req.userId });

//   console.log("req.file");
//   res.json(user);
// });
module.exports = router;
