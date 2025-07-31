const { Lesson } = require('../models/Lesson');
const firebaseService = require('../services/firebaseService');

const collection = 'lessons';

class LessonService {
    // READ requests
    async getAllLessons() {
        return await firebaseService.getAllDocuments(collection);
    }

    async getLessonById(id) {
        return await firebaseService.queryByField(collection, 'id', id);
    }

    async getLessonsByInstructor (instructorId) {
        return await firebaseService.queryByField(collection, 'instructorId', instructorId);
    }

    async getLessonByStudentPhone (phone){
        return await firebaseService.queryByFieldWithContain(collection, collection, phone);
    }

    // CREATE requests
    async addLesson(lessonData){
        if (!lessonData.title || !lessonData.instructorId) {
            return 'title and instructorId are required to create a lesson';
        }
        try {
            const lesson = new Lesson(lessonData);
            return await firebaseService.addDocument(collection, lesson.toJson());
        } catch (error) {
            return `Error adding lesson: ${error.message}`;
        }
    }

    // UPDATE requests
    async updateLesson(id, lessonData) {
        const lesson = new Lesson(lessonData);
        return await firebaseService.updateDocument(collection, id, lesson.toJson());
    }

    // DELETE requests
    async deleteLesson(id) {
        return await firebaseService.deleteDocumentById(collection, id);
    }
}

module.exports = new LessonService();
