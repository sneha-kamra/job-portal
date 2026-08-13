
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ApplyJob() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5001/api/applications", {
        jobId: id,
        ...formData,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Application error:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="application-success">
        <h1>Application Submitted! 🎉</h1>

        <p>
          Thank you, {formData.name}. Your application has been submitted
          successfully.
        </p>

        <p>We have received your application.</p>
      </div>
    );
  }

  return (
    <div className="apply-page">
      <h1>Apply for Job</h1>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone</label>

        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Resume Link</label>

        <input
          type="text"
          name="resume"
          placeholder="Paste your resume link"
          value={formData.resume}
          onChange={handleChange}
          required
        />

        <label>Cover Letter</label>

        <textarea
          name="coverLetter"
          placeholder="Write a short cover letter..."
          value={formData.coverLetter}
          onChange={handleChange}
          rows="5"
        />

        <button type="submit" className="apply-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;

