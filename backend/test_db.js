
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log("Testing connection to:", uri.split('@')[1]); // Hide credentials in log

mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB Connection Successful');
        process.exit(0);
    })
    .catch(err => {
        console.error('MongoDB Connection Failed:', err);
        process.exit(1);
    });
