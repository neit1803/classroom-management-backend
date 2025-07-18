const express = require('express');
const { 
  getAllStudents, 
  getStudentByPhone, 
  addStudent, 
  addLesson,
  deleteStudent,
  editStudent 
} = require('../controllers/instructorController');
const instructorRouter = express.Router();

// GET requests
instructorRouter.get('/students', getAllStudents);
instructorRouter.get('/student/:phone', getStudentByPhone);

// POST requests
instructorRouter.post('/addStudent', addStudent);
instructorRouter.post('/assignLesson', addLesson);

// DELETE requests
instructorRouter.delete('/deleteStudent/:phone', deleteStudent);

// PUT requests
instructorRouter.put('/editStudent/:phone', editStudent);

module.exports = instructorRouter;
