const express = require('express');
const Razorpay = require('razorpay');
const paymentRoute=express.Router()



// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'rzp_test_PrelxkiTXHCY3b', // Replace with your Razorpay Key ID
    key_secret: 'U1IXO6pNGZO0MA9EjL4sW6W9' // Replace with your Razorpay Secret
});

// Create order API
paymentRoute.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;
    try {
        const options = {
            amount: amount * 100, // amount in smallest currency unit (e.g., paise)
            currency,
            receipt,
            payment_capture: 1 // automatic capture
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports=paymentRoute;
