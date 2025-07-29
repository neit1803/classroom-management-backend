const express = require('express');
const lessonController = require('../controllers/lessonController');
const lessonRouter = express.Router();

lessonRouter.use(express.json());
lessonRouter.use(express.urlencoded({ extended: true }));

// GET requests
lessonRouter.get('/lessons', lessonController.getAllLessons);
lessonRouter.get('/myLessons/:phone', lessonController.getStudentLessonByPhone);

// POST requests
lessonRouter.post('/assignLesson', lessonController.addLesson);

// PUT requests
lessonRouter.put('/updateLesson/:id', lessonController.updateLesson);

// DELETE requests
lessonRouter.delete('/deleteLesson/:id', lessonController.deleteLesson);

module.exports = lessonRouter;