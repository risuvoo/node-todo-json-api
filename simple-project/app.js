const express = require("express");
const app = express();
const studentRouter = require("./routers/studentRouter");
app.use(express.json());
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/my-student-new")
  .then((er) => {
    console.log("Connected to MongoDB!");
  })
  .catch(() => {
    console.error("Failed to connect to MongoDB!");
  });

app.use("/api/students", studentRouter);
app.get("/", (req, res) => {
  res.send("Hello from express js!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
