const express = require("express");
const router = express.Router();
const getStudents = (req, res) => {};
const createStudent = (req, res) => {
  const newStudent = req.body;
};

const getSingleStudent = (req, res) => {
  const id = parseInt(req.params.id);
};

const getUpdateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedStudent = req.body;
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
};

router.route("/").get(getStudents).post(createStudent);
router
  .route("/:id")
  .get(getSingleStudent)
  .put(getUpdateStudent)
  .delete(deleteStudent);

module.exports = router;
