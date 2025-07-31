require('dotenv').config();

const { Vonage } = require('@vonage/server-sdk');

const apiKey = process.env.VONAGE_API_KEY;
const apiSecret = process.env.VONAGE_API_SECRET;

if (!apiKey || !apiSecret) {
    throw new Error('VONAGE_API_KEY and VONAGE_API_SECRET must be set in the environment variables');
}

const vonage = new Vonage({
  apiKey: apiKey,
  apiSecret: apiSecret
});

module.exports = {vonage};