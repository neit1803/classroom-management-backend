const firebaseService = require('../services/firebaseService');

const createAccessCode = async (req, res) => {
    res.send(("Access code created successfully"));
}

const validateAccessCode = async (req, res) => {
    res.send(("Valid access code"));
}

module.exports = {
    createAccessCode,
    validateAccessCode
}