const express = require('express');

const userController = require('./userController');

const AuthenticateSession = require('../middlewares/AuthenticateSession');
const ParseData = require('../middlewares/ParseData');

const router = express.Router();

const user = new userController;

/* USER ROUTES */

router.get('/get-list', AuthenticateSession, user.getList);

module.exports = router;
