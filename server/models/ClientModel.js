const mongoose = require('mongoose');
const validator = require('validator');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your clients name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your clients email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please enter your clients phone number'],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
