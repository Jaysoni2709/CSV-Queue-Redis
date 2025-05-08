const { queue } = require('../jobs/queue');

exports.getJobStatus = async (req, res) => {
  const job = await queue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  const state = await job.getState();
  const result = await job.finished().catch(() => null);

  res.json({ status: state, ...(result || {}) });
};

exports.cancelJob = async (req, res) => {
  const job = await queue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  await job.remove();
  res.json({ message: 'Job cancelled' });
};

exports.getAllJobs = async (req,res) => {
  try{
    const jobs = await queue.getJobs();
    res.json(jobs);

  }catch(e){
    console.log("🚀 ~ exports.getAllJobs= ~ e:", e)
  }
}

