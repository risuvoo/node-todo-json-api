const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/my-student-new")
  .then((er) => {
    console.log("Connected to MongoDB!");
  })
  .catch(() => {
    console.error("Failed to connect to MongoDB!");
  });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
