const express = require("express");
const router = express.Router();
const db = require("./../../db");
const getStudents = (req, res) => {
  db.getStudents().then((students) => {
    res.send(students);
  });
};
const createStudent = (req, res) => {
  const newStudent = req.body;
  db.getStudents().then((students) => {
    students.push(newStudent);
    db.insertStudents(students).then(() => {
      res.send(newStudent);
    });
  });
};

const getSingleStudent = (req, res) => {
  const id = parseInt(req.params.id);
  db.getStudents().then((students) => {
    const student = students.find((student) => student.id === id);
    if (!student) res.status(404).send("No found");
    else res.status(200).send(student);
  });
};

const getUpdateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedStudent = req.body;
  db.getStudents().then((students) => {
    const index = students.findIndex((student) => student.id === id);
    if (index === -1) res.status(404).send("No found");
    else {
      students[index] = updatedStudent;
      db.insertStudents(students).then(() => {
        res.send(updatedStudent);
      });
    }
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  db.getStudents().then((students) => {
    const index = students.findIndex((student) => student.id === id);
    if (index === -1) res.status(404).send("No found");
    else {
      students.splice(index, 1);
      db.insertStudents(students).then(() => {
        res.send(students);
      });
    }
  });
};

router.route("/").get(getStudents).post(createStudent);
router
  .route("/:id")
  .get(getSingleStudent)
  .put(getUpdateStudent)
  .delete(deleteStudent);

module.exports = router;
