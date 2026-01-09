# MongoDB Setup Guide for Solveathon 1.0

This guide outlines the steps to migrate the backend from Firebase to MongoDB using a Node.js and Express server.

## Architecture Change
- **Old:** Frontend (HTML/JS) -> Firebase (Direct Usage)
- **New:** Frontend (HTML/JS) -> Backend API (Node.js/Express) -> MongoDB

## Prerequisites
- Node.js installed (Verified: v22.20.0)
- MongoDB Connection String (You will need a MongoDB Atlas account or a local MongoDB instance)

## Step 1: Backend Setup
We will create a specific `backend` folder to handle server logic.

1. **Initialize Project**: Create a `backend` directory and initialize `package.json`.
2. **Install Dependencies**:
   - `express`: Web framework
   - `mongoose`: MongoDB object modeling
   - `cors`: To allow the frontend to talk to the backend
   - `dotenv`: To manage environment variables (like the DB connection string)
   - `nodemon` (dev dependency): For auto-restarting the server

## Step 2: Database Schema
We will define a Mongoose schema for Registrations containing:
- Team Name
- Leader Details (Name, Email, Phone, Dept, Year, College)
- Team Members
- Payment Proof (File handling might be needed, or store base64/URL if using cloud storage)
- Status (Approved/Pending)

## Step 3: API Endpoints
- **POST /api/register**: To submit a new registration.
- **GET /api/registrations**: For the Admin page to view all registrations.
- **PATCH /api/registrations/:id**: To update status (Approve/Reject).
- **POST /api/login**: Simple admin authentication (if needed).

## Step 4: Frontend Integration
- Update `register.html` & `script.js` to send `POST` requests to `http://localhost:5000/api/register` instead of Firebase.
- Update `admin.html` to fetch data from `http://localhost:5000/api/registrations`.

## Step 5: Running the Project
1. Start the Backend: `cd backend && npm run dev`
2. Open the Frontend: Open `index.html` (or use a live server).

---

## Action Plan
I will now proceed to:
1. Create the `backend` directory and files.
2. Set up the Express server and MongoDB connection.
3. Update the frontend files to communicate with this new backend.
