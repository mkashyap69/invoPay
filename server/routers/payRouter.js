const express = require('express');
const paymentController = require('../controller/paymentController');

const Router = express.Router();

Router.route('/create-checkout-session').post(
  paymentController.createCheckoutSession
);

module.exports = Router;
