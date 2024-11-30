const express = require("express");
const { Student } = require("./../models/students");
const router = express.Router();

// express and mongodb crud operations
const getStudents = async (req, res) => {
  const students = await Student.find().sort({ name: 1 });
  try {
    res.send(students);
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};
const createStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    const result = await newStudent.save();
    res.send(result);
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};

const getSingleStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.send(student);
  } catch (err) {
    return res.status(404).send("Student not found");
  }
};

const getUpdateStudent = async (req, res) => {
  const id = req.params.id;
  try {
    // findByIdAndUpdate: this function work both id and request body in the same time first finding the student id and updating the student
    // { new : true} : this parameter is used for update request response otherwise it will show previous data
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.send(student);
  } catch (err) {
    return res.status(404).send("Student not found");
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    // findByIdAndDelete: this function work delete student id first find student id and then delete the student
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.send(student);
  } catch (err) {
    return res.status(404).send("Student not found");
  }
};

// this routes use for two operations 1 is get all students and 2 is create a new student
router.route("/").get(getStudents).post(createStudent);
// this routes use for 3 operations 1 is get single student and 2 is update a student and 3 is delete a student
router
  .route("/:id")
  .get(getSingleStudent)
  .put(getUpdateStudent)
  .delete(deleteStudent);

module.exports = router;
