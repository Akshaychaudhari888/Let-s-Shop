import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import routes from './src/routes/foodRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import cartRouter from './src/routes/cartRoutes.js';
import orderRouter from './src/routes/orderRoutes.js';

const app = express();
dotenv.config();

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Middleware setup
app.use(express.json()); // Handles JSON bodies
app.use(express.urlencoded({ extended: true })); // Handles form data
app.use(cors());

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api", routes);
app.use('/api/images', express.static('uploads'));
app.use('/api/user',userRoutes)
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected successfully.."))
    .catch((error) => console.log("DB connection error:", error));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});