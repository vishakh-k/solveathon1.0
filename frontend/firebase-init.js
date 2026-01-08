// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvQ0lV52T5dso21Q8HYF8mqN3u_YITs30",
    authDomain: "solveathon1-0.firebaseapp.com",
    projectId: "solveathon1-0",
    storageBucket: "solveathon1-0.firebasestorage.app",
    messagingSenderId: "466466041760",
    appId: "1:466466041760:web:84db5ea2ad90886a9bfec5"
};

// Initialize Firebase (Compat)
// The firebase object is available because we included the CDN scripts in HTML
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

console.log("Firebase Initialized Successfully");
