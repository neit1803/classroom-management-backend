const firebaseService = require('../services/firebaseService');
const { Timestamp } = require('firebase-admin/firestore');

const collection = "AccessCodes";

class AuthService {
    async createAccessCode(phoneNumber) {
        if (!phoneNumber) {
            return 'Phone number is required to create an access code';
        }
        try {
            const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

            await firebaseService.addDocumentWithId(collection, phoneNumber, accessCode);
            // return {message: 'Access code created successfully'};
            return accessCode;
        } catch (error) {
            return `Error creating access code: ${error.message}`;
        }
    }    

    async validateAccessCode(phoneNumber, code) {
        if (!phoneNumber || !code) {
            return 'Phone number and code are required for validation';
        }
        try {
            const accessCodes = await firebaseService.queryByField(collection, 'phoneNumber', phoneNumber);
            if (accessCodes.length === 0) {
                return 'No access code found for this phone number';
            }
            const validCode = accessCodes.find(ac => ac.code === code);
            if (validCode) {
                return 'Access code is valid';
            } else {
                return 'Invalid access code';
            }
        } catch (error) {
            return `Error validating access code: ${error.message}`;
        }
    }
}

module.exports = new AuthService();