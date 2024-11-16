// // import http
// const http = require("http");

// // define server
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("hello world");
//     res.end();
//   }

//   if (req.url === "/students") {
//     res.write(
//       JSON.stringify([
//         {
//           name: "karim",
//         },
//         {
//           name: "rahim",
//         },
//       ])
//     );
//     res.end();
//   }
// });

// // listen server
// server.listen(3000); // listen on port 3000

// console.log("Server is running on port 3000");

console.log("line 1");

// students(1, (student) => {
//   console.log(student);
//   courses(student, (course) => {
//     console.log(course);
//     studentQuiz(course, (quiz) => {
//       console.log(quiz);
//     });
//   });
// });

/* now we are fetching callback fetching issue
 * solved with method 1 using named function
 */

//method 1

// students(1, getStudents);

// const getStudentQuiz = (quiz) => {
//   console.log(quiz);
// };
// const getCourses = (courses) => {
//   console.log(courses);
//   studentQuiz(courses, getStudentQuiz);
// };

// const getStudents = (student) => {
//   console.log(student);
//   courses(student, getCourses);
// };

// console.log("line 3");

// function students(id, func) {
//   setTimeout(() => {
//     func({ id: id, name: "suvo" });
//   }, 3000);
// }

// function courses(student, func) {
//   setTimeout(() => {
//     func({
//       id: student.id,
//       name: student.name,
//       courses: [
//         {
//           id: 1,
//           name: "math",
//         },
//         {
//           id: 2,
//           name: "english",
//         },
//       ],
//     });
//   }, 2000);
// }

// function studentQuiz(student, func) {
//   setTimeout(() => {
//     func({
//       id: student.id,
//       name: student.name,
//       courses: student.courses,
//       quiz: {
//         math: 85,
//         english: 90,
//       },
//     });
//   }, 1000);
// }

students(1, getStudents);

function getStudentQuiz(quiz) {
  console.log(quiz);
}

function getCourses(courses) {
  console.log(courses);
  studentQuiz(courses, getStudentQuiz);
}

function getStudents(student) {
  console.log(student);
  courses(student, getCourses);
}

console.log("line 3");

function students(id, func) {
  setTimeout(() => {
    func({ id: id, name: "suvo" });
  }, 3000);
}

function courses(student, func) {
  setTimeout(() => {
    func({
      id: student.id,
      name: student.name,
      courses: [
        {
          id: 1,
          name: "math",
        },
        {
          id: 2,
          name: "english",
        },
      ],
    });
  }, 2000);
}

function studentQuiz(student, func) {
  setTimeout(() => {
    func({
      id: student.id,
      name: student.name,
      courses: student.courses,
      quiz: {
        math: 85,
        english: 90,
      },
    });
  }, 1000);
}
