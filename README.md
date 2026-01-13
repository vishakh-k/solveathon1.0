# Solve-A-Thon 1.0 🚀

**Solve-A-Thon 1.0** is a 24-Hour National Level Hackathon organized by the **Department of MCA, Srinivas Institute of Technology**. This repository contains the official website and registration portal for the event.

The platform provides a seamless experience for participants to explore event details, register their teams, and for administrators to manage enrolments. The design features a futuristic "Space Mission / Jet Fighter" theme with immersive 3D animations.

## ✨ Features

### 🎨 User Interface (Frontend)
*   **Immersive Design:** Futuristic aesthetics with **Orbitron** typography, glitch effects, and a dark space theme.
*   **3D Elements:** Interactive Combat Jet 3D model using `<model-viewer>`.
*   **Animations:** Smooth reveals and transitions powered by **GSAP** (GreenSock).
*   **Responsive:** Fully optimized for Desktop, Tablet, and Mobile devices.
*   **Sections:** Home, About Mission, Mission Timeline (Events), Protocols (Rules), Mission Rewards (Prizes), Mission Control (Team), and Contact.

### 🔐 User & Team Management
*   **Authentication:** Secure User Signup and Login system.
*   **Team Registration:** Register a team of up to 4 members (1 Leader + 3 Members).
*   **Category Logic:**
    *   **UG (BCA/BSc):** Free entry, auto-approved.
    *   **PG/Engineering (MCA/MSc/BE):** Registration fee required, pending approval until payment verification.
*   **Validation:** Unique Team Name enforcement and input validation.

### 🛡️ Admin Portal (Backend)
*   **Secure Dashboard:** Restricted access for event organizers.
*   **Registration Management:** View real-time list of registered teams.
*   **Status Control:** Approve or Reject registrations (e.g., after verifying payment screenshots).
*   **Data Export:** Capability to manage student data efficiently.

## 🛠️ Technology Stack

*   **Frontend:**
    *   HTML5, CSS3, JavaScript (Vanilla)
    *   [GSAP](https://greensock.com/gsap/) (Animations)
    *   [Model Viewer](https://modelviewer.dev/) (3D Assets)
    *   FontAwesome (Icons)
*   **Backend:**
    *   Node.js & Express.js
    *   MongoDB & Mongoose (Database)
    *   Multer & Cloudinary (File Uploads)
    *   BcryptJS (Password Hashing)

## 📂 Project Structure

```
Solveathon1.0/
├── backend/            # Express Server & API Routes
│   ├── models/         # Mongoose Schemas (User, Registration)
│   ├── uploads/        # Local storage for temp files
│   ├── server.js       # Main server entry point
│   └── package.json    # Backend dependencies
├── frontend/           # Static Website Files
│   ├── 3D/             # 3D .glb models
│   ├── elements/       # Images and assets
│   ├── index.html      # Landing Page
│   ├── user_login.html # Login/Signup Page
│   ├── admin.html      # Admin Dashboard
│   ├── style.css       # Main Stylesheet
│   └── config.js       # Frontend Configuration
└── README.md           # Project Documentation
```

## 🚀 Getting Started

### Prerequisites
*   Node.js installed on your machine.
*   MongoDB connection string (local or Atlas).
*   (Optional) Cloudinary account for production image storage.

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/solveathon-1.0.git
    cd Solveathon1.0
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    ADMIN_SECRET=your_admin_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    ```
    Start the server:
    ```bash
    npm start
    ```

3.  **Run Frontend**
    *   Open `frontend/index.html` using **Live Server** (VS Code Extension) or simply drag and drop into your browser.
    *   Ensure `frontend/config.js` is configured to point to your backend URL (default: `http://localhost:5001`).

## 👨‍💻 Developed By

**Vishakh K T**
*   [LinkedIn Profile](https://www.linkedin.com/in/vishakh-k-t-0105bb2ba/)

---
&copy; 2026 Solve-A-Thon 1.0 | Department of MCA, Srinivas Institute of Technology
