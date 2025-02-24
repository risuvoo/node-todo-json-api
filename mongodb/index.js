const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/my-students")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error connecting to db");
  });

//   schema -> defilne then shape doncuments

const studentSchema = new mongoose.Schema({
  fname: { type: "string" },
  lname: { type: "string", required: [true, "Please enter last name"] },
  dob: {
    type: Date,
    validate: {
      validator: (value) => value > new Date("1 January 2023"),
      message: "Date of birth should be before 1 January 2023",
    },
  },
  entryDate: { type: Date, default: Date.now() },
  passed: Boolean,
  hobbies: {
    type: Array,
    of: String,
    validate: {
      validator: (value) => value.length > 0,
      message: "Please enter at least one hobby",
    },
  },
  parent: {
    father: String,
    mongoose: String,
  },
  subject: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
});

// model
const Student = mongoose.model("Student", studentSchema);

// create a new student
async function createStudent() {
  try {
    const data = await Student.create({
      fname: "RI",
      // lname: "Suvo",
      dob: new Date("1990-05-15"),
      passed: true,
      hobbies: [],
      parent: {
        father: "John's Father",
        mother: "John's Mother",
      },
      subject: [
        { name: "Math", marks: 90 },
        { name: "English", marks: 85 },
        { name: "Science", marks: 95 },
      ],
    });
    console.log(data);
  } catch (err) {
    // console.log(err.message);

    for (field in err.errors) {
      console.log(err.errors[field].message);
    }
  }
}
createStudent();

// read student data
async function readStudents() {
  try {
    const studentData = await Student.find()
      .limit(10)
      .sort({ fname: 1 })
      .select({ fname: 1, hobbies: 1, passed: 1 });

    console.log(studentData);
  } catch (err) {
    console.log(err);
  }
}

// readStudents();

// update student data

async function updateStudent(id) {
  try {
    const student = await Student.updateOne(
      { _id: id },
      {
        $set: { passed: false },
      }
    );
    console.log(student);
  } catch (err) {
    console.log(err);
  }
}

// updateStudent("6744945c8ed5ce2ee61ff442");

//delete student

async function deleteStudent(id) {
  try {
    const student = await Student.deleteOne({ _id: id });
    console.log(student);
  } catch (err) {
    console.log(err);
  }
}

// deleteStudent("6744945c8ed5ce2ee61ff442");
