const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const crypto = require("crypto");
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Razorpay order", error });
  }
});

module.exports = router;
