# JobConnect 

A full-stack MERN Job Portal that helps users discover job opportunities, view job details, register and login, and apply for jobs.

## Features

- User Registration and Login
- Protected Home Page
- Job Search by Title
- Job Search by Location
- View Job Details
- Job Requirements
- Apply for Jobs
- Submit Job Applications
- MongoDB Database Integration
- Modern and Responsive UI
- Logout Functionality

## Live Demo
 https://jobconnect-aouy.onrender.com

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router
- Axios
- CSS
- Vite

### Backend
- Node.js
- Express.js
- REST API
- CORS

### Database
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- VS Code

## Application Flow

Register → Login → Home → Search Jobs → View Job Details → Apply for Job → Submit Application

## Job Features

Users can:

- Search jobs by title
- Search jobs by location
- View company name
- View job location
- View job type
- View salary
- Read job description
- View job requirements
- Apply for suitable jobs

## 📝 Job Application

Users can submit their:

- Full Name
- Email
- Phone Number
- Resume Link
- Cover Letter

Submitted applications are stored in MongoDB.

## Database

MongoDB is used to store:

- Job information
- Job applications

Mongoose is used to connect the Express.js backend with MongoDB.

## How to Run

### 1. Clone the Repository

git clone https://github.com/sneha-kamra/job-portal.git

### 2. Open the Project
cd job-portal

### 3. Install Frontend Dependencies
npm install

### 4. Configure MongoDB
Create a .env file inside the server folder.
Add your MongoDB connection:
MONGODB_URI=your_mongodb_connection_string

### 5. Install Backend Dependencies
Open a new terminal and run:
cd job-portal/server
npm install

### 6. Start the Backend
node server.js

### Backend server:
http://localhost:5001

### 7. Start the Frontend
Open another terminal and run:
cd job-portal
npm run dev

### Frontend:
http://localhost:5173

### 8. Open the Application
Open this URL in your browser:
http://localhost:5173

### Security
The MongoDB connection string is stored in an environment variable.
The .env file is excluded from Git using .gitignore and should never be uploaded to GitHub.

### Future Improvements

JWT Authentication
Google OAuth Login
Resume File Upload
User Profile
Admin Dashboard
Recruiter Dashboard
Add and Manage Jobs
Job Bookmarking
Application Tracking
Production Deployment

### Author
Sneha
MCA (AI & ML) Student | MERN Stack Developer
