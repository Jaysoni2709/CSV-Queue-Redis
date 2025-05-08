const Queue = require('bull');
const path = require('path');
require('dotenv').config();

const queue = new Queue('csv-import', {
  redis: { host: '127.0.0.1', port: 6379 }
});

queue.process(path.join(__dirname, 'processor.js'));

module.exports = { queue };
