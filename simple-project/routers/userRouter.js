const express = require("express");
const { User } = require("./../models/users/users");
const bcrypt = require("bcrypt");
const authorize = require("../Middlewares/authorize");
const router = express.Router();

const newUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists.");
  }
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    const savedUser = await user.save();
    const token = user.generateJWT();
    res.send({
      access_token: token,
      data: {
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};

router.route("/").post(newUser);
router.route("/me").get(authorize, (req, res) => {
  res.send(req.user); // req.user is my payload  when i create a user model then i will add a method in user model which is generateJWT()
});

module.exports = router;
