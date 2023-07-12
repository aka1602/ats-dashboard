import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router';

// Load environment variables from .env file
dotenv.config();

// Get database connection string from environment variable
const mongoString: string = process.env.DATABASE_URL || '';

// Update the connection URL to include the desired database name
// Connect to MongoDB
mongoose.connect(mongoString, {
	dbName: 'ats-dashboard',
});
const database = mongoose.connection;
// Log any database connection errors
database.on('error', (error) => {
	console.log(error);
});

// Log a message when connected to the database
database.once('connected', () => {
	console.log('Database Connected');
});

// Create Express app
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Start the server
app.listen(3000, () => {
	console.log('Server Started at http://localhost:3000');
});

// Use the router for API routes
app.use('/api/v1/', router());
