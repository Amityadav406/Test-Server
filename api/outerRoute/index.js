const express = require('express');
const outerController = require('./outerController');
const router = express.Router();

const outer = new outerController;

router.post('/signin', outer.authUser);

module.exports = router;
