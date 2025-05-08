// utils/multerConfig.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.csv') return cb(new Error('Only CSVs allowed'), false);
  cb(null, true);
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
