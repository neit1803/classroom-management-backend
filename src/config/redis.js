const redis = reqquire('redis');
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD
});

if(!REDIS_HOST || !REDIS_PORT) {
  throw new Error('Redis host and port must be defined in environment variables');
}

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
