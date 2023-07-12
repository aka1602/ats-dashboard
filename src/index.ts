import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
const app = express();
// Load environment variables from .env file
dotenv.config();

app.use(express.json());

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
