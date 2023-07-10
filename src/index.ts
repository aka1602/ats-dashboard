import express, { Router } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config();
const mongoString: string = process.env.DATABASE_URL || '';

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
	console.log(error);
});

database.once('connected', () => {
	console.log('Database Connected');
});
const app = express();

app.use(express.json());

app.listen(3000, () => {
	console.log(`Server Started at ${3000}`);
});
