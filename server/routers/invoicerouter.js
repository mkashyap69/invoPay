const express = require('express');
const Router = express.Router();
const authController = require('../controller/authController');
const invoiceController = require('../controller/invoiceController');

Router.route('/invoiceById').get(
  authController.protect,
  invoiceController.getInvoicesById
);

Router.route('/setPaymentDoneTrue').get(
  authController.protect,
  invoiceController.setPaymentDoneTrue
);

Router.route('/')
  .get(authController.protect, invoiceController.getInvoices)
  .post(authController.protect, invoiceController.addInvoice);

Router.route('/:client').get(
  authController.protect,
  invoiceController.getInvoicesByClient
);

Router.route('/sendInvoiceMail').post(
  authController.protect,
  invoiceController.sendMail
);

module.exports = Router;
