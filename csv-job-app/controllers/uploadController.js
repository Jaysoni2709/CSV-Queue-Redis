const { queue } = require('../jobs/queue');

exports.uploadCSV = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: 'CSV file is required' });
    }

    const job = await queue.add({ filePath: req.file.path });


    res.json({
      message: 'File uploaded, processing started',
      jobId: job.id
    });

  } catch (error) {
    console.error("Error in uploadCSV:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
