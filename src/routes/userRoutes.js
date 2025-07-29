const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// GET requests
userRouter.get('/students', userController.getUserByRole('student'));
userRouter.get('/student/:phone', userController.getUserDetailByPhone);

userRouter.get('/instructors', userController.getUserByRole('instructor'));

// POST requests
userRouter.post('/addStudent', userController.addStudent);

// PUT requests
userRouter.put('/editProfile', userController.editProfile);
userRouter.put('/editStudent/:phone', userController.editProfile);

// DELETE requests
userRouter.delete('/deleteStudent/:phone', userController.deleteStudent);

module.exports = userRouter;
