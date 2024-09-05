const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;
const db = mongoose.connection;
const db_name = process.env.DATABASE_NAME;
const userRouter = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const admin = require('firebase-admin');
const User = require('./schemas/userSchema');

// Middleware
app.use(express.json());
app.use(cors());


// Firebase Admin setup
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



// Database connection
mongoose.connect(db_name);
db.on('error', () => console.log('Error connecting to database'));
db.once('open', () => {
    console.log('Successfully connected to database');

    (async () => {
        try {
            const count = await User.countDocuments().exec();

            // If no users exist, create a default user
            if (count === 0) {
                console.log('No users found, creating a default user...');

                const defaultUserData = {
                    email: process.env.DEFAULT_USER_EMAIL,
                    password: process.env.DEFAULT_USER_PASSWORD,
                    name: process.env.DEFAULT_USER_NAME,
                    address: process.env.DEFAULT_USER_ADDRESS || "Default Address",
                    phone: process.env.DEFAULT_USER_PHONE || "000-000-0000",
                    role: process.env.DEFAULT_USER_ROLE || "admin",
                };

                // Create user in Firebase
                const userRecord = await admin.auth().createUser({
                    email: defaultUserData.email,
                    password: defaultUserData.password,
                    emailVerified: true,
                    disabled: false
                });

                // Save user data in MongoDB
                const newUser = new User({
                    ...defaultUserData,
                    firebaseUid: userRecord.uid,
                });

                await newUser.save();

                console.log('Default user created successfully.');
            }
        } catch (error) {
            console.error('Error creating default user:', error);
        }
    })();
});



// Routes
app.use('/users/', userRouter(admin));
app.use('/products/', productRoutes());
app.use('/categories/', categoryRoutes());
app.use('/orders/', orderRoutes());

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
