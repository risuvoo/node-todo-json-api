const { rejects } = require("assert");
const fs = require("fs");

function getStudents() {
  return new Promise((resolve, rejects) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      if (err) throw err;
      const students = JSON.parse(data);
      resolve(students);
    });
  });
}

function insertStudents(students) {
  return new Promise((resolve, reject) => {
    fs.writeFile("./db.json", JSON.stringify(students), (err) => {
      resolve("Successfully added students");
    });
  });
}

module.exports.getStudents = getStudents;
module.exports.insertStudents = insertStudents;
