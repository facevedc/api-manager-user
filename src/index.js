const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 7201;
const environment = process.env.NODE_ENV || 'local';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', PORT);
require("./routes/user")(app);

app.listen(app.get('port'), () => {
  console.log(`Server started as '${environment}' environment on http://localhost:${PORT}`);
});

module.exports = app;