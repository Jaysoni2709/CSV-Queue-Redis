const express = require('express');
const router = express.Router();
const { getJobStatus, cancelJob, getAllJobs } = require('../controllers/jobController');

router.get('/:id/status', getJobStatus);
router.delete('/:id', cancelJob);
router.get('/getJobs', getAllJobs);

module.exports = router;
