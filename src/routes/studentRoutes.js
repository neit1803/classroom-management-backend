const express = require('express');
const studentRouter = express.Router();

// GET requests
studentRouter.get('/myLessons', (req, res) => {
  res.send('List of student\'s lessons')
});

// POST requests
studentRouter.post('/markLessonDone', (req, res) => {
  res.send('Mark lesson as done')
});

// PUT requests
studentRouter.put('/editProfile', (req, res) => {
  res.send('Update profile')
});

module.exports = studentRouter;
