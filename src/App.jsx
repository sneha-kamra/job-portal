import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import axios from "axios";
import "./App.css";

/* ================= HOME ================= */

function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/jobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🚀 Your career starts here</div>

          <h1>
            Find the job that
            <br />
            <span>moves you forward.</span>
          </h1>

          <p>
            Discover thousands of opportunities from companies looking for
            talented people like you.
          </p>

          <div className="search-box">
            <div className="search-field">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Job title, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="search-field">
              <span>⌖</span>

              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button>Search Jobs</button>
          </div>

          <div className="popular-searches">
            <span>Popular:</span>

            <button onClick={() => setSearch("MERN")}>
              MERN Developer
            </button>

            <button onClick={() => setSearch("React")}>
              React.js
            </button>

            <button onClick={() => setSearch("Node")}>
              Node.js
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stat">
          <strong>10K+</strong>
          <span>Jobs available</span>
        </div>

        <div className="stat">
          <strong>5K+</strong>
          <span>Companies hiring</span>
        </div>

        <div className="stat">
          <strong>25K+</strong>
          <span>Job seekers</span>
        </div>

        <div className="stat">
          <strong>95%</strong>
          <span>Success rate</span>
        </div>
      </section>

      {/* JOBS */}
      <section className="jobs-section" id="jobs">
        <div className="section-heading">
          <div>
            <span className="section-label">
              EXPLORE OPPORTUNITIES
            </span>

            <h2>Latest job openings</h2>

            <p>
              Find your next opportunity from our latest listings.
            </p>
          </div>

          <span className="job-count">
            {jobs.length} opportunities
          </span>
        </div>

        {loading ? (
          <div className="loading">
            Finding the latest jobs...
          </div>
        ) : (
          <div className="job-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div className="job-card" key={job.id}>
                  <div className="job-card-top">
                    <div className="company-logo">
                      {job.company.charAt(0)}
                    </div>

                    <span className="job-type">
                      {job.type}
                    </span>
                  </div>

                  <h3>{job.title}</h3>

                  <p className="company">
                    {job.company}
                  </p>

                  <div className="job-meta">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                  </div>

                  <div className="job-card-footer">
                    <span className="posted">
                      Recently posted
                    </span>

                    <Link to={`/job/${job.id}`}>
                      View Job →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-jobs">
                <div>🔎</div>

                <h3>No jobs found</h3>

                <p>
                  Try searching for another job or location.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="section-heading center-heading">
          <span className="section-label">
            EXPLORE BY CATEGORY
          </span>

          <h2>Find jobs that match your skills</h2>

          <p>
            Explore popular career paths and opportunities.
          </p>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <div>💻</div>
            <h3>Software Development</h3>
            <span>1,200+ jobs</span>
          </div>

          <div className="category-card">
            <div>🎨</div>
            <h3>UI / UX Design</h3>
            <span>800+ jobs</span>
          </div>

          <div className="category-card">
            <div>📊</div>
            <h3>Data & Analytics</h3>
            <span>950+ jobs</span>
          </div>

          <div className="category-card">
            <div>🤖</div>
            <h3>AI & Machine Learning</h3>
            <span>650+ jobs</span>
          </div>
        </div>
      </section>

      {/* WHY JOBCONNECT */}
      <section className="features" id="about">
        <div className="section-heading center-heading">
          <span className="section-label">
            WHY JOBCONNECT
          </span>

          <h2>Everything you need for your career</h2>

          <p>
            A simple way to discover, explore and apply for jobs.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔎</div>

            <h3>Smart Job Search</h3>

            <p>
              Quickly find opportunities using job titles and
              locations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏢</div>

            <h3>Top Companies</h3>

            <p>
              Explore opportunities from companies looking for
              fresh talent.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>

            <h3>Easy Applications</h3>

            <p>
              Apply to jobs quickly with our simple application
              process.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div>
          <span className="cta-badge">
            YOUR NEXT OPPORTUNITY AWAITS
          </span>

          <h2>Ready to take the next step?</h2>

          <p>
            Start exploring jobs and find an opportunity that
            fits your career goals.
          </p>

          <a href="#jobs" className="cta-button">
            Explore Jobs →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <h3>
            Job<span>Connect</span>
          </h3>

          <p>
            Connecting talented people with great opportunities.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/home">Home</Link>
          <a href="/home#jobs">Jobs</a>
          <a href="/home#about">About</a>
          <Link to="/login">Login</Link>
        </div>

        <p className="copyright">
          © 2026 JobConnect. All rights reserved.
        </p>
      </footer>
    </>
  );
}

/* ================= REGISTER ================= */

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "jobconnect_user",
      JSON.stringify(user)
    );

    setMessage("Account created successfully! 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <Link to="/login" className="auth-logo">
          Job<span>Connect</span>
        </Link>

        <div className="auth-icon">🚀</div>

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Join JobConnect and discover your next opportunity.
        </p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="login-submit"
          >
            Create Account
          </button>
        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="auth-bottom">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

/* ================= LOGIN ================= */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    const savedUser = localStorage.getItem(
      "jobconnect_user"
    );

    if (!savedUser) {
      setMessage("Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      email !== user.email ||
      password !== user.password
    ) {
      setMessage("Incorrect email or password.");
      return;
    }

    localStorage.setItem(
      "jobconnect_logged_in",
      "true"
    );

    setMessage("Login successful! 🎉");

    setTimeout(() => {
      navigate("/home");
    }, 700);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <Link to="/login" className="auth-logo">
          Job<span>Connect</span>
        </Link>

        <div className="auth-icon">👋</div>

        <h1>Welcome back</h1>

        <p className="auth-subtitle">
          Sign in to continue your job search.
        </p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-password">
            <a href="/login">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Sign In
          </button>
        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="google-button">
          <span>G</span>
          Continue with Google
        </button>

        <p className="auth-bottom">
          New to JobConnect?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ================= PROTECTED ROUTE ================= */

function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem(
      "jobconnect_logged_in"
    ) === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* ================= NAVBAR ================= */

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(
      "jobconnect_logged_in"
    );

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link to="/home" className="logo">
        Job<span>Connect</span>
      </Link>

      <div className="nav-links">

        <Link to="/home">
          Home
        </Link>

        <a href="/home#jobs">
          Jobs
        </a>

        <a href="/home#about">
          About
        </a>

        <button
          className="login-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

/* ================= APP CONTENT ================= */

function AppContent() {
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app">

      {!isLoginPage && <Navbar />}

      <Routes>

        {/* Website opens with Login */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protected Job Details */}
        <Route
          path="/job/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* Protected Application */}
        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute>
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </div>
  );
}

/* ================= APP ================= */

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;