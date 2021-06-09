const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    select: false,
  },
  senderOrganization: {
    type: String,
  },
});

userSchema.pre('save', async function (req, res, next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async (password, hashPassword) => {
  const res = await bcrypt.compare(password, hashPassword);

  return res;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
