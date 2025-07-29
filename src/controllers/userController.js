const userService = require('../services/userService');
const User= require('../models/User');

const UserController = {
  // GET requests
  getAllUsers: async (req, res) => {
    const users = await userService.getAllUsers();
    return res.send(users);
  },

  getUserByRole: (role) => {
    return async (req, res) => {
      const users = await userService.getAllUserByRole(role.toUpperCase());
      return res.send(users);
    };
  },

  getUserDetailByPhone:  async (req, res) => {
    const user = await userService.getDetailedUserByPhone(req.params.phone);
    return res.send(user);
  },

  // POST requests
  addStudent: async (req, res) => {
    const result = await userService.addStudent(req.body);
    return res.send(result);
  },


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