# Deployment Guide: Vercel + Render

Yes, it is perfectly fine (and very common) to host your **Frontend on Vercel** and your **Backend on Render**.

## How it works
1.  **Vercel** serves your HTML/CSS/JS files to the user's browser.
2.  Your **Frontend (running in the browser)** sends fetch requests to your **Render Backend**.
3.  **Render** processes the request (Database, Images) and sends a response back to the browser.

---

## Step 1: Deploy Backend to Render
1.  Push your `backend` folder to a GitHub repository.
2.  Go to [Render.com](https://render.com) -> **New +** -> **Web Service**.
3.  Connect your GitHub repo.
4.  **Build Command:** `npm install`
5.  **Start Command:** `node server.js`
6.  **Environment Variables:** Add these in the "Environment" tab:
    *   `MONGO_URI`: Your MongoDB connection string.
    *   `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name.
    *   `CLOUDINARY_API_KEY`: Your Cloudinary API Key.
    *   `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret.
7.  Deploy! Render will give you a URL (e.g., `https://solveathon-backend.onrender.com`).

## Step 2: Connect Frontend to Backend
Once you have your Render URL, you must update your Frontend code to stop looking at `localhost` and start looking at `Render`.

### Update `frontend/register.html`
Find this line (likely inside the script tag):
```javascript
const response = await fetch('http://localhost:5000/api/register', { ... });
```
Replace it with:
```javascript
const response = await fetch('https://YOUR-RENDER-URL.onrender.com/api/register', { ... });
```

### Update `frontend/admin.html`
Find this line at the top of the script:
```javascript
const BACKEND_URL = 'http://localhost:5000';
```
Replace it with:
```javascript
const BACKEND_URL = 'https://YOUR-RENDER-URL.onrender.com';
```

## Step 3: Deploy Frontend to Vercel
1.  Push your `frontend` folder (or the whole root project) to GitHub.
2.  Go to [Vercel.com](https://vercel.com) -> **Add New Project**.
3.  Import your repository.
4.  **Root Directory:** If your frontend is in a subfolder, select `frontend`. Use `./` if it's the root.
5.  Deploy!

## Important: CORS
Your backend currently has this line in `server.js`:
```javascript
app.use(cors());
```
This allows **all** websites to access your backend. This ensures your Vercel frontend will work immediately without any "Access Denied" errors.
