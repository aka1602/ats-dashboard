import express from 'express';
<<<<<<< HEAD
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
=======
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
>>>>>>> aa2e957c60dceb15172d66f7b91d69148f4a58f7
const app = express();
// Load environment variables from .env file
dotenv.config();

// Parse JSON request bodies
app.use(express.json());

<<<<<<< HEAD
// swagger options (setup)
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
				url: 'http://localhost:8000',
			},
		],
	},
	apis: ['./**/*.ts'],
};
// /api-docs for the api docs
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.get('/', (req: express.Request, res: express.Response) => {
	return res
		.status(200)
		.send({
			message: 'Hello Everyone',
		})
		.end();
});

const server = http.createServer(app);
// start the server
server.listen(8000, () => {
	console.log('http://localhost:8000/');
});

// Get database connection string from environment variable

const MONGO_URL = `${process.env.DATABASE_URL}`;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, { dbName: 'ats-dashboard' });
// Log any database connection errors
mongoose.connection.on('error', (error: Error) => console.log(error));

// adding routes
app.use('/', router());
=======
// Start the server
app.listen(3000, () => {
	console.log('Server Started at http://localhost:3000');
});

// Use the router for API routes
app.use('/api/v1/', router());
>>>>>>> aa2e957c60dceb15172d66f7b91d69148f4a58f7
