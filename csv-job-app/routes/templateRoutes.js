const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const template = [
    ['name', 'email', 'phone', 'age', 'city'],
    ['John Doe', 'john@example.com', '9876543210', '30', 'New York'],
    ['Jane Smith', 'jane@example.com', '1234567890', '28', 'Los Angeles'],
  ];

  const filePath = path.join(__dirname, '../templates/csv-template.csv');
  const fileStream = fs.createWriteStream(filePath);

  template.forEach(row => fileStream.write(row.join(',') + '\n'));
  fileStream.end();

  fileStream.on('finish', () => {
    res.download(filePath, 'csv-template.csv', (err) => {
      if (err) {
        console.error('Error during download:', err);
      }
      fs.unlinkSync(filePath);
    });
  });
});

module.exports = router;
