const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // // get the from header req

  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  token = token.split(" ")[1].trim();
  ////verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    // // error message
  } catch (err) {
    return res.status(400).send("Invalid token.");
  }
};
