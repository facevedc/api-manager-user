/* eslint-disable global-require */
module.exports = app => {
  const SERVICE = "users";
  const USERS_BY_STORE = "usersByStore";
  const usuarios = require("../controller/users.controller");

  // Create user expose
  app.post(`/${SERVICE}/create`, usuarios.crear);

  // List user expose
  app.get(`/${SERVICE}`, usuarios.buscarTodos);
  app.get(`/${SERVICE}/:rut`, usuarios.buscarPorRut);
  app.get(`/${USERS_BY_STORE}/:store`, usuarios.buscarPorTienda);

  // Modify user expose
  app.put(`/${SERVICE}/:rut`, usuarios.modificar);

  // Delete user expose
  app.delete(`/${SERVICE}/:rut`, usuarios.eliminar);
};
