import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import cookieParser = require('cookie-parser');
import path = require('path');

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
app.use(express.urlencoded({ extended: true }));
// use cookie-parser
app.use(cookieParser());

// use view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Start the server
app.listen(3000, () => {
	console.log('Server Started at http://localhost:3000');
});

import router from './router';
// Use the router for API routes
app.use('/api/v1/', router());

// swagger docs setup
const options: Options = {
	definition: {
		openapi: '3.0.1',
		info: {
			title: 'ATS-Track',
			version: '1.0.0',
			description: 'Applicant Tracking System',
		},
		servers: [
			{
				url: 'http://localhost:3000',
			},
		],
	},
	apis: ['./**/*.ts'],
};
// /api-docs for the api docs
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
