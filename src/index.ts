import express, { Router } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri =
	'mongodb+srv://akashgreenwork:atsDashboard123@ats-cluster.jj8g568.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db('admin').command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);

// const app = express();
// dotenv.config();

// app.use(express.json());

// app.get('/', (req: express.Request, res: express.Response) => {
// 	return res
// 		.status(200)
// 		.send({
// 			message: 'Jo',
// 		})
// 		.end();
// });

// const server = http.createServer(app);

// server.listen(8000, () => {
// 	console.log('http://localhost:8000/');
// });

// const MONGO_URL = `${process.env.DATABASE_URL}`;
// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on('error', (error: Error) => console.log(error));

// // app.use("/", router());
