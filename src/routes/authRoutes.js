const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));

// POST requests
authRouter.post('/createAccessCode', authController.createAccessCode);
authRouter.post('/validateAccessCode', authController.validateAccessCode);

module.exports = authRouter;
