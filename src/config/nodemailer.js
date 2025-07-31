const nodemailer = require('nodemailer');

const { NODEMAILER_USER, GOOGLE_APP_PASSWORD } = process.env;

if (!NODEMAILER_USER || !GOOGLE_APP_PASSWORD) {
    throw new Error('NODEMAILER user and password must be defined in environment variables'); 
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_USER,
        pass: GOOGLE_APP_PASSWORD
    }
});

module.exports = { transporter };