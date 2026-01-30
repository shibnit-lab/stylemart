require('dotenv').config();
try {
    const Stripe = require('stripe');
    console.log('Stripe module loaded successfully');

    if (process.env.STRIPE_SECRET_KEY) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        console.log('Stripe instance created');
    } else {
        console.log('STRIPE_SECRET_KEY missing, skipping instance creation');
    }
} catch (error) {
    console.error('Error loading Stripe:', error);
}
