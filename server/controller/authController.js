const User = require('../models/UserModel');
const Client = require('../models/ClientModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/AppError');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError(401, 'Incorrect email or password'));
  }
  const result = await user.comparePassword(password, user.password);

  if (!result) {
    return next(new AppError(401, 'Incorrect email or password'));
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '2d',
  });

  res.cookie('ID', token, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    //sameSite: 'none',
  });

  res.status(200).json({ status: 'Success', token, data: user });
};

const getUserByCookies = async (req, res, next) => {
  if (req.cookies.ID) {
    jwt.verify = promisify(jwt.verify);
    const decoded = await jwt.verify(req.cookies.ID, process.env.SECRET_KEY);

    const user = await User.findById(decoded._id);

    if (!user) {
      return next(new AppError(401, 'Please Login'));
    }
    res
      .status(200)
      .json({ status: 'Success', token: req.cookies.ID, data: user });
    return;
  }

  return next(new AppError(401, 'Please Login'));
};

const signup = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  const user = await User.create({ name, email, phone, password });

  if (!user) {
    return next(new AppError(401, 'Incorrect input format'));
  }
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '2d',
  });
  user.password = undefined;

  res.cookie('ID', token, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: 'none',
  });
  res.status(201).json({ status: 'Success', token, data: user });
};

const getClientToken = (req, res, next) => {
  const { clientId } = req.query;

  const clientToken = jwt.sign(
    { _id: clientId, role: 'client' },
    process.env.SECRET_KEY,
    {
      expiresIn: 1800, //will expire in 30 minutes
    }
  );
  res.cookie('clientID', clientToken, {
    maxAge: 0.5 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    //sameSite: 'none',
  });
  res.status(200).json({ status: 'Success', token: clientToken });
};

const protect = async (req, res, next) => {
  let token;
  if (req.headers || req.headers.authorization) {
    token = req.headers.authorization?.split(' ')[1];
  }
  if (!token) {
    return next(new AppError(401, 'Not Authorized'));
  }

  jwt.verify = promisify(jwt.verify);
  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return next(new AppError(401, 'Token Expired'));
  }

  if (!decoded) {
    return next(new AppError(401, 'Token Expired'));
  }
  if (decoded.role === 'client') {
    const client = await Client.findById(decoded._id);

    if (!client) {
      return next(new AppError(401, 'Token Expired'));
    }
    req.client = client;
    next();
    return;
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    return next(new AppError(401, 'Token Expired'));
  }

  req.user = user;
  next();
};

const logout = async (req, res, next) => {
  res.clearCookie('ID', {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    //sameSite: 'none',
  });
  res.send('done');
};

module.exports = {
  login,
  signup,
  protect,
  getUserByCookies,
  logout,
  getClientToken,
};
