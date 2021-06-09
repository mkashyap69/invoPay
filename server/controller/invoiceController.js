const Invoice = require('../models/InvoiceModel');
const moment = require('moment');
const sendInvoiceMail = require('../utils/sendInvoiceMail');
const validator = require('validator');
const AppError = require('../utils/AppError');

const getInvoices = async (req, res, next) => {
  const seller = req.user._id;

  const invoiceList = await Invoice.find({ seller })
    .populate('seller client')
    .sort('invoiceDate');

  if (!invoiceList) {
    return next(new AppError(401, 'You dont have any saved  invoices'));
  }

  res.status(200).json({ status: 'Success', data: invoiceList });
};

const getInvoicesByClient = async (req, res, next) => {
  const seller = req.user._id;
  const { client } = req.params;

  const invoiceList = await Invoice.find({ seller, client });

  if (!invoiceList) {
    return next(new AppError(401, 'You dont have any saved  invoices'));
  }

  res.status(200).json({ status: 'Success', data: invoiceList });
};
const getInvoicesById = async (req, res, next) => {
  const { invoiceId } = req.query;
  if (!validator.isMongoId(invoiceId)) {
    return next(new AppError(401, 'Invalid ID'));
  }

  if (req.client._id) {
    const invoice = await Invoice.findOne({
      _id: invoiceId,
      client: req.client._id,
    }).populate('seller client');

    if (!invoice) {
      return next(new AppError(401, 'You dont have any saved  invoices'));
    }

    res.status(200).json({ status: 'Success', data: invoice });
    return;
  }

  const invoice = await Invoice.findOne({ _id: invoiceId }).populate(
    'seller client'
  );
  console.log(invoice);
  if (!invoice) {
    return next(new AppError(401, 'You dont have any saved  invoices'));
  }

  res.status(200).json({ status: 'Success', data: invoice });
};

const setPaymentDoneTrue = async (req, res, next) => {
  const { invoiceId } = req.query;
  const client = req.client;
  const receiptDate = moment(Date.now()).format('MMMM Do YYYY');
  if (!validator.isMongoId(invoiceId)) {
    return next(new AppError(401, 'Invalid ID'));
  }
  const invoice = await Invoice.findOneAndUpdate(
    { _id: invoiceId, client: client._id },
    {
      isPaymentDone: true,
      receiptDate,
    }
  );

  if (!invoice) {
    return next(new AppError(401, 'You dont have any saved  invoices'));
  }

  res.status(200).json({ status: 'Success' });
};

const addInvoice = async (req, res, next) => {
  const seller = req.user._id;
  const { client } = req.query;
  const { invoiceList } = req.body;
  const invoiceDate = moment(Date.now()).format('MMMM Do YYYY');
  const invoice = await Invoice.create({
    invoiceList,
    invoiceDate,
    client,
    seller,
  });

  res.status(200).json({ status: 'Success', data: invoice });
};

const sendMail = async (req, res, next) => {
  const {
    seller,
    sellerEmail,
    clientName,
    clientEmail,
    invoiceId,
    invoiceDate,
    total,
    invoiceListArray,
    payUrl,
  } = req.body;

  sendInvoiceMail(
    seller,
    sellerEmail,
    clientName,
    clientEmail,
    invoiceId,
    invoiceDate,
    total,
    invoiceListArray,
    payUrl
  );
  res.status(200).json({ status: 'Success' });
};

module.exports = {
  getInvoices,
  addInvoice,
  getInvoicesByClient,
  sendMail,
  getInvoicesById,
  setPaymentDoneTrue,
};
