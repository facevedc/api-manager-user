/* eslint-disable no-console */
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 7201;
const environment = process.env.NODE_ENV || "local";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

require("./config/dataBase/connection.database").start();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", PORT);
require("./routes/user")(app);

const statusMongo = require("./config/dataBase/connection.database").connectionStatus();

app.listen(app.get("port"), () => {
  console.log(
    `Server started as '${environment}' environment on http://localhost:${PORT}`
  );
  console.log(`Status MongoDB connection: '${statusMongo}' `);
});

module.exports = app;
