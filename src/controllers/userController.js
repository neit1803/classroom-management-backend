const firebaseService = require('../services/firebaseService');

const UserController = {
  // GET requests
  getAllStudents: async (req, res) => {
    const students = await firebaseService.getAllDocuments('students');
    return res.send(students);
  },

  getStudentByPhone:  async (req, res) => {
    const student = await firebaseService.queryByField('students', 'phone', req.params.phone);
    return res.send(student);
  },

  getStudentLessons: async(req, res) => {
      return res.send(await firebaseService.queryByField('lessons', 'phone', req.params.id));
  },

  // POST requests
  addStudent: async (req, res) => {
    const result = await firebaseService.addDocument('students', req.body);
    return res.send(result);
  },

  addLesson: async (req, res) => {
    const result = await firebaseService.addDocument('lessons', req.body);
    return res.send(result);
  },


  // PUT requests
  markLessonDone: async (req, res) => {
      return res.send(await firebaseService.updateDocument('lessons', req.params.id, { status: 'done' }));
  },

  editStudent: async (req, res) => {
      return res.send(await firebaseService.updateDocument('students', req.params.phone, req.body));
  },
  
  editProfile: async (req, res) => {
      return res.send(await firebaseService.updateDocument('students', req.params.id, req.body));
  },

  // DELETE requests
  deleteStudent: async (req, res) => {
    const result = await firebaseService.deleteDocument('students', req.params.phone);
    return res.send(result);
  }
}

module.exports = UserController;