// src/api/payment/routes/payment.js
module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/payment/order',
        handler: 'payment.createOrder',
        config: {
          auth: false, // You can set this to true if you want to enforce authentication
        },
      },
      {
        method: 'POST',
        path: '/payment/verify',
        handler: 'payment.verifyPayment',
        config: {
          auth: false, // You can set this to true if you want to enforce authentication
        },
      },
    ],
  };
  