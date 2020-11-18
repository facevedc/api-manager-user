module.exports = app => {
    const SERVICE = 'users';
    const usuarios = require('../controller/users.controller');

    app.post(`/${SERVICE}`, usuarios.crear);

    app.get(`/${SERVICE}`, usuarios.buscarTodos);

    app.get(`/${SERVICE}/:rut`, usuarios.buscarPorRut);

    app.put(`/${SERVICE}/:rut`, usuarios.modificar);

    app.delete(`/${SERVICE}/:rut`, usuarios.eliminar);
};