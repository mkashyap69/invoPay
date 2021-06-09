const express = require('express');
const authController = require('../controller/authController');
const clientController = require('../controller/clientController');

const Router = express.Router();

Router.route('/')
  .get(authController.protect, clientController.getClients)
  .post(authController.protect, clientController.addClient)
  .put(authController.protect, clientController.updateClient);

Router.route('/:client').get(
  authController.protect,
  clientController.getClientsById
);

module.exports = Router;
