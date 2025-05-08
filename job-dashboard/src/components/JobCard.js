import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>Job ID: {job.id}</h3>
      <p>Status: <strong>{job.returnvalue?.status || 'failed'}</strong></p>
      <p>Total Rows: {job.returnvalue?.totalRows || 0}</p>
      <p>Success: {job.returnvalue?.successCount || 0}</p>
      <p>Duplicate: {job.returnvalue?.duplicateCount || 0}</p>
      <p>Failed: {job.returnvalue?.failed || 0}</p>
    </div>
  );
};

export default JobCard;
