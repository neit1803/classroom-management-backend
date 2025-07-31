const { vonage } = require('../config/vonage');

class VonageService {
    async sendSMS(destinationPhone, code) {
        const formattedPhone = destinationPhone.startsWith('+')?
            destinationPhone  : `84${destinationPhone.replace(/^0/, '')}`;      

        const text = `Your verification code is: ${code}`;

        try {
            const verification = await vonage.sms.send({
                to: formattedPhone,
                from: "Vonage APIs",
                text: text
            })
            console.log(text);
            return "SMS sent successfully";
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw error;
        }
    }
}

module.exports = new VonageService();
