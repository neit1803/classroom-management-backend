const { User } = require('../models/User');
const { Lesson } = require('../models/Lesson');

const firebaseService = require('../services/firebaseService');
const lesssonService = require('../services/lessonService');

const collection = 'users';

class UserService {
    // READ requests
    async getAllUsers() {
        const users = await firebaseService.getAllDocuments(collection);
        return users.map(user => User.fromJson(user).toFilteredJson());
    }

    async getAllUserByRole(role) {
        const users = await firebaseService.queryByField(collection, 'role', role);
        return users.map(user => User.fromJson(user));
    }

    async getDetailedUserByPhone(phone) {
        const student = await firebaseService.queryByField(collection, 'phone', phone);
        const lessons = await lesssonService.getLessonByStudentPhone(phone)
            .then(lessons => lessons.map(
                lesson => Lesson.fromJson(lesson).toFilteredJson()
            ));
        return {
            ...student[0],
            lessons: lessons
        }
    }

    async getUserByEmail(email) {
        return await firebaseService.queryByFields(collection, { email: email });
    }

    // CREATE requests
    async addStudent(studentData) {
        if (studentData.phone.length < 10 || studentData.phone.length > 15 || !/^\d+$/.test(studentData.phone)) {
            return 'Invalid phone number format';
        }
        if (!studentData.email || !studentData.phone) {
            return 'Email and phone are required to create a user';
        }
        if (await userService.getUserByEmail(studentData.email, 'student').then(existingUser => existingUser.length > 0)) {
            return 'User with this email already exists';
        }
        if (await userService.getDetailedUserByPhone(studentData.phone, 'student').then(existingUser => existingUser.length > 0)) {
            return 'User with this phone number already exists';
        }

        try {
            const user = new User(studentData);
            return await firebaseService.addDocument(collection, user.toJson());
        } catch (error) {
            return `Error adding user: ${error.message}`;
        }
    }

    // UPDATE requests
    async updateStudent (phone, studentData) {
        const user = new User(studentData);
        return await firebaseService.updateDocument(collection, phone, user);
    }

    // DELETE requests
    async deleteUser(phone) {
        return await firebaseService.deleteDocumentByPhone(collection, phone);
    }
}

module.exports = new UserService();