// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const express = require('express');
const path = require('path');
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

// open static images
app.use(express.static(path.join(__dirname, '../public')));

console.log(path.join(__dirname, '../public/images/seven-earth.png'));

/**
* Exports express
* @public
*/
module.exports = app;
