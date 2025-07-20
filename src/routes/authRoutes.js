const express = require('express');
const { createAccessCode, validateAccessCode} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));

// POST requests
authRouter.post('/createAccessCode', createAccessCode);
authRouter.post('/validateAccessCode', validateAccessCode);

module.exports = authRouter;
