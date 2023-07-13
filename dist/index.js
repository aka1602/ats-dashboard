"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
// Load environment variables from .env file
dotenv_1.default.config();
// Get database connection string from environment variable
const mongoString = process.env.DATABASE_URL || '';
// Update the connection URL to include the desired database name
// Connect to MongoDB
mongoose_1.default.connect(mongoString, {
    dbName: 'ats-dashboard',
});
const database = mongoose_1.default.connection;
// Log any database connection errors
database.on('error', (error) => {
    console.log(error);
});
// Log a message when connected to the database
database.once('connected', () => {
    console.log('Database Connected');
});
// Create Express app
const app = (0, express_1.default)();
// Parse JSON request bodies
app.use(express_1.default.json());
// Start the server
app.listen(3000, () => {
    console.log('Server Started at http://localhost:3000');
});
// Use the router for API routes
app.use('/api/v1/', (0, router_1.default)());
