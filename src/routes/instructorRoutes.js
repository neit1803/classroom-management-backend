const express = require('express');
const instructorRouter = express.Router();

// GET requests
instructorRouter.get('/students', (req, res) => {
  res.send('List of students')
});

instructorRouter.get('/student/:phone', (req, res) => {
  res.send('About student')
});

// POST requests
instructorRouter.post('/addStudent', (req, res) => {
  res.send('Add a new student')
});
instructorRouter.post('/assignLesson', (req, res) => {
  res.send('Add a new lesson')
});

// DELETE requests
instructorRouter.delete('/deleteStudent/:phone', (req, res) => {
  res.send('Delete a student')
});

// PUT requests
instructorRouter.put('/editStudent/:phone', (req, res) => {
  res.send('Update a student')
});

module.exports = instructorRouter;
