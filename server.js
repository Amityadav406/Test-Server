require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Console } = require('console');
const cors = require('cors');

/* Server logs */
const output = fs.createWriteStream('./server.log', { flags: 'a' });
const errorOutput = fs.createWriteStream('./error.log', { flags: 'a' });

const logger = new Console({ stdout: output, stderr: errorOutput });

global.INFO = (...args) => logger.log(Date(), '|', 'INFO', '|', ...args);
global.ERROR = (...args) => logger.error(Date(), '|', 'ERROR', '|', ...args);

/* Global URL */
global.API_URL = require('./api.config').API_URL;
global.CLIENT_URL = require('./api.config').CLIENT_URL;

/* Global DB connection */
global.DBConnection = require('./db.config');

global.DBQuery = async (sql) => {
  const promise = new Promise((resolve, reject) => {
    DBConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      };
    });
  });

  return await promise.catch(error => error);
};

/* Global root dir */
global.ROOT_DIR = path.resolve(__dirname);

/* Create uploads directories */
require('./config').CREATE_UPLOADS_DIR();

/* Include all created routes */
const RoutesCustom = require('./api');

const app = express();

/* Parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }));

/* Parse application/json */
app.use(bodyParser.json())

/* Serve static files */
app.use(express.static('build'));
app.use(express.static('uploads'));

/* Enable cors */
app.use(cors());

/* Use custom routes in app */
new RoutesCustom(app);

/* Internal server error middleware */
app.use(function (err, req, res, next) {
  ERROR(err);
  res.statusCode = 500;
  res.sendFile('500.html', { root: `${ROOT_DIR}/build` });
});
app.use(function (req, res, next) {
  res.statusCode = 404;
  res.sendFile('index.html', { root: `${ROOT_DIR}/build` });
});

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`🚀️ Application running on port ${process.env.PORT}`);
  };
});
