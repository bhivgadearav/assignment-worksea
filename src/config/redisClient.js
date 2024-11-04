const redis = require('redis');
const client = redis.createClient();

client.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Failed to connect to Redis:', err));

module.exports = client;
