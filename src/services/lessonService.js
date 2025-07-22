const { Lesson } = require('../models/Lesson');
const firebaseService = require('../services/firebaseService');

const collection = 'lessons';

const lessonService = {
    // READ requests
    getAllLessons: async () => {
        return await firebaseService.getAllDocuments(collection);
    },
    getLessonById: async (id) => {
        return await firebaseService.queryByField(collection, 'id', id);
    },
    getLessonsByTeacher: async (teacherId) => {
        return await firebaseService.queryByField(collection, 'teacherId', teacherId);
    },
    getLessonsByPhone: async (phone) => {
        return await firebaseService.queryByField(collection, 'phone', phone);
    },

    // CREATE requests
    addLesson: async (lessonData) => {
        if (!lessonData.title || !lessonData.instructorId) {
            return 'title and instructorId are required to create a lesson';
        }
        try {
            const lesson = new Lesson(lessonData);
            console.log(lesson);
            return await firebaseService.addDocument(collection, lesson.toJson());
        } catch (error) {
            return `Error adding lesson: ${error.message}`;
        }
    },

    // UPDATE requests
    updateLesson: async (id, lessonData) => {
        const lesson = new Lesson(lessonData);
        return await firebaseService.updateDocument(collection, id, lesson);
    },
    // DELETE requests
    deleteLesson: async (id) => {
        return await firebaseService.deleteDocumentByPhone(collection, id);
    }
};

module.exports = lessonService;
