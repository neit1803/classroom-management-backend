const firebaseService = require('../services/firebaseService');
const AuthService = require('../services/authService');

const AuthController = {
    createAccessCode: async (req, res) => {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).send({ error: 'Phone number is required' });
        }
        res.send(await AuthService.createAccessCode(phoneNumber));
    },

    validateAccessCode: async (req, res) => {
        res.send(await AuthService.validateAccessCode(req.body.phoneNumber, req.body.code));
    }
};

module.exports = AuthController;    