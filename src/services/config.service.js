/* eslint-disable import/no-dynamic-require */
const env = process.env.NODE_ENV || 'local';
const environment = env;
const config = require(`../config/environment/${environment}.config.js`);

function getConfig() {
  const allowedEnvironments = ['local', 'development', 'production'];

  if (allowedEnvironments.includes(environment)) {
    return config;
  }
  throw Error(`${environment} is not a valid environment name`);
}

function getExternalServiceUrl(name) {
  const externalServicesList = config.externalServices;
  const externalService = externalServicesList.find(service => service.name === name);
  return externalService.data;
}

module.exports = {
  getConfig,
  getExternalServiceUrl,
};
