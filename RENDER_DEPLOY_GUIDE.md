# Deploying Solve-A-Thon Backend to Render

Yes, you can absolutely deploy the backend to Render.com and connect it to your frontend. Render creates a live, secure (HTTPS) URL for your backend API.

## 1. Setup on Render

1.  **Sign Up/Login:** Go to [render.com](https://render.com) and login with your GitHub account.
2.  **New Web Service:** Click on **"New +"** -> **"Web Service"**.
3.  **Connect Repo:** Select your `Solveathon1.0` repository from the list.
4.  **Configure Service:**
    *   **Name:** `solveathon-backend` (or unique name)
    *   **Region:** Singapore (or nearest to you)
    *   **Branch:** `main`
    *   **Root Directory:** `backend` (Important! This tells Render where the server code lives)
    *   **Runtime:** `Node`
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`
    *   **Plan:** Free (or Starter)

## 2. Environment Variables (Secret Keys)

Scroll down to the **"Environment Variables"** section on Render. Add the following keys from your `.env` file (DO NOT upload the .env file itself):

| Key | Value |
| :--- | :--- |
| `MONGO_URI` | `mongodb+srv://...` (Your full connection string) |
| `CLOUDINARY_CLOUD_NAME` | `...` |
| `CLOUDINARY_API_KEY` | `...` |
| `CLOUDINARY_API_SECRET` | `...` |
| `ADMIN_EMAIL` | `admin@solveathon.com` |
| `ADMIN_SECRET` | `...` (Your hashed admin password) |
| `PORT` | `10000` (Render sets this automatically, but safe to add) |

## 3. Deployment

Click **"Create Web Service"**. Render will start building your app.
*   It will run `npm install`.
*   It will run `node server.js`.
*   Once done, you will see "Live" status.
*   **Copy your backend URL**: It will look like `https://solveathon-backend.onrender.com`.

## 4. Connect Frontend to Production Backend

Now that your backend is live, you need to tell your frontend to talk to this new URL instead of `localhost`.

1.  Open `frontend/config.js` in your VS Code.
2.  Update the `BASE_URL` to your new Render URL:
    ```javascript
    const API_CONFIG = {
        // BASE_URL: 'http://localhost:5001', // Comment this out
        BASE_URL: 'https://solveathon-backend.onrender.com', // Uncomment and paste your URL
    };
    ```
3.  **Push Changes:**
    ```bash
    git add frontend/config.js
    git commit -m "chore: Update API URL to Production"
    git push origin main
    ```

## 5. Automatic Updates

**Q: If I update anything, will it update in backend also?**
**A: YES.**

*   Since you connected your GitHub repository to Render, **every time you push code** to the `main` branch (`git push origin main`), Render acts automatically:
    1.  It detects the new commit.
    2.  It pulls the latest code.
    3.  It re-installs dependencies (if `package.json` changed).
    4.  It restarts the server with the new code.

This process ensures your live site always matches your latest GitHub code only a few minutes after you push!

## 6. How to Update Your Live Site (Workflow)
Just saving the file in VS Code is **NOT** enough. You must send the changes to GitHub for Render to see them.

**Steps to update:**
1.  **Modify:** Make your changes in the code.
2.  **Save:** Save your files.
3.  **Push:** Run these 3 commands in your terminal:
    ```bash
    git add .
    git commit -m "Fixed a bug in backend"
    git push origin main
    ```
4.  **Wait:** Go to your Render Dashboard. You will see a new deployment start automatically. In typically 2-3 minutes, your live site will be updated.
