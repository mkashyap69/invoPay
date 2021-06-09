const Client = require('../models/ClientModel');
const validator = require('validator');
const catchAsync = require('../utils/catchAsync');

const getClients = async (req, res, next) => {
  const seller = req.user._id;

  const clientList = await Client.find({ seller });

  if (!clientList) {
    return next(new AppError(401, 'You dont have any registered clients'));
  }
  res.status(200).json({
    status: 'Success',
    data: clientList,
  });
};
const getClientsById = async (req, res, next) => {
  const { client } = req.params;

  if (!validator.isMongoId(client)) {
    return next(new AppError(401, 'Invalid Client'));
  }

  const clientDet = await Client.findById(client);

  if (!clientDet) {
    return next(new AppError(401, 'You dont have any registered clients'));
  }
  res.status(200).json({
    status: 'Success',
    data: clientDet,
  });
};
const addClient = catchAsync(async (req, res, next) => {
  const seller = req.user._id;
  const { name, email, phone } = req.body;

  const client = await Client.create({ name, email, phone, seller });



  res.status(200).json({
    status: 'Success',
    data: client,
  });
});

const updateClient = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { clientId } = req.query;

  const client = await Client.findByIdAndUpdate(clientId, {
    name,
    email,
    phone,
  });

  res.status(200).json({
    status: 'Success',
    data: client,
  });
};

module.exports = { getClients, addClient, getClientsById, updateClient };
