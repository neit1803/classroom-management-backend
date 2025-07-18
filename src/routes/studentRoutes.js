const express = require('express');
const {getStudentLessons, markLessonAsDone, updateProfile} = require('../controllers/studentController');
const studentRouter = express.Router();

// GET requests
studentRouter.get('/myLessons', getStudentLessons);

// POST requests
studentRouter.post('/markLessonDone', markLessonAsDone);

// PUT requests
studentRouter.put('/editProfile', updateProfile);

module.exports = studentRouter;
