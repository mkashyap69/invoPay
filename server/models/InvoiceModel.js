const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  invoiceList: {
    type: [{ item: String, rate: Number }],
  },
  invoiceDate: {
    type: String,
  },
  receiptDate: {
    type: String,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  isPaymentDone: {
    type: Boolean,
    default: false,
  },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
