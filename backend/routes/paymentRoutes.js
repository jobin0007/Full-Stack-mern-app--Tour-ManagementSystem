const express = require('express');
const paymentController = require('../controllers/paymentController');
const authentication = require('../middleware/authenticator');
const paymentRoutes = express.Router();


paymentRoutes.post('/create-order/:bookingId',authentication,paymentController.createOrder);
paymentRoutes.post('/mock-signature',authentication,paymentController.mockSignature);
paymentRoutes.post('/verify-payment',authentication,paymentController.verifyPayment);

module.exports = paymentRoutes;