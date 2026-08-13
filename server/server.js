const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ==================== JOB MODEL ====================

const jobSchema = new mongoose.Schema({
  id: Number,
  title: String,
  company: String,
  location: String,
  type: String,
  salary: String,
});

const Job = mongoose.model("Job", jobSchema);

// ==================== APPLICATION MODEL ====================

const applicationSchema = new mongoose.Schema(
  {
    jobId: String,
    name: String,
    email: String,
    phone: String,
    resume: String,
    coverLetter: String,
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

// ==================== HOME API ====================

app.get("/", (req, res) => {
  res.json({
    message: "JobConnect API is running successfully!",
  });
});

// ==================== GET ALL JOBS ====================

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
});

// ==================== GET SINGLE JOB ====================

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findOne({
      id: Number(req.params.id),
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);

    res.status(500).json({
      message: "Failed to fetch job",
    });
  }
});

// ==================== SUBMIT APPLICATION ====================

app.post("/api/applications", async (req, res) => {
  try {
    const application = await Application.create(req.body);

    res.status(201).json({
      message: "Application submitted successfully",
      application: application,
    });
  } catch (error) {
    console.error("Application error:", error);

    res.status(500).json({
      message: "Failed to submit application",
    });
  }
});

// ==================== MONGODB CONNECTION ====================

const mongoUri = process.env.MONGODB_URI
  ?.replace(/^MONGODB_URI\s*=\s*/i, "")
  .replace(/^["']|["']$/g, "")
  .trim();

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });