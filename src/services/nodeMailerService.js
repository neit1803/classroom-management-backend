require('dotenv').config();
const { transporter } = require('../config/nodemailer');

class NodeMailerService {
    async sendVerifyMail(to, accessCode) {
        const verificationLink = `${process.env.FRONTEND_VERIFY_URL || 'http://localhost:3000'}/${accessCode}`;
        try {
            const info = await transporter.sendMail({
                from: `"Classroom Support" <${process.env.NODEMAILER_USER}>`,
                to,
                subject: 'Verify Your Classroom Account', 
                text: `Click this link to verify and setup your account: ${verificationLink}`,
                html: `
                    <p>Hello,</p>
                    <p>Thank you for joining Classroom. Please click the button below to verify your email and set up your account:</p>
                    <p><a href="${verificationLink}" style="display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Verify Account</a></p>
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p>${verificationLink}</p>
                `
            });
            return { success: true, message: `Email ${info.messageId} sent successfully` };
        } catch (error) {
            return { success: false, message: `Error sending email: ${error.message}` };
        }
    }
}

module.exports = new NodeMailerService();