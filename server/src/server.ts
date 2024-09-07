import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import admin from 'firebase-admin';
import mongoose from 'mongoose';

// Import routes
import { userRoutes } from './routes/userRoutes';
import { productRoutes } from './routes/productRoutes';
import { categoryRoutes } from './routes/categoryRoutes';
import { orderRoutes } from './routes/orderRoutes';
import { User } from './schemas/userSchema';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Load Firebase service account key
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH || '';
if (serviceAccountPath) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    console.error("Firebase service account key path is not defined in environment variables.");
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const db_name = process.env.DATABASE_NAME || '';
if (!db_name) {
    console.error('Database name is not defined in environment variables.');
    process.exit(1);
}

mongoose.connect(db_name);
const db = mongoose.connection;

db.on('error', () => console.log('Error connecting to database'));
db.once('open', async () => {
    console.log('Successfully connected to database');

    try {
        const count = await User.countDocuments().exec();

        // If no users exist, create a default user
        if (count === 0) {
            console.log('No users found, creating a default user...');

            const defaultUserData = {
                email: process.env.DEFAULT_USER_EMAIL || '',
                password: process.env.DEFAULT_USER_PASSWORD || '',
                name: process.env.DEFAULT_USER_NAME || '',
                address: process.env.DEFAULT_USER_ADDRESS || 'Default Address',
                phone: process.env.DEFAULT_USER_PHONE || '000-000-0000',
                role: process.env.DEFAULT_USER_ROLE || 'admin',
            };

            // Create user in Firebase
            const userRecord = await admin.auth().createUser({
                email: defaultUserData.email,
                password: defaultUserData.password,
                emailVerified: true,
                disabled: false,
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
});

// Async function to initialize routes
const initializeRoutes = async () => {
    const resolvedUserRoutes = await userRoutes(admin as unknown);
    app.use('/users/', resolvedUserRoutes);
    app.use('/products/', productRoutes);
    app.use('/categories/', categoryRoutes);
    app.use('/orders/', orderRoutes);
};

initializeRoutes().catch((error) => {
    console.error('Error initializing routes:', error);
    process.exit(1);
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

export default app;
