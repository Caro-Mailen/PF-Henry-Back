const express = require('express');
const morgan = require('morgan');
<<<<<<< HEAD

const routes = require('./Routes/index.js');
=======
const routes = require('./routes/index.js');
const cors = require('cors');

>>>>>>> 50190b386a439f072d19dc8d9aa3e8d0ec01bd83

require('./db.js');

const server = express();
server.use(express.json())
server.name = 'API';

server.use(cors());
server.use(morgan('dev'));

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
