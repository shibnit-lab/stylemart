console.log('--- SERVER INITIALIZING ---');
const express = require('express');
const dotenv = require('dotenv');
// Load env vars first
dotenv.config();


const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');

console.log('Connecting to DB...');
connectDB();

console.log('Requiring authRoutes...');
const authRoutes = require('./routes/authRoutes');
console.log('Requiring productRoutes...');
const productRoutes = require('./routes/productRoutes');
console.log('Requiring orderRoutes...');
const orderRoutes = require('./routes/orderRoutes');
// console.log('Requiring paymentRoutes...');
// const paymentRoutes = require('./routes/paymentRoutes');
console.log('Requiring adminRoutes...');
const adminRoutes = require('./routes/adminRoutes');

console.log('Imports done.');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);
