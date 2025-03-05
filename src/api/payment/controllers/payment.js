// src/api/payment/controllers/payment.js
'use strict';
const Razorpay = require('razorpay');
const {parseMultipartData, sanitizeEntity} = require('@strapi/utils');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Add your Razorpay key ID here
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Add your Razorpay key secret here
});

module.exports = {
  async createOrder(ctx) {
    const { amount } = ctx.request.body;

    try {
      // Create an order with Razorpay API
      const options = {
        amount: amount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`,
        payment_capture: 1, // Auto capture payment after success
      };

      const order = await razorpay.orders.create(options);
      
      // Send back the order details
      return ctx.send({ order });
    } catch (error) {
      return ctx.throw(500, error.message);
    }
  },

  async verifyPayment(ctx) {
    const { paymentId, orderId, signature } = ctx.request.body;

    const generatedSignature = razorpay.crypto.verifyPaymentSignature({
      order_id: orderId,
      payment_id: paymentId,
      signature: signature,
    });

    if (generatedSignature) {
      // Payment verified successfully, handle it here
      return ctx.send({ message: 'Payment successful' });
    } else {
      return ctx.throw(400, 'Invalid signature');
    }
  },
};
