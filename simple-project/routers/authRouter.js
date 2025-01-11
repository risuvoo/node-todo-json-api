const express = require("express");
const { User } = require("./../models/users/users");
const bcrypt = require("bcrypt");
const router = express.Router();
const authUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Email or Password");
  }
  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) {
    return res.status(400).send("Invalid Email or Password");
  } else {
    const token = user.generateJWT();
    return res.status(200).send({
      message: "Login Successfully",
      data: {
        email: user.email,
        access_token: token,
      },
    });
  }
};

router.route("/").post(authUser);

module.exports = router;
