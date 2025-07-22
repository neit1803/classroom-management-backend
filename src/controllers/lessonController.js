const lessonService = require('../services/lessonService');
const Lesson = require('../models/Lesson');

const LessonController = {
    // GET requests
    getAllLessons: async (req, res) => {
        const lessons = await lessonService.getAllLessons();
        return res.send(lessons);
    },

    getLessonByPhone: async (req, res) => {
        const lesson = await lessonService.getLessonByPhone(req.params.phone);
        return res.send(lesson);
    },

    // POST requests
    addLesson: async (req, res) => {
        const result = await lessonService.addLesson(req.body);
        return res.send(result);
    },

    // PUT requests
    updateLesson: async (req, res) => {
        const result = await lessonService.updateLesson(req.params.id, req.body);
        return res.send(result);
    },

    // DELETE requests
    deleteLesson: async (req, res) => {
        const result = await lessonService.deleteLesson(req.params.id);
        return res.send(result);
    }
}

module.exports = LessonController;
