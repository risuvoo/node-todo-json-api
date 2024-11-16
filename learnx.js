const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello from Express.js");
});

// ====== get and post ===
// app.get("/api/students", (req, res) => {
//   fs.readFile("./db.json", "utf-8", (err, data) => {
//     if (err) throw err;
//     const students = JSON.parse(data);
//     res.send(students);
//   });
// });
// app.post("/api/students", (req, res) => {
//   const newStudent = req.body;
//   fs.readFile("./db.json", "utf-8", (err, data) => {
//     if (err) throw err;
//     const students = JSON.parse(data);
//     students.push(newStudent);
//     fs.writeFile("./db.json", JSON.stringify(students), (err) => {
//       res.send(newStudent);
//     });
//   });
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
