const dotenv = require('dotenv');
const express = require('express');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Initializations
const ROUTES = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 7201;
const environment = process.env.NODE_ENV || 'development';
// Charge dataset app express
app.set('port', PORT);
// Routes
app.use(ROUTES);

// Server is listening
app.listen(app.get('port'), () => {
  console.log(`Server started as '${environment}' environment on http://localhost:${PORT}`);
});

module.exports = app;