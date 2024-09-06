require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
app.get("/", (req, res) => {
  res.send("hello from express.js");
});

// get request
app.get("/api/students", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    const students = JSON.parse(data);
    res.send(students);
  });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(` listening on port  ${port}`);
});
