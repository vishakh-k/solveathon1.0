# MongoDB Atlas Setup Guide

Follow these steps to create your cloud database and connect it to your backend.

## Phase 1: Create the Cluster
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up (Free).
2.  Click **Create a deployment** (or "Build a Database").
3.  Select **M0** (Free Tier).
4.  Choose a provider (AWS) and a region close to you (e.g., Mumbai `ap-south-1`).
5.  Click **Create**.

## Phase 2: Create a Database User
*Crucial: This is NOT your MongoDB login. This is a specific user for your app to access the data.*
1.  Go to the **Database Access** tab (left sidebar).
2.  Click **+ Add New Database User**.
3.  **Authentication Method:** Password.
4.  **Username:** `admin` (or whatever you prefer).
5.  **Password:** Create a strong password (alphanumeric). **Copy this password now; you won't see it again.**
6.  **Database User Privileges:** "Read and write to any database".
7.  Click **Add User**.

## Phase 3: Network Access (Allow Render to Connect)
1.  Go to the **Network Access** tab (left sidebar).
2.  Click **+ Add IP Address**.
3.  Click **Allow Access from Anywhere** (`0.0.0.0/0`).
    *   *Why?* Because Render (cloud hosting) IP addresses change dynamically.
4.  Click **Confirm**.

## Phase 4: Get Connection String
1.  Go to the **Database** tab (left sidebar).
2.  Click **Connect** (on your Cluster card).
3.  Select **Drivers** (Node.js, Go, Python, etc).
4.  Look for the string that looks like this:
    ```
    mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    ```
5.  Copy this string.

## Phase 5: Configure Your App

### A. Local Testing (Optional)
Paste the string into your `backend/.env` file:
```env
MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD_HERE@cluster0.abcde.mongodb.net/solveathon?retryWrites=true&w=majority
```
*Note: Replace `<password>` with your actual password (no brackets). I added `/solveathon` after `.net` to specify the database name.*

### B. Production (Render Deployment)
When you deploy to Render, you **MUST** add this as an Environment Variable:
1.  Go to your Render Dashboard -> Your Service -> **Environment**.
2.  Key: `MONGO_URI`
3.  Value: (Paste the connection string you copied, ensuring the password is correct).
