require('dotenv').config();
const connectDB = require('./config/db');

console.log('Testing DB connection...');
connectDB().then(() => {
    console.log('DB connection initiated');
    // Keep alive for a bit
    setTimeout(() => {
        console.log('Exiting test');
        process.exit(0);
    }, 3000);
});
