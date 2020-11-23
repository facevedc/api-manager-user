const mongoose = require("mongoose");
const config = require("../../services/config.service").getConfig();

mongoose.Promise = global.Promise;

const protocol = "mongodb";
const host = "127.0.0.1";
const port = 27017;
const username = "";
const password = "";
const database = "storeByPymes";

const connectionString = `${protocol}://${
  username && password ? `${username}${password}@` : ""
}${host}:${port}/${database}?retryWrites=true&w=majority`;

const connect = async () => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    dbName: database,
    useFindAndModify: true,
    useUnifiedTopology: true
  });
};

async function reconnectCallBack() {
  if (mongoose.connection.readyState === 0) {
    await connect(connectionString, database);
    console.log(`Mongoose recovered connection to ${connectionString}`);
    clearInterval(reconnectCallBack);
  }
}

async function start() {
  mongoose.connection.on("connected", () => {
    console.log(`Mongoose connection is open to ${connectionString}`);
  });

  mongoose.connection.on("error", err => {
    console.log(err.stack);
    if (mongoose.connection.readyState === 0) {
      setInterval(
        reconnectCallBack,
        config.mongodb.connection.reconnectionInterval
      );
    }
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection is disconnected");
    setInterval(
      reconnectCallBack,
      config.mongodb.connection.reconnectionInterval
    );
  });

  process.on("SIGINT", () => {
    clearInterval(reconnectCallBack);
    mongoose.disconnect();
    process.exit(0);
  });

  return connect(connectionString, database);
}

module.exports = {
  start,
  connectionStatus: () => {
    switch (mongoose.connection.readyState) {
      case 0:
        return "disconnected";
      case 1:
        return "connected";
      case 2:
        return "connecting";
      default:
        return "disconnecting";
    }
  }
};
