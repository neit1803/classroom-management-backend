const userService = require('../services/userService');
const User= require('../models/User');

const UserController = {
  // GET requests
  getAllStudents: async (req, res) => {
    const students = await userService.getAllStudents();
    return res.send(students);
  },

  getStudentByPhone:  async (req, res) => {
    const student = await userService.getStudentByPhone(req.params.phone);
    return res.send(student);
  },

  getStudentLessons: async (req, res) => {
    const lessons = await userService.getStudentLessons(req.user.phone);
    return res.send(lessons);
  },

  // POST requests
  addStudent: async (req, res) => {
    const result = await userService.addUser(req.body);
    return res.send(result);
  },

  // addLesson: async (req, res) => {
  //   const result = await firebaseService.addDocument(lessonCollection, req.body);
  //   return res.send(result);
  // },


  // PUT requests
  editStudent: async (req, res) => {
      return res.send(await userService.updateStudent(req.params.phone, req.body));
  },
  
  editProfile: async (req, res) => {
      return res.send(await userService.updateStudent(req.params.id, req.body));
  },

  // DELETE requests
  deleteStudent: async (req, res) => {
    const result = await userService.deleteUser(req.params.phone);
    return res.send(result);
  }
}

module.exports = UserController;