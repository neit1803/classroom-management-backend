const redisClient = require('../config/redis');

const access_token_expiresIn = 60 * 10; // 1 hour


class RedisService {
    async saveAccessToken(phoneNumber, accessToken) {
        await redisClient.set(`access_token:${phoneNumber}`, accessToken, 'EX', access_token_expiresIn);
    }

    async getAccessToken(phoneNumber) {
        return await redisClient.get(`access_token:${phoneNumber}`);
    }

    async deleteAccessToken(phoneNumber) {
        await redisClient.del(`access_token:${phoneNumber}`);
    }
}