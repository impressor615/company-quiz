const express = require('express');

const router = express.Router();
require('./settings')(router);
require('./results')(router);
require('./members')(router);

module.exports = router;
