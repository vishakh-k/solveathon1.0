// Import Firebase SDKs (using compat for simpler HTML integration)
// Note: We will include the CDN scripts in the HTML files before this script runs.

const firebaseConfig = {
    // --- PASTE YOUR FIREBASE CONFIG HERE ---
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
    // ---------------------------------------
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

console.log("Firebase Initialized");
