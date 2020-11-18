const mysql = require('mysql');
const getConfig = require('../../services/config.service');

const data = getConfig.getExternalServiceUrl('my-sql-db');

const connection = mysql.createConnection({
    host: data.host,
    port: data.port,
    user: data.user,
    password: data.pass,
    database: data.db,
});

connection.connect(err => {
    if(err) console.log("Error en la conexión");
    console.log('Conectado');
});

module.exports = connection;