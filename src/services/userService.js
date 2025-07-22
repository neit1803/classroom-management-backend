const { User } = require('../models/User');
const firebaseService = require('../services/firebaseService');

const collection = 'users';

const userService = {
    // READ requests
    getAllStudents: async () => {
        return await firebaseService.getAllDocuments(collection);
    },

    getStudentByPhone: async (phone) => {
        return await firebaseService.queryByField(collection, 'phone', phone);
    },

    getStudentByEmail: async (email) => {
        return await firebaseService.queryByField(collection, 'email', email);
    },

    // CREATE requests
    addUser: async (studentData) => {
        // if (studentData.email.contains('@') === false || studentData.email.includes(' ')) {
        //     return 'Invalid email format';
        // }
        if (studentData.phone.length < 10 || studentData.phone.length > 15 || !/^\d+$/.test(studentData.phone)) {
            return 'Invalid phone number format';
        }
        if (!studentData.email || !studentData.phone) {
            return 'Email and phone are required to create a user';
        }
        if (await userService.getStudentByEmail(studentData.email).then(existingUser => existingUser.length > 0)) {
            console.log(userService.getStudentByEmail(studentData.email));
            return 'User with this email already exists';
        }
        if (await userService.getStudentByPhone(studentData.phone).then(existingUser => existingUser.length > 0)) {
            return 'User with this phone number already exists';
        }

        try {
            const user = new User(studentData);
            return await firebaseService.addDocument(collection, user.toJson());
        } catch (error) {
            return `Error adding user: ${error.message}`;
        }
    },

    // UPDATE requests
    updateStudent: async (phone, studentData) => {
        const user = new User(studentData);
        return await firebaseService.updateDocument(collection, phone, user);
    },

    // DELETE requests
    deleteUser: async (phone) => {
        return await firebaseService.deleteDocumentByPhone(collection, phone);
    }
}

module.exports = userService;