const express = require('express');
const authController = require('../controller/authController.js');

const Router = express.Router();

Router.route('/').post(authController.signup);
Router.route('/login').post(authController.login);
Router.route('/user').get(authController.getUserByCookies);
Router.route('/logout').get(authController.protect, authController.logout);
Router.route('/clientToken').get(
  authController.protect,
  authController.getClientToken
);

module.exports = Router;
