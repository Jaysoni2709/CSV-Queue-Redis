const fs = require('fs');
const csv = require('fast-csv');
const User = require('../models/User');

module.exports = async function (job) {
  const errors = [];
  const success = [];
  let totalRows = 0;
  let rowIndex = 1;
  const operations = [];
  const duplicates = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(job.data.filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', reject)
      .on('data', (row) => {
        totalRows++;

        const { name, email, phone, age, city } = row;

        operations.push(
          (async () => {
            
           if (!name || typeof name !== 'string') {
            errors.push({ row: rowIndex, reason: 'Invalid or missing name' });
            return;
          }

          if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.push({ row: rowIndex, reason: 'Invalid or missing email' });
            return;
          }

          if (phone && !/^\d{10}$/.test(phone)) {
            errors.push({ row: rowIndex, reason: 'Invalid phone number' });
            return;
          }

          if (age && isNaN(age)) {
            errors.push({ row: rowIndex, reason: 'Invalid age, must be a number' });
            return;
          }
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
              duplicates.push({ row: rowIndex, email }); 
              return;
            }

            try {
              await User.create({
                name,
                email,
                phone,
                age: age ? Number(age) : null,
                city,
              });

              success.push({ row: rowIndex, name, email });
            } catch (e) {
              errors.push({ row: rowIndex, reason: 'DB insert failed: ' + e.message });
            }
          })()
        );

        rowIndex++;
      })
      .on('end', async () => {
        await Promise.all(operations);
        resolve({
          status: 'completed',
          totalRows,
          successCount: success.length,
          duplicateCount: duplicates.length,
          failed: errors.length,
          errors,
          success, // detailed successful rows
          duplicates
        });
      });
  });
};
