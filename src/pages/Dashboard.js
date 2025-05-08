import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        await axios.get('http://localhost:3000/jobs/getJobs').then((res) => {
            const sortedJobs = res.data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            setJobs(sortedJobs);
          })
          .catch((err) => console.error('Error fetching jobs:', err));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Job Uploads</h2>
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
};

export default Dashboard;
