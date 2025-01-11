const express = require("express");
const app = express();
const studentRouter = require("./routers/studentRouter");
const userRouter = require("./routers/userRouter");
const authUser = require("./routers/authRouter.js");
const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// for getting json format
app.use(express.json());

app.use("/api/students", studentRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authUser);
app.get("/", (req, res) => {
  res.send("Hello from express js!");
});

module.exports = app;
