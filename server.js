require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);  // Use Secret Key from your .env or directly in code
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Payment Route to create payment intent
app.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,  // Amount in cents
            currency, // USD, EUR, etc.
        });

        // Send the clientSecret back to the frontend
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("❌ Error:", error);  // Logs error in the terminal
        res.status(400).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});
