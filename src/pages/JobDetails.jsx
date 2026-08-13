
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://job-portal-z64j.onrender.com/api/jobs/${id}`
        );

        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Job not found");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="job-details">
        <h2>Loading job details...</h2>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-details">
        <h2>Job Not Found</h2>
        <Link to="/">Back to Jobs</Link>
      </div>
    );
  }

  const requirements = [
    "Good knowledge of JavaScript",
    "React.js fundamentals",
    "Node.js and Express.js",
    "MongoDB basics",
    "REST API knowledge",
  ];

  return (
    <div className="job-details">
      <Link to="/" className="back-link">
        ← Back to Jobs
      </Link>

      <h1>{job.title}</h1>

      <h2>{job.company}</h2>

      <p>📍 {job.location}</p>
      <p>💼 {job.type}</p>
      <p>💰 {job.salary}</p>

      <hr />

      <h2>Job Description</h2>

      <p>
        We are looking for a talented {job.title} to join our team and work on
        modern web applications and exciting technology projects.
      </p>

      <h2>Requirements</h2>

      <ul>
        {requirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>

      <Link to={`/apply/${job.id}`}>
        <button className="apply-btn">Apply Now</button>
      </Link>
    </div>
  );
}

export default JobDetails;
