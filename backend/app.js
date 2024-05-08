const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db=require('./utils/db');
const app = express();
const PORT = process.env.PORT || 5000;
const cors=require("cors");
// Middleware
app.use(bodyParser.json());

// MongoDB connection
app.use(cors());

// Schema for user information
const userSchema = new mongoose.Schema({
    fullName: String,
    dob: String,
    address: String,
    contact: String,
    uid: String
});

// Model for user information
const User = mongoose.model('User', userSchema);

// Function to generate a unique 16-digit UID
function generateUID() {
    const randomString = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const hash = crypto.createHash('sha256').update(randomString).digest('hex');
    const uid = hash.substring(0, 16);
    return uid;
}

// Function to check if UID already exists in the database
async function isUIDUnique(uid) {
    const user = await User.findOne({ uid });
       
    return !user;
}

// Route for submitting Aadhar card registration form 
app.post('/register', async (req, res) => {
    const { fullName, dob, address, contact } = req.body;
    const existingUser = await User.findOne({ fullName, dob, address, contact });
       if(existingUser)
        {res.status(201).json({ message: 'User registered successfully', uid: existingUser.uid });
    return existingUser;}
    let uid;
    do {
        uid = generateUID();
    } while (!(await isUIDUnique(uid)));

    // Save user information to the database
    const newUser = new User({
        fullName,
        dob,
        address,
        contact,
        uid
    });

    newUser.save()
        .then(() => {
            res.status(201).json({ message: 'User registered successfully', uid });
           return newUser;
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Route for getting all users (for testing purposes)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
db().then(()=>{
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})});
