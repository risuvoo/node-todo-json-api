const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
let userSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role, email: this.email, name: this.name },
    process.env.JWT_SECRET
  );
  return token;
};

const User = model("User", userSchema);

module.exports.User = User;
