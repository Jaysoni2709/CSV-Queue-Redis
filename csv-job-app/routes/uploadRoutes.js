const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig');
const { uploadCSV } = require('../controllers/uploadController');

router.post('/',upload.single('file'), uploadCSV);

module.exports = router;
