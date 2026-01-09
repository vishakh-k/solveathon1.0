const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const Registration = require('./models/Registration');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cloudinary / Storage Config
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
let storage;

const hasCloudinaryKeys = process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

if (hasCloudinaryKeys) {
    console.log("Using Cloudinary Storage");
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'solveathon-payments',
            allowed_formats: ['jpg', 'png', 'jpeg'],
        },
    });
} else {
    console.log("Using Local Disk Storage");
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
        }
    });
}

const upload = multer({ storage: storage });

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/solveathon')
    .then(() => {
        console.log('MongoDB Connected');
        console.log(`Connected to Host: ${mongoose.connection.host}`);
        console.log(`Connected to Database: ${mongoose.connection.name}`);
    })
    .catch(err => console.log('MongoDB Connection Error:', err));


// --- AUTHENTICATION ROUTES ---

// Admin Middleware
const requireAdmin = (req, res, next) => {
    const adminKey = req.headers['x-admin-key'];
    const secret = process.env.ADMIN_SECRET || 'admin123';

    if (adminKey && adminKey === secret) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Security Clearance Required' });
    }
};

// User Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        console.log('Signup Request Body:', req.body);
        const { team_name, college_name, leader_name, email, password, category } = req.body;

        // Check user
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ success: false, message: "Email already registered" });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            team_name,
            college_name,
            leader_name,
            email,
            password: hashedPassword,
            category: category || 'UG'
        });

        await newUser.save();
        console.log('User created:', newUser._id);

        // Return user data for auto-login
        res.json({
            success: true,
            message: "Account Created Successfully",
            user: {
                id: newUser._id,
                team: newUser.team_name,
                email: newUser.email,
                category: newUser.category,
                college: newUser.college_name
            }
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ success: false, message: "Server Error: " + err.message });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ success: false, message: "Invalid Credentials" });

        res.json({
            success: true,
            message: "Login Successful",
            user: {
                id: user._id,
                team: user.team_name,
                email: user.email,
                category: user.category,
                college: user.college_name
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@solveathon.com';
    const adminPass = process.env.ADMIN_SECRET || 'admin123';

    if (email === adminEmail && password === adminPass) {
        // Return the 'key' (secret) to the frontend so it can be used for subsequent requests
        res.json({ success: true, message: 'Access Granted', key: adminPass });
    } else {
        res.status(401).json({ success: false, message: 'Invalid Credentials' });
    }
});


// --- REGISTRATION ROUTES ---

app.post('/api/register', upload.single('payment_screenshot'), async (req, res) => {
    try {
        console.log('Registration Payload:', req.body);
        const {
            user_id,
            category,
            college_name,
            team_name,
            leader_name, leader_contact, leader_email,
            member2_name, member2_contact, member2_email,
            member3_name, member3_contact, member3_email,
            member4_name, member4_contact, member4_email,
            transaction_id
        } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const members = [
            { name: member2_name, contact: member2_contact, email: member2_email },
            { name: member3_name, contact: member3_contact, email: member3_email },
            { name: member4_name, contact: member4_contact, email: member4_email }
        ];

        const newRegistration = new Registration({
            user_id,
            category,
            college_name,
            team_name,
            leader: {
                name: leader_name,
                contact: leader_contact,
                email: leader_email
            },
            members,
            status: category === 'UG' ? 'Approved' : 'Pending',
            payment: category === 'PG' ? {
                transactionId: transaction_id,
                screenshotPath: req.file ? req.file.path.replace(/\\/g, '/') : null,
                verified: false
            } : null
        });

        await newRegistration.save();

        // Update User
        await User.findByIdAndUpdate(user_id, { is_registered_for_event: true });

        res.status(201).json({ message: 'Registration successful', registration: newRegistration });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// PROTECTED ROUTES (Require Admin)
app.get('/api/registrations', requireAdmin, async (req, res) => {
    try {
        const registrations = await Registration.find().sort({ registeredAt: -1 });
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.patch('/api/registrations/:id/status', requireAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const registration = await Registration.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(registration);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Debug Routes
app.get('/', (req, res) => {
    res.send('API is Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
